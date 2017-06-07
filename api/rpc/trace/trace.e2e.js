'use strict';var _ethapi = require('../../../../test/e2e/ethapi');

describe('ethapi.trace', function () {
  var ethapi = (0, _ethapi.createHttpApi)();

  describe('block', function () {
    it('returns the latest block traces', function () {
      return ethapi.trace.block().then(function (traces) {
        expect(traces).to.be.ok;
      });
    });

    it('returns traces for a specified block', function () {
      return ethapi.trace.block('0x65432').then(function (traces) {
        expect(traces).to.be.ok;
      });
    });
  });

  describe('replayTransaction', function () {
    it('returns traces for a specific transaction', function () {
      return ethapi.eth.getBlockByNumber().then(function (latestBlock) {
        return ethapi.trace.replayTransaction(latestBlock.transactions[0]).then(function (traces) {
          expect(traces).to.be.ok;
        });
      });
    });
  });
});