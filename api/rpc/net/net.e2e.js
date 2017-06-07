'use strict';var _ethapi = require('../../../../test/e2e/ethapi');
var _types = require('../../../../test/types');

describe('ethapi.net', function () {
  var ethapi = (0, _ethapi.createHttpApi)();

  describe('listening', function () {
    it('returns the listening status', function () {
      return ethapi.net.listening().then(function (status) {
        expect((0, _types.isBoolean)(status)).to.be.true;
      });
    });
  });

  describe('peerCount', function () {
    it('returns the peer count', function () {
      return ethapi.net.peerCount().then(function (count) {
        expect(count.gte(0)).to.be.true;
      });
    });
  });

  describe('version', function () {
    it('returns the version', function () {
      return ethapi.net.version().then(function (version) {
        expect(version).to.be.ok;
      });
    });
  });
});