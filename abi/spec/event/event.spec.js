'use strict';var _bignumber = require('bignumber.js');var _bignumber2 = _interopRequireDefault(_bignumber);
var _chai = require('chai');

var _event = require('./event');var _event2 = _interopRequireDefault(_event);
var _eventParam = require('./eventParam');var _eventParam2 = _interopRequireDefault(_eventParam);
var _decodedLogParam = require('./decodedLogParam');var _decodedLogParam2 = _interopRequireDefault(_decodedLogParam);
var _paramType = require('../paramType');var _paramType2 = _interopRequireDefault(_paramType);
var _token = require('../../token');var _token2 = _interopRequireDefault(_token);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

describe('abi/spec/event/Event', function () {
  var inputArr = [{ name: 'a', type: 'bool' }, { name: 'b', type: 'uint', indexed: true }];
  var inputs = [new _eventParam2.default('a', 'bool', false), new _eventParam2.default('b', 'uint', true)];
  var event = new _event2.default({ name: 'test', inputs: inputArr, anonymous: true });

  describe('constructor', function () {
    it('stores the parameters as received', function () {
      (0, _chai.expect)(event.name).to.equal('test');
      (0, _chai.expect)(event.inputs).to.deep.equal(inputs);
      (0, _chai.expect)(event.anonymous).to.be.true;
    });

    it('matches empty inputs with []', function () {
      (0, _chai.expect)(new _event2.default({ name: 'test' }).inputs).to.deep.equal([]);
    });

    it('sets the event signature', function () {
      (0, _chai.expect)(new _event2.default({ name: 'baz' }).signature).
      to.equal('a7916fac4f538170f7cd12c148552e2cba9fcd72329a2dd5b07a6fa906488ddf');
    });
  });

  describe('inputParamTypes', function () {
    it('returns all the types', function () {
      (0, _chai.expect)(event.inputParamTypes()).to.deep.equal([new _paramType2.default('bool'), new _paramType2.default('uint', null, 256, true)]);
    });
  });

  describe('inputParamNames', function () {
    it('returns all the names', function () {
      (0, _chai.expect)(event.inputParamNames()).to.deep.equal(['a', 'b']);
    });
  });

  describe('indexedParams', function () {
    it('returns all indexed parameters (indexed)', function () {
      (0, _chai.expect)(event.indexedParams(true)).to.deep.equal([inputs[1]]);
    });

    it('returns all indexed parameters (non-indexed)', function () {
      (0, _chai.expect)(event.indexedParams(false)).to.deep.equal([inputs[0]]);
    });
  });

  describe('decodeLog', function () {
    it('decodes an event', function () {
      var event = new _event2.default({
        name: 'foo',
        inputs: [
        { name: 'a', type: 'int' },
        { name: 'b', type: 'int', indexed: true },
        { name: 'c', type: 'address' },
        { name: 'd', type: 'address', indexed: true }] });


      var decoded = event.decodeLog([
      '0000000000000000000000004444444444444444444444444444444444444444',
      '0000000000000000000000000000000000000000000000000000000000000002',
      '0000000000000000000000001111111111111111111111111111111111111111'],
      '00000000000000000000000000000000000000000000000000000000000000030000000000000000000000002222222222222222222222222222222222222222');

      (0, _chai.expect)(decoded.address).to.equal('0x4444444444444444444444444444444444444444');
      (0, _chai.expect)(decoded.params).to.deep.equal([
      new _decodedLogParam2.default('a', new _paramType2.default('int', null, 256), new _token2.default('int', new _bignumber2.default(3))),
      new _decodedLogParam2.default('b', new _paramType2.default('int', null, 256, true), new _token2.default('int', new _bignumber2.default(2))),
      new _decodedLogParam2.default('c', new _paramType2.default('address'), new _token2.default('address', '0x2222222222222222222222222222222222222222')),
      new _decodedLogParam2.default('d', new _paramType2.default('address', null, 0, true), new _token2.default('address', '0x1111111111111111111111111111111111111111'))]);

    });

    it('decodes an anonymous event', function () {
      var event = new _event2.default({ name: 'foo', inputs: [{ name: 'a', type: 'int' }], anonymous: true });
      var decoded = event.decodeLog([], '0000000000000000000000000000000000000000000000000000000000000003');

      (0, _chai.expect)(decoded.address).to.not.be.ok;
      (0, _chai.expect)(decoded.params).to.deep.equal([
      new _decodedLogParam2.default('a', new _paramType2.default('int', null, 256), new _token2.default('int', new _bignumber2.default(3)))]);

    });

    it('throws on invalid topics', function () {
      var event = new _event2.default({ name: 'foo', inputs: [{ name: 'a', type: 'int' }], anonymous: true });

      (0, _chai.expect)(function () {return event.decodeLog(['0000000000000000000000004444444444444444444444444444444444444444'], '0000000000000000000000000000000000000000000000000000000000000003');}).to.throw(/Invalid/);
    });
  });
});