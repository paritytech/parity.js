'use strict';var _chai = require('chai');
var _bignumber = require('bignumber.js');var _bignumber2 = _interopRequireDefault(_bignumber);
var _pad = require('./pad');function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

describe('abi/util/pad', function () {
  var SHORT15 = '1234567890abcdef';
  var BYTES15 = [0x12, 0x34, 0x56, 0x78, 0x90, 0xab, 0xcd, 0xef];
  var LONG15 = SHORT15 + '000000000000000000000000000000000000000000000000';
  var PAD123 = '0000000000000000000000000000000000000000000000000000000000000123';

  describe('padAddress', function () {
    it('pads to 64 characters', function () {
      (0, _chai.expect)((0, _pad.padAddress)('123')).to.equal(PAD123);
    });

    it('strips leading 0x when passed in', function () {
      (0, _chai.expect)((0, _pad.padFixedBytes)('0x' + PAD123)).to.equal(PAD123);
    });
  });

  describe('padBool', function () {
    var TRUE = '0000000000000000000000000000000000000000000000000000000000000001';
    var FALSE = '0000000000000000000000000000000000000000000000000000000000000000';

    it('pads true to 64 characters', function () {
      (0, _chai.expect)((0, _pad.padBool)(true)).to.equal(TRUE);
    });

    it('pads false to 64 characters', function () {
      (0, _chai.expect)((0, _pad.padBool)(false)).to.equal(FALSE);
    });
  });

  describe('padU32', function () {
    it('left pads length < 64 bytes to 64 bytes', function () {
      (0, _chai.expect)((0, _pad.padU32)(1)).to.equal('0000000000000000000000000000000000000000000000000000000000000001');
    });

    it('pads hex representation', function () {
      (0, _chai.expect)((0, _pad.padU32)(0x123)).to.equal(PAD123);
    });

    it('pads decimal representation', function () {
      (0, _chai.expect)((0, _pad.padU32)(291)).to.equal(PAD123);
    });

    it('pads string representation', function () {
      (0, _chai.expect)((0, _pad.padU32)('0x123')).to.equal(PAD123);
    });

    it('pads BigNumber representation', function () {
      (0, _chai.expect)((0, _pad.padU32)(new _bignumber2.default(0x123))).to.equal(PAD123);
    });

    it('converts negative numbers to 2s complement', function () {
      (0, _chai.expect)((0, _pad.padU32)(-123)).to.equal('ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff85');
    });
  });

  describe('padFixedBytes', function () {
    it('right pads length < 64 bytes to 64 bytes (string)', function () {
      (0, _chai.expect)((0, _pad.padFixedBytes)('0x' + SHORT15)).to.equal(LONG15);
    });

    it('right pads length < 64 bytes to 64 bytes (array)', function () {
      (0, _chai.expect)((0, _pad.padFixedBytes)(BYTES15)).to.equal(LONG15);
    });

    it('right pads length > 64 bytes (64 byte multiples)', function () {
      (0, _chai.expect)((0, _pad.padFixedBytes)('0x' + LONG15 + SHORT15)).to.equal('' + LONG15 + LONG15);
    });

    it('strips leading 0x when passed in', function () {
      (0, _chai.expect)((0, _pad.padFixedBytes)('0x' + SHORT15)).to.equal(LONG15);
    });
  });

  describe('padBytes', function () {
    it('right pads length < 64, adding the length (string)', function () {
      var result = (0, _pad.padBytes)('0x' + SHORT15);

      (0, _chai.expect)(result.length).to.equal(128);
      (0, _chai.expect)(result).to.equal('' + (0, _pad.padU32)(8) + LONG15);
    });

    it('right pads length < 64, adding the length (array)', function () {
      var result = (0, _pad.padBytes)(BYTES15);

      (0, _chai.expect)(result.length).to.equal(128);
      (0, _chai.expect)(result).to.equal('' + (0, _pad.padU32)(8) + LONG15);
    });

    it('right pads length > 64, adding the length', function () {
      var result = (0, _pad.padBytes)('0x' + LONG15 + SHORT15);

      (0, _chai.expect)(result.length).to.equal(192);
      (0, _chai.expect)(result).to.equal('' + (0, _pad.padU32)(0x28) + LONG15 + LONG15);
    });
  });

  describe('padString', function () {
    it('correctly converts & pads strings', function () {
      var result = (0, _pad.padString)('gavofyork');

      (0, _chai.expect)(result.length).to.equal(128);
      (0, _chai.expect)(result).to.equal((0, _pad.padBytes)('0x6761766f66796f726b'));
    });
  });
});