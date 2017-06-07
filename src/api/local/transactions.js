import { toHex } from '../util/format';
import { TransportError } from '../transport';

const AWAITING = Symbol('awaiting');
const LOCKED = Symbol('locked');
const CONFIRMED = Symbol('confirmed');
const REJECTED = Symbol('rejected');

class Transactions {
  constructor () {
    this.reset();
  }

  // should only really be needed in the constructor and tests
  reset () {
    this._id = 1;
    this._states = {};
  }

  nextId () {
    return toHex(this._id++);
  }

  add (tx) {
    const id = this.nextId();

    this._states[id] = {
      status: AWAITING,
      transaction: tx
    };

    return id;
  }

  get (id) {
    const state = this._states[id];

    if (!state || state.status !== AWAITING) {
      return null;
    }

    return state.transaction;
  }

  lock (id) {
    const state = this._states[id];

    if (!state || state.status !== AWAITING) {
      throw new Error('Trying to lock an invalid transaction');
    }

    state.status = LOCKED;
  }

  unlock (id) {
    const state = this._states[id];

    if (!state || state.status !== LOCKED) {
      throw new Error('Trying to unlock an invalid transaction');
    }

    state.status = AWAITING;
  }

  hash (id) {
    const state = this._states[id];

    if (!state) {
      return null;
    }

    switch (state.status) {
      case REJECTED:
        throw TransportError.requestRejected();
      case CONFIRMED:
        return state.hash;
      default:
        return null;
    }
  }

  confirm (id, hash) {
    const state = this._states[id];
    const status = state ? state.status : null;

    switch (status) {
      case AWAITING: break;
      case LOCKED: break;
      default: throw new Error('Trying to confirm an invalid transaction');
    }

    state.hash = hash;
    state.status = CONFIRMED;
  }

  reject (id) {
    const state = this._states[id];

    if (!state) {
      return false;
    }

    state.status = REJECTED;

    return true;
  }

  requestsToConfirm () {
    const result = [];

    Object.keys(this._states).forEach((id) => {
      const state = this._states[id];

      if (state.status === AWAITING) {
        result.push({
          id,
          origin: {
            signer: '0x0'
          },
          payload: {
            sendTransaction: state.transaction
          }
        });
      }
    });

    return result;
  }
}

export default new Transactions();
