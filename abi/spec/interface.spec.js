'use strict';var _chai = require('chai');
var _interface = require('./interface');var _interface2 = _interopRequireDefault(_interface);
var _paramType = require('./paramType');var _paramType2 = _interopRequireDefault(_paramType);
var _token = require('../token');var _token2 = _interopRequireDefault(_token);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

describe('abi/spec/Interface', function () {
  var construct = {
    type: 'constructor',
    inputs: [] };

  var event = {
    type: 'event',
    name: 'Event2',
    anonymous: false,
    inputs: [{ name: 'a', type: 'uint256', indexed: true }, { name: 'b', type: 'bytes32', indexed: false }] };

  var func = {
    type: 'function',
    name: 'foo',
    inputs: [{ name: 'a', type: 'uint256' }],
    outputs: [] };


  describe('parseABI', function () {
    it('throws on invalid types', function () {
      (0, _chai.expect)(function () {return _interface2.default.parseABI([{ type: 'noMatch' }]);}).to.throw(/noMatch/);
    });

    it('creates constructors', function () {
      (0, _chai.expect)(_interface2.default.parseABI([construct])).to.deep.equal([{ _inputs: [] }]);
    });

    it('creates events', function () {
      (0, _chai.expect)(_interface2.default.parseABI([event])[0].name).to.equal('Event2');
    });

    it('creates functions', function () {
      (0, _chai.expect)(_interface2.default.parseABI([func])[0].name).to.equal('foo');
    });

    it('parse complex interfaces', function () {
      (0, _chai.expect)(_interface2.default.parseABI([construct, event, func]).length).to.equal(3);
    });
  });

  describe('constructor', function () {
    var int = new _interface2.default([construct, event, func]);

    it('contains the full interface', function () {
      (0, _chai.expect)(int.interface.length).to.equal(3);
    });

    it('contains the constructors', function () {
      (0, _chai.expect)(int.constructors.length).to.equal(1);
    });

    it('contains the events', function () {
      (0, _chai.expect)(int.events.length).to.equal(1);
    });

    it('contains the functions', function () {
      (0, _chai.expect)(int.functions.length).to.equal(1);
    });
  });

  describe('encodeTokens', function () {
    var int = new _interface2.default([construct, event, func]);

    it('encodes simple types', function () {
      (0, _chai.expect)(
      int.encodeTokens(
      [new _paramType2.default('bool'), new _paramType2.default('string'), new _paramType2.default('int'), new _paramType2.default('uint')],
      [true, 'gavofyork', -123, 123])).

      to.deep.equal([
      new _token2.default('bool', true), new _token2.default('string', 'gavofyork'), new _token2.default('int', -123), new _token2.default('uint', 123)]);

    });

    it('encodes array', function () {
      (0, _chai.expect)(
      int.encodeTokens(
      [new _paramType2.default('array', new _paramType2.default('bool'))],
      [[true, false, true]])).

      to.deep.equal([
      new _token2.default('array', [
      new _token2.default('bool', true), new _token2.default('bool', false), new _token2.default('bool', true)])]);


    });

    it('encodes simple with array of array', function () {
      (0, _chai.expect)(
      int.encodeTokens(
      [
      new _paramType2.default('bool'),
      new _paramType2.default('fixedArray', new _paramType2.default('array', new _paramType2.default('uint')), 2)],

      [true, [[0, 1], [2, 3]]])).

      to.deep.equal([
      new _token2.default('bool', true),
      new _token2.default('fixedArray', [
      new _token2.default('array', [new _token2.default('uint', 0), new _token2.default('uint', 1)]),
      new _token2.default('array', [new _token2.default('uint', 2), new _token2.default('uint', 3)])])]);


    });
  });
});