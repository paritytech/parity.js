import { expect } from 'chai';
import BigNumber from 'bignumber.js';
import sinon from 'sinon';

import Eth from './eth';

const START_BLOCK = 5000;

function stubApi (blockNumber) {
  const _calls = {
    blockNumber: []
  };

  return {
    _calls,
    transport: {
      isConnected: true
    },
    eth: {
      blockNumber: () => {
        const stub = sinon.stub().resolves(new BigNumber(blockNumber || START_BLOCK))();

        _calls.blockNumber.push(stub);
        return stub;
      }
    }
  };
}

describe('api/subscriptions/eth', () => {
  let api;
  let eth;
  let cb;

  beforeEach(() => {
    api = stubApi();
    cb = sinon.stub();
    eth = new Eth(cb, api);
  });

  describe('constructor', () => {
    it('starts the instance in a stopped state', () => {
      expect(eth.isStarted).to.be.false;
    });
  });

  describe('start', () => {
    describe('blockNumber available', () => {
      beforeEach(() => {
        return eth.start();
      });

      it('sets the started status', () => {
        expect(eth.isStarted).to.be.true;
      });

      it('calls eth_blockNumber', () => {
        expect(api._calls.blockNumber.length).to.be.ok;
      });

      it('updates subscribers', () => {
        expect(cb).to.have.been.calledWith('eth_blockNumber', null, new BigNumber(START_BLOCK));
      });
    });

    describe('blockNumber not available', () => {
      beforeEach(() => {
        api = stubApi(-1);
        eth = new Eth(cb, api);
        return eth.start();
      });

      it('sets the started status', () => {
        expect(eth.isStarted).to.be.true;
      });

      it('calls eth_blockNumber', () => {
        expect(api._calls.blockNumber.length).to.be.ok;
      });

      it('does not update subscribers', () => {
        expect(cb).not.to.been.called;
      });
    });
  });
});
