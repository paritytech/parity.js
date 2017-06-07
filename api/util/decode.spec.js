'use strict';var _chai = require('chai');
var _bignumber = require('bignumber.js');var _bignumber2 = _interopRequireDefault(_bignumber);
var _decode = require('./decode');function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

describe('api/util/decode', function () {
  var METH = '0x70a08231';
  var ENCO = '0x70a082310000000000000000000000005A5eFF38DA95b0D58b6C616f2699168B480953C9';
  var DATA = '0x0000000000000000000000005A5eFF38DA95b0D58b6C616f2699168B480953C9';

  describe('decodeCallData', function () {
    it('throws on non-hex inputs', function () {
      (0, _chai.expect)(function () {return (0, _decode.decodeCallData)('invalid');}).to.throw(/should be a hex value/);
    });

    it('throws when invalid signature length', function () {
      (0, _chai.expect)(function () {return (0, _decode.decodeCallData)(METH.slice(-6));}).to.throw(/should be method signature/);
    });

    it('splits valid inputs properly', function () {
      (0, _chai.expect)((0, _decode.decodeCallData)(ENCO)).to.deep.equal({
        signature: METH,
        paramdata: DATA });

    });
  });

  describe('decodeMethodInput', function () {
    it('expects a valid ABI', function () {
      (0, _chai.expect)(function () {return (0, _decode.decodeMethodInput)(null, null);}).to.throw(/should receive valid method/);
    });

    it('expect valid hex parameter data', function () {
      (0, _chai.expect)(function () {return (0, _decode.decodeMethodInput)({}, 'invalid');}).to.throw(/should be a hex value/);
    });

    it('correctly decodes valid inputs', function () {
      (0, _chai.expect)(
      (0, _decode.decodeMethodInput)({
        type: 'function',
        inputs: [
        { type: 'uint' }] },

      DATA)).
      to.deep.equal(
      [new _bignumber2.default('0x5a5eff38da95b0d58b6c616f2699168b480953c9')]);

    });
  });

  describe('methodToAbi', function () {
    it('throws when no start ( specified', function () {
      (0, _chai.expect)(function () {return (0, _decode.methodToAbi)('invalid,uint,bool)');}).to.throw(/Missing start \(/);
    });

    it('throws when no end ) specified', function () {
      (0, _chai.expect)(function () {return (0, _decode.methodToAbi)('invalid(uint,bool');}).to.throw(/Missing end \)/);
    });

    it('throws when end ) is not in the last position', function () {
      (0, _chai.expect)(function () {return (0, _decode.methodToAbi)('invalid(uint,bool)2');}).to.throw(/Extra characters after end \)/);
    });

    it('throws when start ( is after end )', function () {
      (0, _chai.expect)(function () {return (0, _decode.methodToAbi)('invalid)uint,bool(');}).to.throw(/End \) is before start \(/);
    });

    it('throws when invalid types are present', function () {
      (0, _chai.expect)(function () {return (0, _decode.methodToAbi)('method(invalidType,bool,uint)');}).to.throw(/Cannot convert invalidType/);
    });

    it('returns a valid methodabi for a valid method', function () {
      (0, _chai.expect)((0, _decode.methodToAbi)('valid(uint,bool)')).to.deep.equals({
        type: 'function',
        name: 'valid',
        inputs: [
        { type: 'uint256' },
        { type: 'bool' }] });


    });
  });

  describe('abiDecode', function () {
    it('correctly decodes valid inputs', function () {
      (0, _chai.expect)((0, _decode.abiDecode)(['uint'], DATA)).to.deep.equal(
      [new _bignumber2.default('0x5a5eff38da95b0d58b6c616f2699168b480953c9')]);

    });
  });
});