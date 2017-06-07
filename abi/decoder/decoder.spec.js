'use strict';var _bignumber = require('bignumber.js');var _bignumber2 = _interopRequireDefault(_bignumber);
var _chai = require('chai');

var _decoder = require('./decoder');var _decoder2 = _interopRequireDefault(_decoder);
var _paramType = require('../spec/paramType');var _paramType2 = _interopRequireDefault(_paramType);
var _token = require('../token');var _token2 = _interopRequireDefault(_token);
var _pad = require('../util/pad');function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

describe('abi/decoder/Decoder', function () {
  var stringToBytes = function stringToBytes(str) {
    return str.match(/.{1,2}/g).map(function (code) {return parseInt(code, 16);});
  };

  var address1 = '0000000000000000000000001111111111111111111111111111111111111111';
  var address2 = '0000000000000000000000002222222222222222222222222222222222222222';
  var address3 = '0000000000000000000000003333333333333333333333333333333333333333';
  var address4 = '0000000000000000000000004444444444444444444444444444444444444444';
  var bool1 = '0000000000000000000000000000000000000000000000000000000000000001';
  var bytes1 = '1234000000000000000000000000000000000000000000000000000000000000';
  var bytes2 = '1000000000000000000000000000000000000000000000000000000000000000';
  var bytes3 = '10000000000000000000000000000000000000000000000000000000000002';
  var bytes4 = '0010000000000000000000000000000000000000000000000000000000000002';
  var int1 = '0111111111111111111111111111111111111111111111111111111111111111';
  var intn = 'ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff85';
  var string1 = '6761766f66796f726b0000000000000000000000000000000000000000000000';
  var string2 = '4665726ee16e64657a0000000000000000000000000000000000000000000000';
  var tokenAddress1 = new _token2.default('address', '0x' + address1.slice(-40));
  var tokenAddress2 = new _token2.default('address', '0x' + address2.slice(-40));
  var tokenAddress3 = new _token2.default('address', '0x' + address3.slice(-40));
  var tokenAddress4 = new _token2.default('address', '0x' + address4.slice(-40));
  var tokenBool1 = new _token2.default('bool', true);
  var tokenFixedBytes1 = new _token2.default('fixedBytes', [0x12, 0x34]);
  var tokenBytes1 = new _token2.default('bytes', [0x12, 0x34]);
  var tokenBytes2 = new _token2.default('bytes', stringToBytes(bytes2).concat(stringToBytes(bytes2)));
  var tokenBytes3 = new _token2.default('bytes', stringToBytes(bytes3));
  var tokenBytes4 = new _token2.default('bytes', stringToBytes(bytes4));
  var tokenInt1 = new _token2.default('int', new _bignumber2.default(int1, 16));
  var tokenIntn = new _token2.default('int', new _bignumber2.default(-123));
  var tokenUint1 = new _token2.default('uint', new _bignumber2.default(int1, 16));
  var tokenUintn = new _token2.default('uint', new _bignumber2.default(intn, 16));
  var tokenString1 = new _token2.default('string', 'gavofyork');
  var tokenString2 = new _token2.default('string', 'Fernández');
  var slices = [address1, address2, address3, address4];

  describe('peek', function () {
    it('returns the slice at the correct position', function () {
      (0, _chai.expect)(_decoder2.default.peek(slices, 1)).to.equal(slices[1]);
    });

    it('returns empty on invalid slices', function () {
      (0, _chai.expect)(_decoder2.default.peek(null, 4)).to.equal('0000000000000000000000000000000000000000000000000000000000000000');
    });
  });

  describe('takeBytes', function () {
    it('returns a single slice', function () {
      (0, _chai.expect)(_decoder2.default.takeBytes(slices, 0, 32).bytes).to.deep.equal(stringToBytes(slices[0]));
    });

    it('returns a single partial slice', function () {
      (0, _chai.expect)(_decoder2.default.takeBytes(slices, 0, 20).bytes).to.deep.equal(stringToBytes(slices[0].substr(0, 40)));
    });

    it('returns multiple slices', function () {
      (0, _chai.expect)(_decoder2.default.takeBytes(slices, 0, 64).bytes).to.deep.equal(stringToBytes('' + slices[0] + slices[1]));
    });

    it('returns a single offset slice', function () {
      (0, _chai.expect)(_decoder2.default.takeBytes(slices, 1, 32).bytes).to.deep.equal(stringToBytes(slices[1]));
    });

    it('returns multiple offset slices', function () {
      (0, _chai.expect)(_decoder2.default.takeBytes(slices, 1, 64).bytes).to.deep.equal(stringToBytes('' + slices[1] + slices[2]));
    });

    it('returns the requires length from slices', function () {
      (0, _chai.expect)(
      _decoder2.default.takeBytes(slices, 1, 75).bytes).
      to.deep.equal(stringToBytes(('' + slices[1] + slices[2] + slices[3]).substr(0, 150)));
    });
  });

  describe('decodeParam', function () {
    it('throws an error on non ParamType param', function () {
      (0, _chai.expect)(function () {return _decoder2.default.decodeParam({});}).to.throw(/ParamType/);
    });

    it('throws an error on invalid param type', function () {
      var pt = new _paramType2.default('address');

      pt._type = 'noMatch';

      (0, _chai.expect)(function () {return _decoder2.default.decodeParam(pt);}).to.throw(/noMatch/);
    });

    it('decodes an address', function () {
      (0, _chai.expect)(
      _decoder2.default.decodeParam(new _paramType2.default('address'), [address1], 0).token).
      to.deep.equal(tokenAddress1);
    });

    it('decodes a bool', function () {
      (0, _chai.expect)(
      _decoder2.default.decodeParam(new _paramType2.default('bool'), [bool1], 0).token).
      to.deep.equal(tokenBool1);
    });

    it('decodes an int', function () {
      (0, _chai.expect)(
      _decoder2.default.decodeParam(new _paramType2.default('int'), [int1], 0).token).
      to.deep.equal(tokenInt1);
    });

    it('decodes a negative int', function () {
      (0, _chai.expect)(
      _decoder2.default.decodeParam(new _paramType2.default('int'), [intn], 0).token).
      to.deep.equal(tokenIntn);
    });

    it('decodes an uint', function () {
      (0, _chai.expect)(
      _decoder2.default.decodeParam(new _paramType2.default('uint'), [int1], 0).token).
      to.deep.equal(tokenUint1);
    });

    it('decodes an uint (negative as int)', function () {
      (0, _chai.expect)(
      _decoder2.default.decodeParam(new _paramType2.default('uint'), [intn], 0).token).
      to.deep.equal(tokenUintn);
    });

    it('decodes fixedBytes', function () {
      (0, _chai.expect)(
      _decoder2.default.decodeParam(new _paramType2.default('fixedBytes', null, 2), [bytes1], 0).token).
      to.deep.equal(tokenFixedBytes1);
    });

    it('decodes bytes', function () {
      (0, _chai.expect)(
      _decoder2.default.decodeParam(new _paramType2.default('bytes'), [(0, _pad.padU32)(0x20), (0, _pad.padU32)(2), bytes1], 0).token).
      to.deep.equal(tokenBytes1);
    });

    it('decodes string', function () {
      (0, _chai.expect)(
      _decoder2.default.decodeParam(new _paramType2.default('string'), [(0, _pad.padU32)(0x20), (0, _pad.padU32)(9), string1], 0).token).
      to.deep.equal(tokenString1);
    });

    it('decodes utf8-invalid string', function () {
      (0, _chai.expect)(
      _decoder2.default.decodeParam(new _paramType2.default('string'), [(0, _pad.padU32)(0x20), (0, _pad.padU32)(9), string2], 0).token).
      to.deep.equal(tokenString2);
    });

    it('decodes string (indexed)', function () {
      (0, _chai.expect)(
      _decoder2.default.decodeParam(new _paramType2.default('string', null, 0, true), [bytes1], 0)).
      to.deep.equal(_decoder2.default.decodeParam(new _paramType2.default('fixedBytes', null, 32, true), [bytes1], 0));
    });
  });

  describe('decode', function () {
    it('throws an error on invalid params', function () {
      (0, _chai.expect)(function () {return _decoder2.default.decode(null, '123');}).to.throw(/array/);
    });

    describe('address', function () {
      it('decodes an address', function () {
        (0, _chai.expect)(
        _decoder2.default.decode(
        [new _paramType2.default('address')], '' +
        address1)).

        to.deep.equal([tokenAddress1]);
      });

      it('decodes 2 addresses', function () {
        (0, _chai.expect)(
        _decoder2.default.decode(
        [new _paramType2.default('address'), new _paramType2.default('address')], '' +
        address1 + address2)).

        to.deep.equal([tokenAddress1, tokenAddress2]);
      });

      it('decodes a fixedArray of addresses', function () {
        (0, _chai.expect)(
        _decoder2.default.decode(
        [new _paramType2.default('fixedArray', new _paramType2.default('address'), 2)], '' +
        address1 + address2)).

        to.deep.equal([new _token2.default('fixedArray', [tokenAddress1, tokenAddress2])]);
      });

      it('decodes a dynamic array of addresses', function () {
        (0, _chai.expect)(
        _decoder2.default.decode(
        [new _paramType2.default('array', new _paramType2.default('address'))], '' +
        (0, _pad.padU32)(0x20) + (0, _pad.padU32)(2) + address1 + address2)).

        to.deep.equal([new _token2.default('array', [tokenAddress1, tokenAddress2])]);
      });

      it('decodes a dynamic array of fixed arrays', function () {
        (0, _chai.expect)(
        _decoder2.default.decode(
        [new _paramType2.default('array', new _paramType2.default('fixedArray', new _paramType2.default('address'), 2))], '' +
        (0, _pad.padU32)(0x20) + (0, _pad.padU32)(2) + address1 + address2 + address3 + address4)).

        to.deep.equal([
        new _token2.default('array', [
        new _token2.default('fixedArray', [tokenAddress1, tokenAddress2]),
        new _token2.default('fixedArray', [tokenAddress3, tokenAddress4])])]);


      });
    });

    describe('int', function () {
      it('decodes an int', function () {
        (0, _chai.expect)(
        _decoder2.default.decode(
        [new _paramType2.default('int')], '' +
        int1)).

        to.deep.equal([tokenInt1]);
      });
    });

    describe('uint', function () {
      it('decodes an uint', function () {
        (0, _chai.expect)(
        _decoder2.default.decode(
        [new _paramType2.default('uint')], '' +
        int1)).

        to.deep.equal([tokenUint1]);
      });
    });

    describe('fixedBytes', function () {
      it('decodes fixedBytes', function () {
        (0, _chai.expect)(
        _decoder2.default.decode(
        [new _paramType2.default('fixedBytes', null, 2)], '' +
        bytes1)).

        to.deep.equal([tokenFixedBytes1]);
      });
    });

    describe('bytes', function () {
      it('decodes bytes', function () {
        (0, _chai.expect)(
        _decoder2.default.decode(
        [new _paramType2.default('bytes')], '' +
        (0, _pad.padU32)(0x20) + (0, _pad.padU32)(2) + bytes1)).

        to.deep.equal([tokenBytes1]);
      });

      it('decodes bytes sequence', function () {
        (0, _chai.expect)(
        _decoder2.default.decode(
        [new _paramType2.default('bytes')], '' +
        (0, _pad.padU32)(0x20) + (0, _pad.padU32)(0x40) + bytes2 + bytes2)).

        to.deep.equal([tokenBytes2]);
      });

      it('decodes bytes seuence (2)', function () {
        (0, _chai.expect)(
        _decoder2.default.decode(
        [new _paramType2.default('bytes'), new _paramType2.default('bytes')], '' +
        (0, _pad.padU32)(0x40) + (0, _pad.padU32)(0x80) + (0, _pad.padU32)(0x1f) + bytes3 + '00' + (0, _pad.padU32)(0x20) + bytes4)).

        to.deep.equal([tokenBytes3, tokenBytes4]);
      });
    });

    describe('bool', function () {
      it('decodes a single bool', function () {
        (0, _chai.expect)(
        _decoder2.default.decode(
        [new _paramType2.default('bool')],
        bool1)).

        to.deep.equal([tokenBool1]);
      });
    });

    describe('string', function () {
      it('decodes a string', function () {
        (0, _chai.expect)(
        _decoder2.default.decode(
        [new _paramType2.default('string')], '' +
        (0, _pad.padU32)(0x20) + (0, _pad.padU32)(9) + string1)).

        to.deep.equal([tokenString1]);
      });
    });
  });
});