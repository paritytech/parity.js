import BigNumber from 'bignumber.js';

export default class Eth {
  constructor (updateSubscriptions, api) {
    this._api = api;
    this._updateSubscriptions = updateSubscriptions;
    this._started = false;

    this._lastBlock = new BigNumber(-1);
    this._pollTimerId = null;
  }

  get isStarted () {
    return this._started;
  }

  start () {
    this._started = true;

    return this._blockNumber();
  }

  _blockNumber = () => {
    const nextTimeout = (timeout = 1000) => {
      this._pollTimerId = setTimeout(() => {
        this._blockNumber();
      }, timeout);
    };

    if (!this._api.transport.isConnected) {
      nextTimeout(500);
      return;
    }

    return this._api.eth
      .blockNumber()
      .then((blockNumber) => {
        if (!blockNumber.eq(this._lastBlock)) {
          this._lastBlock = blockNumber;
          this._updateSubscriptions('eth_blockNumber', null, blockNumber);
        }

        nextTimeout();
      })
      .catch(() => nextTimeout());
  }
}
