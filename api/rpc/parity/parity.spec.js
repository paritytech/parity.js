'use strict';var _chai = require('chai');
var _bignumber = require('bignumber.js');var _bignumber2 = _interopRequireDefault(_bignumber);
var _mockRpc = require('../mockRpc');
var _types = require('../../util/types');

var _provider = require('../../provider');
var _parity = require('./parity');var _parity2 = _interopRequireDefault(_parity);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

var instance = new _parity2.default(new _provider.PromiseWrapper(new _provider.Http(_mockRpc.TEST_HTTP_URL, -1)));

describe('api/rpc/parity', function () {
  describe('accountsInfo', function () {
    it('retrieves the available account info', function () {
      (0, _mockRpc.mockHttp)([{ method: 'parity_accountsInfo', reply: {
          result: {
            '0x63cf90d3f0410092fc0fca41846f596223979195': {
              name: 'name', uuid: 'uuid', meta: '{"data":"data"}' } } } }]);




      return instance.accountsInfo().then(function (result) {
        (0, _chai.expect)(result).to.deep.equal({
          '0x63Cf90D3f0410092FC0fca41846f596223979195': {
            name: 'name', uuid: 'uuid', meta: {
              data: 'data' } } });



      });
    });
  });

  describe('chainStatus', function () {
    it('retrieves the chain status', function () {
      (0, _mockRpc.mockHttp)([{ method: 'parity_chainStatus', reply: {
          result: {
            'blockGap': [0x123, 0x456] } } }]);



      return instance.chainStatus().then(function (result) {
        (0, _chai.expect)(result).to.deep.equal({
          'blockGap': [new _bignumber2.default(0x123), new _bignumber2.default(0x456)] });

      });
    });
  });

  describe('gasFloorTarget', function () {
    it('returns the gasfloor, formatted', function () {
      (0, _mockRpc.mockHttp)([{ method: 'parity_gasFloorTarget', reply: { result: '0x123456' } }]);

      return instance.gasFloorTarget().then(function (count) {
        (0, _chai.expect)((0, _types.isBigNumber)(count)).to.be.true;
        (0, _chai.expect)(count.eq(0x123456)).to.be.true;
      });
    });
  });

  describe('importGethAccounts', function () {
    var ACCOUNTS = ['0x63cf90d3f0410092fc0fca41846f596223979195'];
    var scope = void 0;

    beforeEach(function () {
      scope = (0, _mockRpc.mockHttp)([{ method: 'parity_importGethAccounts', reply: { result: ACCOUNTS } }]);
    });

    it('passes the addresses through', function () {
      return instance.importGethAccounts(ACCOUNTS).then(function (result) {
        (0, _chai.expect)(scope.body['parity_importGethAccounts'].params).to.deep.equal([ACCOUNTS]);
      });
    });
  });

  describe('minGasPrice', function () {
    it('returns the min gasprice, formatted', function () {
      (0, _mockRpc.mockHttp)([{ method: 'parity_minGasPrice', reply: { result: '0x123456' } }]);

      return instance.minGasPrice().then(function (count) {
        (0, _chai.expect)((0, _types.isBigNumber)(count)).to.be.true;
        (0, _chai.expect)(count.eq(0x123456)).to.be.true;
      });
    });
  });

  describe('netMaxPeers', function () {
    it('returns the max peers, formatted', function () {
      (0, _mockRpc.mockHttp)([{ method: 'parity_netMaxPeers', reply: { result: 25 } }]);

      return instance.netMaxPeers().then(function (count) {
        (0, _chai.expect)((0, _types.isBigNumber)(count)).to.be.true;
        (0, _chai.expect)(count.eq(25)).to.be.true;
      });
    });
  });

  describe('newPeers', function () {
    it('returns the peer structure, formatted', function () {
      (0, _mockRpc.mockHttp)([{ method: 'parity_netPeers', reply: { result: { active: 123, connected: 456, max: 789, peers: [] } } }]);

      return instance.netPeers().then(function (peers) {
        (0, _chai.expect)(peers.active.eq(123)).to.be.true;
        (0, _chai.expect)(peers.connected.eq(456)).to.be.true;
        (0, _chai.expect)(peers.max.eq(789)).to.be.true;
      });
    });
  });

  describe('netPort', function () {
    it('returns the connected port, formatted', function () {
      (0, _mockRpc.mockHttp)([{ method: 'parity_netPort', reply: { result: 33030 } }]);

      return instance.netPort().then(function (count) {
        (0, _chai.expect)((0, _types.isBigNumber)(count)).to.be.true;
        (0, _chai.expect)(count.eq(33030)).to.be.true;
      });
    });
  });

  describe('transactionsLimit', function () {
    it('returns the tx limit, formatted', function () {
      (0, _mockRpc.mockHttp)([{ method: 'parity_transactionsLimit', reply: { result: 1024 } }]);

      return instance.transactionsLimit().then(function (count) {
        (0, _chai.expect)((0, _types.isBigNumber)(count)).to.be.true;
        (0, _chai.expect)(count.eq(1024)).to.be.true;
      });
    });
  });
});