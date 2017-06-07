'use strict';var _ethapi = require('../../../../test/e2e/ethapi');

describe('ethapi.parity', function () {
  var ethapi = (0, _ethapi.createHttpApi)();

  describe('chainStatus', function () {
    it('returns and translates the status', function () {
      return ethapi.parity.chainStatus().then(function (value) {
        expect(value).to.be.ok;
      });
    });
  });

  describe('gasFloorTarget', function () {
    it('returns and translates the target', function () {
      return ethapi.parity.gasFloorTarget().then(function (value) {
        expect(value.gt(0)).to.be.true;
      });
    });
  });

  describe('gasPriceHistogram', function () {
    it('returns and translates the target', function () {
      return ethapi.parity.gasPriceHistogram().then(function (result) {
        expect(Object.keys(result)).to.deep.equal(['bucketBounds', 'counts']);
        expect(result.bucketBounds.length > 0).to.be.true;
        expect(result.counts.length > 0).to.be.true;
      });
    });
  });

  describe('netChain', function () {
    it('returns and the chain', function () {
      return ethapi.parity.netChain().then(function (value) {
        expect(value).to.equal('morden');
      });
    });
  });

  describe('netPort', function () {
    it('returns and translates the port', function () {
      return ethapi.parity.netPort().then(function (value) {
        expect(value.gt(0)).to.be.true;
      });
    });
  });

  describe('transactionsLimit', function () {
    it('returns and translates the limit', function () {
      return ethapi.parity.transactionsLimit().then(function (value) {
        expect(value.gt(0)).to.be.true;
      });
    });
  });

  describe('rpcSettings', function () {
    it('returns and translates the settings', function () {
      return ethapi.parity.rpcSettings().then(function (value) {
        expect(value).to.be.ok;
      });
    });
  });
});