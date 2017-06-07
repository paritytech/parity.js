'use strict';require('isomorphic-fetch');
var _bignumber = require('bignumber.js');var _bignumber2 = _interopRequireDefault(_bignumber);
var _nock = require('nock');var _nock2 = _interopRequireDefault(_nock);
var _sinon = require('sinon');var _sinon2 = _interopRequireDefault(_sinon);
var _chai = require('chai');var _chai2 = _interopRequireDefault(_chai);
var _sinonChai = require('sinon-chai');var _sinonChai2 = _interopRequireDefault(_sinonChai);
var _sha = require('../util/sha3');

var _abi = require('../../abi');var _abi2 = _interopRequireDefault(_abi);
var _ = require('../');var _2 = _interopRequireDefault(_);
var _3 = require('./');var _4 = _interopRequireDefault(_3);
var _types = require('../util/types');function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

_chai2.default.use(_sinonChai2.default);

var TEST_HTTP_URL = 'http://localhost:6688';

var provider = new _2.default.Provider.Http(TEST_HTTP_URL, -1);
var eth = new _2.default(provider);

describe('api/contract/Contract', function () {
  var ADDR = '0x0123456789';

  var ABI = [
  {
    type: 'function', name: 'test',
    inputs: [{ name: 'boolin', type: 'bool' }, { name: 'stringin', type: 'string' }],
    outputs: [{ type: 'uint' }] },

  {
    type: 'function', name: 'test2',
    outputs: [{ type: 'uint' }, { type: 'uint' }] },

  {
    type: 'constructor',
    inputs: [{ name: 'boolin', type: 'bool' }, { name: 'stringin', type: 'string' }] },

  { type: 'event', name: 'baz' },
  { type: 'event', name: 'foo' }];


  var ABI_NO_PARAMS = [
  {
    type: 'function', name: 'test',
    inputs: [{ name: 'boolin', type: 'bool' }, { name: 'stringin', type: 'string' }],
    outputs: [{ type: 'uint' }] },

  {
    type: 'function', name: 'test2',
    outputs: [{ type: 'uint' }, { type: 'uint' }] },

  {
    type: 'constructor' },

  { type: 'event', name: 'baz' },
  { type: 'event', name: 'foo' }];


  var VALUES = [true, 'jacogr'];
  var CALLDATA = '\n    0000000000000000000000000000000000000000000000000000000000000001\n    0000000000000000000000000000000000000000000000000000000000000040\n    0000000000000000000000000000000000000000000000000000000000000006\n    6a61636f67720000000000000000000000000000000000000000000000000000\n  '.




  replace(/\s/g, '');
  var SIGNATURE = '02356205';

  var ENCODED = '0x' + SIGNATURE + CALLDATA;

  var RETURN1 = '0000000000000000000000000000000000000000000000000000000000123456';
  var RETURN2 = '0000000000000000000000000000000000000000000000000000000000456789';
  var scope = void 0;

  describe('constructor', function () {
    it('needs an EthAbi instance', function () {
      (0, _chai.expect)(function () {return new _4.default();}).to.throw(/API instance needs to be provided to Contract/);
    });

    it('needs an ABI', function () {
      (0, _chai.expect)(function () {return new _4.default(eth);}).to.throw(/ABI needs to be provided to Contract instance/);
    });

    describe('internal setup', function () {
      var contract = new _4.default(eth, ABI);

      it('sets EthApi & parsed interface', function () {
        (0, _chai.expect)(contract.address).to.not.be.ok;
        (0, _chai.expect)(contract.api).to.deep.equal(eth);
        (0, _chai.expect)((0, _types.isInstanceOf)(contract.abi, _abi2.default)).to.be.ok;
      });

      it('attaches functions', function () {
        (0, _chai.expect)(contract.functions.length).to.equal(2);
        (0, _chai.expect)(contract.functions[0].name).to.equal('test');
      });

      it('attaches constructors', function () {
        (0, _chai.expect)(contract.constructors.length).to.equal(1);
      });

      it('attaches events', function () {
        (0, _chai.expect)(contract.events.length).to.equal(2);
        (0, _chai.expect)(contract.events[0].name).to.equal('baz');
      });
    });
  });

  describe('at', function () {
    it('sets returns the functions, events & sets the address', function () {
      var contract = new _4.default(eth, [
      {
        constant: true,
        inputs: [{
          name: '_who',
          type: 'address' }],

        name: 'balanceOf',
        outputs: [{
          name: '',
          type: 'uint256' }],

        type: 'function' },

      {
        anonymous: false,
        inputs: [{
          indexed: false,
          name: 'amount',
          type: 'uint256' }],

        name: 'Drained',
        type: 'event' }]);



      contract.at('6789');

      (0, _chai.expect)(Object.keys(contract.instance)).to.deep.equal([
      'Drained',
      /^(?:0x)(.+)$/.exec((0, _sha.sha3)('Drained(uint256)'))[1],
      'balanceOf',
      /^(?:0x)(.+)$/.exec((0, _sha.sha3)('balanceOf(address)'))[1].substr(0, 8),
      'address']);

      (0, _chai.expect)(contract.address).to.equal('6789');
    });
  });

  describe('parseTransactionEvents', function () {
    it('parses a transaction log into the data', function () {
      var contract = new _4.default(eth, [
      {
        anonymous: false, name: 'Message', type: 'event',
        inputs: [
        { indexed: true, name: 'postId', type: 'uint256' },
        { indexed: false, name: 'parentId', type: 'uint256' },
        { indexed: false, name: 'sender', type: 'address' },
        { indexed: false, name: 'at', type: 'uint256' },
        { indexed: false, name: 'messageId', type: 'uint256' },
        { indexed: false, name: 'message', type: 'string' }] }]);



      var decoded = contract.parseTransactionEvents({
        blockHash: '0xa9280530a3b47bee2fc80f2862fd56502ae075350571d724d6442ea4c597347b',
        blockNumber: '0x4fcd',
        cumulativeGasUsed: '0xb57f',
        gasUsed: '0xb57f',
        logs: [{
          address: '0x22bff18ec62281850546a664bb63a5c06ac5f76c',
          blockHash: '0xa9280530a3b47bee2fc80f2862fd56502ae075350571d724d6442ea4c597347b',
          blockNumber: '0x4fcd',
          data: '0x000000000000000000000000000000000000000000000000000000000000000000000000000000000000000063cf90d3f0410092fc0fca41846f5962239791950000000000000000000000000000000000000000000000000000000056e6c85f0000000000000000000000000000000000000000000000000001000000004fcd00000000000000000000000000000000000000000000000000000000000000a0000000000000000000000000000000000000000000000000000000000000000d706f7374286d6573736167652900000000000000000000000000000000000000',
          logIndex: '0x0',
          topics: [
          '0x954ba6c157daf8a26539574ffa64203c044691aa57251af95f4b48d85ec00dd5',
          '0x0000000000000000000000000000000000000000000000000001000000004fe0'],

          transactionHash: '0xca16f537d761d13e4e80953b754e2b15541f267d6cad9381f750af1bae1e4917',
          transactionIndex: '0x0' }],

        to: '0x22bff18ec62281850546a664bb63a5c06ac5f76c',
        transactionHash: '0xca16f537d761d13e4e80953b754e2b15541f267d6cad9381f750af1bae1e4917',
        transactionIndex: '0x0' });

      var log = decoded.logs[0];

      (0, _chai.expect)(log.event).to.equal('Message');
      (0, _chai.expect)(log.address).to.equal('0x22bff18ec62281850546a664bb63a5c06ac5f76c');
      (0, _chai.expect)(log.params).to.deep.equal({
        at: { type: 'uint', value: new _bignumber2.default('1457965151') },
        message: { type: 'string', value: 'post(message)' },
        messageId: { type: 'uint', value: new _bignumber2.default('281474976731085') },
        parentId: { type: 'uint', value: new _bignumber2.default(0) },
        postId: { type: 'uint', value: new _bignumber2.default('281474976731104') },
        sender: { type: 'address', value: '0x63Cf90D3f0410092FC0fca41846f596223979195' } });

    });
  });

  describe('_pollTransactionReceipt', function () {
    var contract = new _4.default(eth, ABI);
    var ADDRESS = '0xD337e80eEdBdf86eDBba021797d7e4e00Bb78351';
    var BLOCKNUMBER = '555000';
    var RECEIPT = { contractAddress: ADDRESS.toLowerCase(), blockNumber: BLOCKNUMBER };
    var EXPECT = { contractAddress: ADDRESS, blockNumber: new _bignumber2.default(BLOCKNUMBER) };

    var scope = void 0;
    var receipt = void 0;

    describe('success', function () {
      before(function () {
        scope = mockHttp([
        { method: 'eth_getTransactionReceipt', reply: { result: null } },
        { method: 'eth_getTransactionReceipt', reply: { result: null } },
        { method: 'eth_getTransactionReceipt', reply: { result: RECEIPT } }]);


        return contract.
        _pollTransactionReceipt('0x123').
        then(function (_receipt) {
          receipt = _receipt;
        });
      });

      it('sends multiple getTransactionReceipt calls', function () {
        (0, _chai.expect)(scope.isDone()).to.be.true;
      });

      it('passes the txhash through', function () {
        (0, _chai.expect)(scope.body.eth_getTransactionReceipt.params[0]).to.equal('0x123');
      });

      it('receives the final receipt', function () {
        (0, _chai.expect)(receipt).to.deep.equal(EXPECT);
      });
    });

    describe('error', function () {
      before(function () {
        scope = mockHttp([{ method: 'eth_getTransactionReceipt', reply: { error: { code: -1, message: 'failure' } } }]);
      });

      it('returns the errors', function () {
        return contract.
        _pollTransactionReceipt('0x123').
        catch(function (error) {
          (0, _chai.expect)(error.message).to.match(/failure/);
        });
      });
    });
  });

  describe('deploy without parameters', function () {
    var contract = new _4.default(eth, ABI_NO_PARAMS);
    var CODE = '0x123';
    var ADDRESS = '0xD337e80eEdBdf86eDBba021797d7e4e00Bb78351';
    var RECEIPT_DONE = { contractAddress: ADDRESS.toLowerCase(), gasUsed: 50, blockNumber: 2500 };

    var scope = void 0;

    describe('success', function () {
      before(function () {
        scope = mockHttp([
        { method: 'eth_estimateGas', reply: { result: 1000 } },
        { method: 'parity_postTransaction', reply: { result: '0x678' } },
        { method: 'parity_checkRequest', reply: { result: '0x890' } },
        { method: 'eth_getTransactionReceipt', reply: { result: RECEIPT_DONE } },
        { method: 'eth_getCode', reply: { result: CODE } }]);


        return contract.deploy({ data: CODE }, []);
      });

      it('passes the options through to postTransaction (incl. gas calculation)', function () {
        (0, _chai.expect)(scope.body.parity_postTransaction.params[0].data).to.equal(CODE);
      });
    });
  });

  describe('deploy', function () {
    var contract = new _4.default(eth, ABI);
    var ADDRESS = '0xD337e80eEdBdf86eDBba021797d7e4e00Bb78351';
    var RECEIPT_PEND = { contractAddress: ADDRESS.toLowerCase(), gasUsed: 50, blockNumber: 0 };
    var RECEIPT_DONE = { contractAddress: ADDRESS.toLowerCase(), gasUsed: 50, blockNumber: 2500 };
    var RECEIPT_EXCP = { contractAddress: ADDRESS.toLowerCase(), gasUsed: 1200, blockNumber: 2500 };

    var scope = void 0;

    describe('success', function () {
      before(function () {
        scope = mockHttp([
        { method: 'eth_estimateGas', reply: { result: 1000 } },
        { method: 'parity_postTransaction', reply: { result: '0x678' } },
        { method: 'parity_checkRequest', reply: { result: null } },
        { method: 'parity_checkRequest', reply: { result: '0x890' } },
        { method: 'eth_getTransactionReceipt', reply: { result: null } },
        { method: 'eth_getTransactionReceipt', reply: { result: RECEIPT_PEND } },
        { method: 'eth_getTransactionReceipt', reply: { result: RECEIPT_DONE } },
        { method: 'eth_getCode', reply: { result: '0x456' } }]);


        return contract.deploy({ data: '0x123' }, VALUES);
      });

      it('calls estimateGas, postTransaction, checkRequest, getTransactionReceipt & getCode in order', function () {
        (0, _chai.expect)(scope.isDone()).to.be.true;
      });

      it('passes the options through to postTransaction (incl. gas calculation)', function () {
        (0, _chai.expect)(scope.body.parity_postTransaction.params).to.deep.equal([
        { data: '0x123' + CALLDATA, gas: '0x4b0' }]);

      });

      it('sets the address of the contract', function () {
        (0, _chai.expect)(contract.address).to.equal(ADDRESS);
      });
    });

    describe('error', function () {
      it('fails when gasUsed == gas', function () {
        mockHttp([
        { method: 'eth_estimateGas', reply: { result: 1000 } },
        { method: 'parity_postTransaction', reply: { result: '0x678' } },
        { method: 'parity_checkRequest', reply: { result: '0x789' } },
        { method: 'eth_getTransactionReceipt', reply: { result: RECEIPT_EXCP } }]);


        return contract.
        deploy({ data: '0x123' }, VALUES).
        catch(function (error) {
          (0, _chai.expect)(error.message).to.match(/not deployed, gasUsed/);
        });
      });

      it('fails when no code was deployed', function () {
        mockHttp([
        { method: 'eth_estimateGas', reply: { result: 1000 } },
        { method: 'parity_postTransaction', reply: { result: '0x678' } },
        { method: 'parity_checkRequest', reply: { result: '0x789' } },
        { method: 'eth_getTransactionReceipt', reply: { result: RECEIPT_DONE } },
        { method: 'eth_getCode', reply: { result: '0x' } }]);


        return contract.
        deploy({ data: '0x123' }, VALUES).
        catch(function (error) {
          (0, _chai.expect)(error.message).to.match(/not deployed, getCode/);
        });
      });
    });
  });

  describe('bindings', function () {
    var contract = void 0;
    var cons = void 0;
    var func = void 0;

    beforeEach(function () {
      contract = new _4.default(eth, ABI);
      contract.at(ADDR);
      cons = contract.constructors[0];
      func = contract.functions.find(function (fn) {return fn.name === 'test';});
    });

    describe('_addOptionsTo', function () {
      it('works on no object specified', function () {
        (0, _chai.expect)(contract._addOptionsTo()).to.deep.equal({ to: ADDR });
      });

      it('uses the contract address when none specified', function () {
        (0, _chai.expect)(contract._addOptionsTo({ from: 'me' })).to.deep.equal({ to: ADDR, from: 'me' });
      });

      it('overrides the contract address when specified', function () {
        (0, _chai.expect)(contract._addOptionsTo({ to: 'you', from: 'me' })).to.deep.equal({ to: 'you', from: 'me' });
      });
    });

    describe('attachments', function () {
      it('attaches .call, .postTransaction & .estimateGas to constructors', function () {
        (0, _chai.expect)((0, _types.isFunction)(cons.call)).to.be.true;
        (0, _chai.expect)((0, _types.isFunction)(cons.postTransaction)).to.be.true;
        (0, _chai.expect)((0, _types.isFunction)(cons.estimateGas)).to.be.true;
      });

      it('attaches .call, .postTransaction & .estimateGas to functions', function () {
        (0, _chai.expect)((0, _types.isFunction)(func.call)).to.be.true;
        (0, _chai.expect)((0, _types.isFunction)(func.postTransaction)).to.be.true;
        (0, _chai.expect)((0, _types.isFunction)(func.estimateGas)).to.be.true;
      });

      it('attaches .call only to constant functions', function () {
        func = new _4.default(eth, [{ type: 'function', name: 'test', constant: true }]).functions[0];

        (0, _chai.expect)((0, _types.isFunction)(func.call)).to.be.true;
        (0, _chai.expect)((0, _types.isFunction)(func.postTransaction)).to.be.false;
        (0, _chai.expect)((0, _types.isFunction)(func.estimateGas)).to.be.false;
      });
    });

    describe('postTransaction', function () {
      beforeEach(function () {
        scope = mockHttp([{ method: 'parity_postTransaction', reply: { result: ['hashId'] } }]);
      });

      it('encodes options and mades an parity_postTransaction call', function () {
        return func.
        postTransaction({ someExtras: 'foo' }, VALUES).
        then(function () {
          (0, _chai.expect)(scope.isDone()).to.be.true;
          (0, _chai.expect)(scope.body.parity_postTransaction.params[0]).to.deep.equal({
            someExtras: 'foo',
            to: ADDR,
            data: ENCODED });

        });
      });
    });

    describe('estimateGas', function () {
      beforeEach(function () {
        scope = mockHttp([{ method: 'eth_estimateGas', reply: { result: ['0x123'] } }]);
      });

      it('encodes options and mades an eth_estimateGas call', function () {
        return func.
        estimateGas({ someExtras: 'foo' }, VALUES).
        then(function (amount) {
          (0, _chai.expect)(scope.isDone()).to.be.true;
          (0, _chai.expect)(amount.toString(16)).to.equal('123');
          (0, _chai.expect)(scope.body.eth_estimateGas.params).to.deep.equal([{
            someExtras: 'foo',
            to: ADDR,
            data: ENCODED }]);

        });
      });
    });

    describe('call', function () {
      it('encodes options and mades an eth_call call', function () {
        scope = mockHttp([{ method: 'eth_call', reply: { result: RETURN1 } }]);

        return func.
        call({ someExtras: 'foo' }, VALUES).
        then(function (result) {
          (0, _chai.expect)(scope.isDone()).to.be.true;
          (0, _chai.expect)(scope.body.eth_call.params).to.deep.equal([{
            someExtras: 'foo',
            to: ADDR,
            data: ENCODED },
          'latest']);
          (0, _chai.expect)(result.toString(16)).to.equal('123456');
        });
      });

      it('encodes options and mades an eth_call call (multiple returns)', function () {
        scope = mockHttp([{ method: 'eth_call', reply: { result: '' + RETURN1 + RETURN2 } }]);

        return contract.functions[1].
        call({}, []).
        then(function (result) {
          (0, _chai.expect)(scope.isDone()).to.be.true;
          (0, _chai.expect)(result.length).to.equal(2);
          (0, _chai.expect)(result[0].toString(16)).to.equal('123456');
          (0, _chai.expect)(result[1].toString(16)).to.equal('456789');
        });
      });
    });
  });

  describe('subscribe', function () {
    var abi = [
    {
      anonymous: false, name: 'Message', type: 'event',
      inputs: [
      { indexed: true, name: 'postId', type: 'uint256' },
      { indexed: false, name: 'parentId', type: 'uint256' },
      { indexed: false, name: 'sender', type: 'address' },
      { indexed: false, name: 'at', type: 'uint256' },
      { indexed: false, name: 'messageId', type: 'uint256' },
      { indexed: false, name: 'message', type: 'string' }] }];




    var logs = [{
      address: '0x22bff18ec62281850546a664bb63a5c06ac5f76c',
      blockHash: '0xa9280530a3b47bee2fc80f2862fd56502ae075350571d724d6442ea4c597347b',
      blockNumber: '0x4fcd',
      data: '0x000000000000000000000000000000000000000000000000000000000000000000000000000000000000000063cf90d3f0410092fc0fca41846f5962239791950000000000000000000000000000000000000000000000000000000056e6c85f0000000000000000000000000000000000000000000000000001000000004fcd00000000000000000000000000000000000000000000000000000000000000a0000000000000000000000000000000000000000000000000000000000000000d706f7374286d6573736167652900000000000000000000000000000000000000',
      logIndex: '0x0',
      topics: [
      '0x954ba6c157daf8a26539574ffa64203c044691aa57251af95f4b48d85ec00dd5',
      '0x0000000000000000000000000000000000000000000000000001000000004fe0'],

      transactionHash: '0xca16f537d761d13e4e80953b754e2b15541f267d6cad9381f750af1bae1e4917',
      transactionIndex: '0x0' }];


    var parsed = [{
      address: '0x22bfF18ec62281850546a664bb63a5C06AC5F76C',
      blockHash: '0xa9280530a3b47bee2fc80f2862fd56502ae075350571d724d6442ea4c597347b',
      blockNumber: new _bignumber2.default(20429),
      data: '0x000000000000000000000000000000000000000000000000000000000000000000000000000000000000000063cf90d3f0410092fc0fca41846f5962239791950000000000000000000000000000000000000000000000000000000056e6c85f0000000000000000000000000000000000000000000000000001000000004fcd00000000000000000000000000000000000000000000000000000000000000a0000000000000000000000000000000000000000000000000000000000000000d706f7374286d6573736167652900000000000000000000000000000000000000',
      event: 'Message',
      logIndex: new _bignumber2.default(0),
      params: {
        at: { type: 'uint', value: new _bignumber2.default(1457965151) },
        message: { type: 'string', value: 'post(message)' },
        messageId: { type: 'uint', value: new _bignumber2.default(281474976731085) },
        parentId: { type: 'uint', value: new _bignumber2.default(0) },
        postId: { type: 'uint', value: new _bignumber2.default(281474976731104) },
        sender: { type: 'address', value: '0x63Cf90D3f0410092FC0fca41846f596223979195' } },

      topics: [
      '0x954ba6c157daf8a26539574ffa64203c044691aa57251af95f4b48d85ec00dd5',
      '0x0000000000000000000000000000000000000000000000000001000000004fe0'],

      transactionHash: '0xca16f537d761d13e4e80953b754e2b15541f267d6cad9381f750af1bae1e4917',
      transactionIndex: new _bignumber2.default(0) }];


    var contract = void 0;

    beforeEach(function () {
      contract = new _4.default(eth, abi);
      contract.at(ADDR);
    });

    describe('invalid events', function () {
      it('fails to subscribe to an invalid names', function () {
        return contract.
        subscribe('invalid').
        catch(function (error) {
          (0, _chai.expect)(error.message).to.match(/invalid is not a valid eventName/);
        });
      });
    });

    describe('valid events', function () {
      var cbb = void 0;
      var cbe = void 0;

      beforeEach(function () {
        scope = mockHttp([
        { method: 'eth_newFilter', reply: { result: '0x123' } },
        { method: 'eth_getFilterLogs', reply: { result: logs } },
        { method: 'eth_getFilterChanges', reply: { result: logs } },
        { method: 'eth_newFilter', reply: { result: '0x123' } },
        { method: 'eth_getFilterLogs', reply: { result: logs } }]);

        cbb = _sinon2.default.stub();
        cbe = _sinon2.default.stub();

        return contract.subscribe('Message', { toBlock: 'pending' }, cbb);
      });

      it('sets the subscriptionId returned', function () {
        return contract.
        subscribe('Message', { toBlock: 'pending' }, cbe).
        then(function (subscriptionId) {
          (0, _chai.expect)(subscriptionId).to.equal(1);
        });
      });

      it('creates a new filter and retrieves the logs on it', function () {
        return contract.
        subscribe('Message', { toBlock: 'pending' }, cbe).
        then(function (subscriptionId) {
          (0, _chai.expect)(scope.isDone()).to.be.true;
        });
      });

      it('returns the logs to the callback', function () {
        return contract.
        subscribe('Message', { toBlock: 'pending' }, cbe).
        then(function (subscriptionId) {
          (0, _chai.expect)(cbe).calledWith(null, parsed).to.be.ok;
        });
      });
    });
  });
});

function mockHttp(requests) {
  _nock2.default.cleanAll();
  var scope = (0, _nock2.default)(TEST_HTTP_URL);

  requests.forEach(function (request, index) {
    scope = scope.
    post('/').
    reply(request.code || 200, function (uri, body) {
      if (body.method !== request.method) {
        return {
          error: 'Invalid method ' + body.method + ', expected ' + request.method };

      }

      scope.body = scope.body || {};
      scope.body[request.method] = body;

      return request.reply;
    });
  });

  return scope;
}