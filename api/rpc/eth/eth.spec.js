'use strict';var _chai = require('chai');
var _mockRpc = require('../mockRpc');
var _types = require('../../util/types');

var _provider = require('../../provider');
var _eth = require('./eth');var _eth2 = _interopRequireDefault(_eth);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

var instance = new _eth2.default(new _provider.PromiseWrapper(new _provider.Http(_mockRpc.TEST_HTTP_URL, -1)));

describe('rpc/Eth', function () {
  var address = '0x63Cf90D3f0410092FC0fca41846f596223979195';
  var scope = void 0;

  describe('accounts', function () {
    beforeEach(function () {
      scope = (0, _mockRpc.mockHttp)([{ method: 'eth_accounts', reply: { result: [address.toLowerCase()] } }]);
    });

    it('returns a list of accounts, formatted', function () {
      return instance.accounts().then(function (accounts) {
        (0, _chai.expect)(accounts).to.deep.equal([address]);
      });
    });
  });

  describe('blockNumber', function () {
    beforeEach(function () {
      scope = (0, _mockRpc.mockHttp)([{ method: 'eth_blockNumber', reply: { result: '0x123456' } }]);
    });

    it('returns the current blockNumber, formatted', function () {
      return instance.blockNumber().then(function (blockNumber) {
        (0, _chai.expect)((0, _types.isBigNumber)(blockNumber)).to.be.true;
        (0, _chai.expect)(blockNumber.toString(16)).to.equal('123456');
      });
    });
  });

  describe('call', function () {
    beforeEach(function () {
      scope = (0, _mockRpc.mockHttp)([{ method: 'eth_call', reply: { result: [] } }]);
    });

    it('formats the input options & blockNumber', function () {
      return instance.call({ data: '12345678' }, 'earliest').then(function () {
        (0, _chai.expect)(scope.body.eth_call.params).to.deep.equal([{ data: '0x12345678' }, 'earliest']);
      });
    });

    it('provides a latest blockNumber when not specified', function () {
      return instance.call({ data: '12345678' }).then(function () {
        (0, _chai.expect)(scope.body.eth_call.params).to.deep.equal([{ data: '0x12345678' }, 'latest']);
      });
    });
  });

  describe('coinbase', function () {
    beforeEach(function () {
      scope = (0, _mockRpc.mockHttp)([{ method: 'eth_coinbase', reply: { result: address.toLowerCase() } }]);
    });

    it('returns the coinbase, formatted', function () {
      return instance.coinbase().then(function (account) {
        (0, _chai.expect)(account).to.deep.equal(address);
      });
    });
  });

  ['LLL', 'Serpent', 'Solidity'].forEach(function (type) {
    var method = 'compile' + type;

    describe(method, function () {
      beforeEach(function () {
        scope = (0, _mockRpc.mockHttp)([{ method: 'eth_' + method, reply: { result: '0x123' } }]);
      });

      it('formats the input as data, returns the output', function () {
        return instance[method]('0xabcdef').then(function (result) {
          (0, _chai.expect)(scope.body['eth_' + method].params).to.deep.equal(['0xabcdef']);
          (0, _chai.expect)(result).to.equal('0x123');
        });
      });
    });
  });

  describe('estimateGas', function () {
    beforeEach(function () {
      scope = (0, _mockRpc.mockHttp)([{ method: 'eth_estimateGas', reply: { result: '0x123' } }]);
    });

    it('converts the options correctly', function () {
      return instance.estimateGas({ gas: 21000 }).then(function () {
        (0, _chai.expect)(scope.body.eth_estimateGas.params).to.deep.equal([{ gas: '0x5208' }]);
      });
    });

    it('returns the gas used', function () {
      return instance.estimateGas({}).then(function (gas) {
        (0, _chai.expect)((0, _types.isBigNumber)(gas)).to.be.true;
        (0, _chai.expect)(gas.toString(16)).to.deep.equal('123');
      });
    });
  });

  describe('gasPrice', function () {
    beforeEach(function () {
      scope = (0, _mockRpc.mockHttp)([{ method: 'eth_gasPrice', reply: { result: '0x123' } }]);
    });

    it('returns the fomratted price', function () {
      return instance.gasPrice().then(function (price) {
        (0, _chai.expect)((0, _types.isBigNumber)(price)).to.be.true;
        (0, _chai.expect)(price.toString(16)).to.deep.equal('123');
      });
    });
  });

  describe('getBalance', function () {
    beforeEach(function () {
      scope = (0, _mockRpc.mockHttp)([{ method: 'eth_getBalance', reply: { result: '0x123' } }]);
    });

    it('passes in the address (default blockNumber)', function () {
      return instance.getBalance(address).then(function () {
        (0, _chai.expect)(scope.body.eth_getBalance.params).to.deep.equal([address.toLowerCase(), 'latest']);
      });
    });

    it('passes in the address & blockNumber', function () {
      return instance.getBalance(address, 0x456).then(function () {
        (0, _chai.expect)(scope.body.eth_getBalance.params).to.deep.equal([address.toLowerCase(), '0x456']);
      });
    });

    it('returns the balance', function () {
      return instance.getBalance(address, 0x123).then(function (balance) {
        (0, _chai.expect)((0, _types.isBigNumber)(balance)).to.be.true;
        (0, _chai.expect)(balance.toString(16)).to.deep.equal('123');
      });
    });
  });

  describe('getBlockByHash', function () {
    beforeEach(function () {
      scope = (0, _mockRpc.mockHttp)([{ method: 'eth_getBlockByHash', reply: { result: { miner: address.toLowerCase() } } }]);
    });

    it('formats the input hash as a hash, default full', function () {
      return instance.getBlockByHash('1234').then(function () {
        (0, _chai.expect)(scope.body.eth_getBlockByHash.params).to.deep.equal(['0x1234', false]);
      });
    });

    it('formats the input hash as a hash, full true', function () {
      return instance.getBlockByHash('1234', true).then(function () {
        (0, _chai.expect)(scope.body.eth_getBlockByHash.params).to.deep.equal(['0x1234', true]);
      });
    });

    it('formats the output into block', function () {
      return instance.getBlockByHash('1234').then(function (block) {
        (0, _chai.expect)(block.miner).to.equal(address);
      });
    });
  });

  describe('getBlockByNumber', function () {
    beforeEach(function () {
      scope = (0, _mockRpc.mockHttp)([{ method: 'eth_getBlockByNumber', reply: { result: { miner: address.toLowerCase() } } }]);
    });

    it('assumes blockNumber latest & full false', function () {
      return instance.getBlockByNumber().then(function () {
        (0, _chai.expect)(scope.body.eth_getBlockByNumber.params).to.deep.equal(['latest', false]);
      });
    });

    it('uses input blockNumber & full false', function () {
      return instance.getBlockByNumber('0x1234').then(function () {
        (0, _chai.expect)(scope.body.eth_getBlockByNumber.params).to.deep.equal(['0x1234', false]);
      });
    });

    it('formats the input blockNumber, full true', function () {
      return instance.getBlockByNumber(0x1234, true).then(function () {
        (0, _chai.expect)(scope.body.eth_getBlockByNumber.params).to.deep.equal(['0x1234', true]);
      });
    });

    it('formats the output into block', function () {
      return instance.getBlockByNumber(0x1234).then(function (block) {
        (0, _chai.expect)(block.miner).to.equal(address);
      });
    });
  });

  describe('getBlockTransactionCountByHash', function () {
    beforeEach(function () {
      scope = (0, _mockRpc.mockHttp)([{ method: 'eth_getBlockTransactionCountByHash', reply: { result: '0x123' } }]);
    });

    it('formats input hash properly', function () {
      return instance.getBlockTransactionCountByHash('abcdef').then(function () {
        (0, _chai.expect)(scope.body.eth_getBlockTransactionCountByHash.params).to.deep.equal(['0xabcdef']);
      });
    });

    it('formats the output number', function () {
      return instance.getBlockTransactionCountByHash('0x1234').then(function (count) {
        (0, _chai.expect)((0, _types.isBigNumber)(count)).to.be.true;
        (0, _chai.expect)(count.toString(16)).to.equal('123');
      });
    });
  });

  describe('getBlockTransactionCountByNumber', function () {
    beforeEach(function () {
      scope = (0, _mockRpc.mockHttp)([{ method: 'eth_getBlockTransactionCountByNumber', reply: { result: '0x123' } }]);
    });

    it('specified blockNumber latest when none specified', function () {
      return instance.getBlockTransactionCountByNumber().then(function () {
        (0, _chai.expect)(scope.body.eth_getBlockTransactionCountByNumber.params).to.deep.equal(['latest']);
      });
    });

    it('formats input blockNumber properly', function () {
      return instance.getBlockTransactionCountByNumber(0xabcdef).then(function () {
        (0, _chai.expect)(scope.body.eth_getBlockTransactionCountByNumber.params).to.deep.equal(['0xabcdef']);
      });
    });

    it('formats the output number', function () {
      return instance.getBlockTransactionCountByNumber('0x1234').then(function (count) {
        (0, _chai.expect)((0, _types.isBigNumber)(count)).to.be.true;
        (0, _chai.expect)(count.toString(16)).to.equal('123');
      });
    });
  });

  describe('getCode', function () {
    beforeEach(function () {
      scope = (0, _mockRpc.mockHttp)([{ method: 'eth_getCode', reply: { result: '0x1234567890' } }]);
    });

    it('passes in the address (default blockNumber)', function () {
      return instance.getCode(address).then(function () {
        (0, _chai.expect)(scope.body.eth_getCode.params).to.deep.equal([address.toLowerCase(), 'latest']);
      });
    });

    it('passes in the address & blockNumber', function () {
      return instance.getCode(address, 0x456).then(function () {
        (0, _chai.expect)(scope.body.eth_getCode.params).to.deep.equal([address.toLowerCase(), '0x456']);
      });
    });

    it('returns the code', function () {
      return instance.getCode(address, 0x123).then(function (code) {
        (0, _chai.expect)(code).to.equal('0x1234567890');
      });
    });
  });

  describe('getStorageAt', function () {
    beforeEach(function () {
      scope = (0, _mockRpc.mockHttp)([{ method: 'eth_getStorageAt', reply: { result: '0x1234567890' } }]);
    });

    it('passes in the address (default index& blockNumber)', function () {
      return instance.getStorageAt(address).then(function () {
        (0, _chai.expect)(scope.body.eth_getStorageAt.params).to.deep.equal([address.toLowerCase(), '0x0', 'latest']);
      });
    });

    it('passes in the address, index & blockNumber', function () {
      return instance.getStorageAt(address, 15, 0x456).then(function () {
        (0, _chai.expect)(scope.body.eth_getStorageAt.params).to.deep.equal([address.toLowerCase(), '0xf', '0x456']);
      });
    });

    it('returns the storage', function () {
      return instance.getStorageAt(address, 0x123).then(function (storage) {
        (0, _chai.expect)(storage).to.equal('0x1234567890');
      });
    });
  });

  describe('getTransactionByBlockHashAndIndex', function () {
    beforeEach(function () {
      scope = (0, _mockRpc.mockHttp)([{ method: 'eth_getTransactionByBlockHashAndIndex', reply: { result: { to: address.toLowerCase() } } }]);
    });

    it('passes in the hash (default index)', function () {
      return instance.getTransactionByBlockHashAndIndex('12345').then(function () {
        (0, _chai.expect)(scope.body.eth_getTransactionByBlockHashAndIndex.params).to.deep.equal(['0x12345', '0x0']);
      });
    });

    it('passes in the hash & specified index', function () {
      return instance.getTransactionByBlockHashAndIndex('6789', 0x456).then(function () {
        (0, _chai.expect)(scope.body.eth_getTransactionByBlockHashAndIndex.params).to.deep.equal(['0x6789', '0x456']);
      });
    });

    it('returns the formatted transaction', function () {
      return instance.getTransactionByBlockHashAndIndex('6789', 0x123).then(function (tx) {
        (0, _chai.expect)(tx).to.deep.equal({ to: address });
      });
    });
  });

  describe('getTransactionByBlockNumberAndIndex', function () {
    beforeEach(function () {
      scope = (0, _mockRpc.mockHttp)([{ method: 'eth_getTransactionByBlockNumberAndIndex', reply: { result: { to: address.toLowerCase() } } }]);
    });

    it('passes in the default parameters', function () {
      return instance.getTransactionByBlockNumberAndIndex().then(function () {
        (0, _chai.expect)(scope.body.eth_getTransactionByBlockNumberAndIndex.params).to.deep.equal(['latest', '0x0']);
      });
    });

    it('passes in the blockNumber & specified index', function () {
      return instance.getTransactionByBlockNumberAndIndex('0x6789', 0x456).then(function () {
        (0, _chai.expect)(scope.body.eth_getTransactionByBlockNumberAndIndex.params).to.deep.equal(['0x6789', '0x456']);
      });
    });

    it('returns the formatted transaction', function () {
      return instance.getTransactionByBlockNumberAndIndex('0x6789', 0x123).then(function (tx) {
        (0, _chai.expect)(tx).to.deep.equal({ to: address });
      });
    });
  });

  describe('getTransactionByHash', function () {
    beforeEach(function () {
      scope = (0, _mockRpc.mockHttp)([{ method: 'eth_getTransactionByHash', reply: { result: { to: address.toLowerCase() } } }]);
    });

    it('passes in the hash', function () {
      return instance.getTransactionByHash('12345').then(function () {
        (0, _chai.expect)(scope.body.eth_getTransactionByHash.params).to.deep.equal(['0x12345']);
      });
    });

    it('returns the formatted transaction', function () {
      return instance.getTransactionByHash('6789').then(function (tx) {
        (0, _chai.expect)(tx).to.deep.equal({ to: address });
      });
    });
  });

  describe('getTransactionCount', function () {
    beforeEach(function () {
      scope = (0, _mockRpc.mockHttp)([{ method: 'eth_getTransactionCount', reply: { result: '0x123' } }]);
    });

    it('passes in the address (default blockNumber)', function () {
      return instance.getTransactionCount(address).then(function () {
        (0, _chai.expect)(scope.body.eth_getTransactionCount.params).to.deep.equal([address.toLowerCase(), 'latest']);
      });
    });

    it('passes in the address & blockNumber', function () {
      return instance.getTransactionCount(address, 0x456).then(function () {
        (0, _chai.expect)(scope.body.eth_getTransactionCount.params).to.deep.equal([address.toLowerCase(), '0x456']);
      });
    });

    it('returns the count, formatted', function () {
      return instance.getTransactionCount(address, 0x123).then(function (count) {
        (0, _chai.expect)((0, _types.isBigNumber)(count)).to.be.true;
        (0, _chai.expect)(count.toString(16)).to.equal('123');
      });
    });
  });

  describe('getUncleByBlockHashAndIndex', function () {
    beforeEach(function () {
      scope = (0, _mockRpc.mockHttp)([{ method: 'eth_getUncleByBlockHashAndIndex', reply: { result: [] } }]);
    });

    it('passes in the hash (default index)', function () {
      return instance.getUncleByBlockHashAndIndex('12345').then(function () {
        (0, _chai.expect)(scope.body.eth_getUncleByBlockHashAndIndex.params).to.deep.equal(['0x12345', '0x0']);
      });
    });

    it('passes in the hash & specified index', function () {
      return instance.getUncleByBlockHashAndIndex('6789', 0x456).then(function () {
        (0, _chai.expect)(scope.body.eth_getUncleByBlockHashAndIndex.params).to.deep.equal(['0x6789', '0x456']);
      });
    });
  });

  describe('getUncleByBlockNumberAndIndex', function () {
    beforeEach(function () {
      scope = (0, _mockRpc.mockHttp)([{ method: 'eth_getUncleByBlockNumberAndIndex', reply: { result: [] } }]);
    });

    it('passes in the default parameters', function () {
      return instance.getUncleByBlockNumberAndIndex().then(function () {
        (0, _chai.expect)(scope.body.eth_getUncleByBlockNumberAndIndex.params).to.deep.equal(['latest', '0x0']);
      });
    });

    it('passes in the blockNumber & specified index', function () {
      return instance.getUncleByBlockNumberAndIndex('0x6789', 0x456).then(function () {
        (0, _chai.expect)(scope.body.eth_getUncleByBlockNumberAndIndex.params).to.deep.equal(['0x6789', '0x456']);
      });
    });
  });

  describe('getUncleCountByBlockHash', function () {
    beforeEach(function () {
      scope = (0, _mockRpc.mockHttp)([{ method: 'eth_getUncleCountByBlockHash', reply: { result: '0x123' } }]);
    });

    it('passes in the hash', function () {
      return instance.getUncleCountByBlockHash('12345').then(function () {
        (0, _chai.expect)(scope.body.eth_getUncleCountByBlockHash.params).to.deep.equal(['0x12345']);
      });
    });

    it('formats the output number', function () {
      return instance.getUncleCountByBlockHash('0x1234').then(function (count) {
        (0, _chai.expect)((0, _types.isBigNumber)(count)).to.be.true;
        (0, _chai.expect)(count.toString(16)).to.equal('123');
      });
    });
  });

  describe('getUncleCountByBlockNumber', function () {
    beforeEach(function () {
      scope = (0, _mockRpc.mockHttp)([{ method: 'eth_getUncleCountByBlockNumber', reply: { result: '0x123' } }]);
    });

    it('passes in the default parameters', function () {
      return instance.getUncleCountByBlockNumber().then(function () {
        (0, _chai.expect)(scope.body.eth_getUncleCountByBlockNumber.params).to.deep.equal(['latest']);
      });
    });

    it('passes in the blockNumber', function () {
      return instance.getUncleCountByBlockNumber('0x6789').then(function () {
        (0, _chai.expect)(scope.body.eth_getUncleCountByBlockNumber.params).to.deep.equal(['0x6789']);
      });
    });

    it('formats the output number', function () {
      return instance.getUncleCountByBlockNumber('0x1234').then(function (count) {
        (0, _chai.expect)((0, _types.isBigNumber)(count)).to.be.true;
        (0, _chai.expect)(count.toString(16)).to.equal('123');
      });
    });
  });
});