'use strict';var _chai = require('chai');
var _mockRpc = require('../mockRpc');

var _provider = require('../../provider');
var _web = require('./web3');var _web2 = _interopRequireDefault(_web);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

var instance = new _web2.default(new _provider.PromiseWrapper(new _provider.Http(_mockRpc.TEST_HTTP_URL, -1)));

describe('api/rpc/Web3', function () {
  var scope = void 0;

  describe('sha3', function () {
    beforeEach(function () {
      scope = (0, _mockRpc.mockHttp)([{ method: 'web3_sha3', reply: { result: [] } }]);
    });

    it('formats the inputs correctly', function () {
      return instance.sha3('1234').then(function () {
        (0, _chai.expect)(scope.body.web3_sha3.params).to.deep.equal(['0x1234']);
      });
    });
  });
});