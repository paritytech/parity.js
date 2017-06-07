'use strict';var _chai = require('chai');
var _mockRpc = require('../mockRpc');

var _provider = require('../../provider');
var _personal = require('./personal');var _personal2 = _interopRequireDefault(_personal);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

var instance = new _personal2.default(new _provider.PromiseWrapper(new _provider.Http(_mockRpc.TEST_HTTP_URL, -1)));

describe('rpc/Personal', function () {
  var account = '0x63cf90d3f0410092fc0fca41846f596223979195';
  var checksum = '0x63Cf90D3f0410092FC0fca41846f596223979195';
  var scope = void 0;

  describe('listAccounts', function () {
    it('retrieves a list of available accounts', function () {
      scope = (0, _mockRpc.mockHttp)([{ method: 'personal_listAccounts', reply: { result: [account] } }]);

      return instance.listAccounts().then(function (result) {
        (0, _chai.expect)(result).to.deep.equal([checksum]);
      });
    });

    it('returns an empty list when none available', function () {
      scope = (0, _mockRpc.mockHttp)([{ method: 'personal_listAccounts', reply: { result: null } }]);

      return instance.listAccounts().then(function (result) {
        (0, _chai.expect)(result).to.deep.equal([]);
      });
    });
  });

  describe('newAccount', function () {
    it('passes the password, returning the address', function () {
      scope = (0, _mockRpc.mockHttp)([{ method: 'personal_newAccount', reply: { result: account } }]);

      return instance.newAccount('password').then(function (result) {
        (0, _chai.expect)(scope.body.personal_newAccount.params).to.deep.equal(['password']);
        (0, _chai.expect)(result).to.equal(checksum);
      });
    });
  });

  describe('unlockAccount', function () {
    beforeEach(function () {
      scope = (0, _mockRpc.mockHttp)([{ method: 'personal_unlockAccount', reply: { result: [] } }]);
    });

    it('passes account, password & duration', function () {
      return instance.unlockAccount(account, 'password', 0xf).then(function () {
        (0, _chai.expect)(scope.body.personal_unlockAccount.params).to.deep.equal([account, 'password', 15]);
      });
    });

    it('provides a default duration when not specified', function () {
      return instance.unlockAccount(account, 'password').then(function () {
        (0, _chai.expect)(scope.body.personal_unlockAccount.params).to.deep.equal([account, 'password', 1]);
      });
    });
  });
});