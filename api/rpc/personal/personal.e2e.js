'use strict';var _ethapi = require('../../../../test/e2e/ethapi');
var _types = require('../../../../test/types');

describe.skip('ethapi.personal', function () {
  var ethapi = (0, _ethapi.createHttpApi)();
  var password = 'P@55word';
  var address = void 0;

  describe('newAccount', function () {
    it('creates a new account', function () {
      return ethapi.personal.newAccount(password).then(function (_address) {
        address = _address;
        expect((0, _types.isAddress)(address)).to.be.ok;
      });
    });
  });

  describe('listAccounts', function () {
    it('has the newly-created account', function () {
      return ethapi.personal.listAccounts(password).then(function (accounts) {
        expect(accounts.filter(function (_address) {return _address === address;})).to.deep.equal([address]);
        accounts.forEach(function (account) {
          expect((0, _types.isAddress)(account)).to.be.true;
        });
      });
    });
  });

  describe('unlockAccount', function () {
    it('unlocks the newly-created account', function () {
      return ethapi.personal.unlockAccount(address, password).then(function (result) {
        expect((0, _types.isBoolean)(result)).to.be.true;
        expect(result).to.be.true;
      });
    });
  });
});