'use strict';var _chai = require('chai');
var _mockRpc = require('../mockRpc');
var _types = require('../../util/types');

var _provider = require('../../provider');
var _net = require('./net');var _net2 = _interopRequireDefault(_net);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

var instance = new _net2.default(new _provider.PromiseWrapper(new _provider.Http(_mockRpc.TEST_HTTP_URL, -1)));

describe('api/rpc/Net', function () {
  describe('peerCount', function () {
    it('returns the connected peers, formatted', function () {
      (0, _mockRpc.mockHttp)([{ method: 'net_peerCount', reply: { result: '0x123456' } }]);

      return instance.peerCount().then(function (count) {
        (0, _chai.expect)((0, _types.isBigNumber)(count)).to.be.true;
        (0, _chai.expect)(count.eq(0x123456)).to.be.true;
      });
    });
  });
});