'use strict';var _chai = require('chai');
var _encoder = require('./encoder');var _encoder2 = _interopRequireDefault(_encoder);
var _token = require('../token');var _token2 = _interopRequireDefault(_token);
var _pad = require('../util/pad');function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

describe('abi/encoder/Encoder', function () {
  describe('encodeToken', function () {
    it('requires token as Token', function () {
      (0, _chai.expect)(function () {return _encoder2.default.encodeToken();}).to.throw(/Token/);
    });

    it('encodes address tokens in Mediate(raw)', function () {
      var mediate = _encoder2.default.encodeToken(new _token2.default('address', '123'));

      (0, _chai.expect)(mediate.type).to.equal('raw');
      (0, _chai.expect)(mediate.value).to.be.ok;
    });

    it('encodes bool tokens in Mediate(raw)', function () {
      var mediatet = _encoder2.default.encodeToken(new _token2.default('bool', true));
      var mediatef = _encoder2.default.encodeToken(new _token2.default('bool', false));

      (0, _chai.expect)(mediatet.type).to.equal('raw');
      (0, _chai.expect)(mediatet.value).to.be.ok;

      (0, _chai.expect)(mediatef.type).to.equal('raw');
      (0, _chai.expect)(mediatef.value).to.be.ok;
    });

    it('encodes int tokens in Mediate(raw)', function () {
      var mediate = _encoder2.default.encodeToken(new _token2.default('int', '123'));

      (0, _chai.expect)(mediate.type).to.equal('raw');
      (0, _chai.expect)(mediate.value).to.be.ok;
    });

    it('encodes uint tokens in Mediate(raw)', function () {
      var mediate = _encoder2.default.encodeToken(new _token2.default('uint', '123'));

      (0, _chai.expect)(mediate.type).to.equal('raw');
      (0, _chai.expect)(mediate.value).to.be.ok;
    });

    it('encodes fixedBytes tokens in Mediate(raw)', function () {
      var mediate = _encoder2.default.encodeToken(new _token2.default('fixedBytes', '123'));

      (0, _chai.expect)(mediate.type).to.equal('raw');
      (0, _chai.expect)(mediate.value).to.be.ok;
    });

    it('encodes bytes tokens in Mediate(prefixed)', function () {
      var mediate = _encoder2.default.encodeToken(new _token2.default('bytes', '123'));

      (0, _chai.expect)(mediate.type).to.equal('prefixed');
      (0, _chai.expect)(mediate.value).to.be.ok;
    });

    it('encodes string tokens in Mediate(prefixed)', function () {
      var mediate = _encoder2.default.encodeToken(new _token2.default('string', '123'));

      (0, _chai.expect)(mediate.type).to.equal('prefixed');
      (0, _chai.expect)(mediate.value).to.be.ok;
    });

    it('encodes fixedArray tokens in Mediate(fixedArray)', function () {
      var mediate = _encoder2.default.encodeToken(new _token2.default('fixedArray', [new _token2.default('uint', '123')]));

      (0, _chai.expect)(mediate.type).to.equal('fixedArray');
      (0, _chai.expect)(mediate.value).to.be.ok;
    });

    it('encodes array tokens in Mediate(array)', function () {
      var mediate = _encoder2.default.encodeToken(new _token2.default('array', [new _token2.default('uint', '123')]));

      (0, _chai.expect)(mediate.type).to.equal('array');
      (0, _chai.expect)(mediate.value).to.be.ok;
    });

    it('throws an Error on invalid tokens', function () {
      var token = new _token2.default('address');

      token._type = 'noMatch';

      (0, _chai.expect)(function () {return _encoder2.default.encodeToken(token);}).to.throw(/noMatch/);
    });
  });

  describe('encode', function () {
    it('requires tokens array', function () {
      (0, _chai.expect)(function () {return _encoder2.default.encode();}).to.throw(/array/);
    });

    describe('addresses', function () {
      var address1 = '1111111111111111111111111111111111111111';
      var address2 = '2222222222222222222222222222222222222222';
      var address3 = '3333333333333333333333333333333333333333';
      var address4 = '4444444444444444444444444444444444444444';
      var encAddress1 = (0, _pad.padAddress)(address1);
      var encAddress2 = (0, _pad.padAddress)(address2);
      var encAddress3 = (0, _pad.padAddress)(address3);
      var encAddress4 = (0, _pad.padAddress)(address4);
      var tokenAddress1 = new _token2.default('address', address1);
      var tokenAddress2 = new _token2.default('address', address2);
      var tokenAddress3 = new _token2.default('address', address3);
      var tokenAddress4 = new _token2.default('address', address4);

      it('encodes an address', function () {
        var token = tokenAddress1;

        (0, _chai.expect)(_encoder2.default.encode([token])).to.equal(encAddress1);
      });

      it('encodes an array of addresses', function () {
        var expected = '' + (0, _pad.padU32)(0x20) + (0, _pad.padU32)(2) + encAddress1 + encAddress2;
        var token = new _token2.default('array', [tokenAddress1, tokenAddress2]);

        (0, _chai.expect)(_encoder2.default.encode([token])).to.equal(expected);
      });

      it('encodes an fixedArray of addresses', function () {
        var expected = '' + encAddress1 + encAddress2;
        var token = new _token2.default('fixedArray', [tokenAddress1, tokenAddress2]);

        (0, _chai.expect)(_encoder2.default.encode([token])).to.equal(expected);
      });

      it('encodes two addresses', function () {
        var expected = '' + encAddress1 + encAddress2;
        var tokens = [tokenAddress1, tokenAddress2];

        (0, _chai.expect)(_encoder2.default.encode(tokens)).to.equal(expected);
      });

      it('encodes fixed array of dynamic array addresses', function () {
        var tokens1 = new _token2.default('array', [tokenAddress1, tokenAddress2]);
        var tokens2 = new _token2.default('array', [tokenAddress3, tokenAddress4]);
        var fixed = new _token2.default('fixedArray', [tokens1, tokens2]);
        var expected = '' + (0, _pad.padU32)(0x40) + (0, _pad.padU32)(0xa0) + (0, _pad.padU32)(2) + encAddress1 + encAddress2 + (0, _pad.padU32)(2) + encAddress3 + encAddress4;

        (0, _chai.expect)(_encoder2.default.encode([fixed])).to.equal(expected);
      });

      it('encodes dynamic array of fixed array addresses', function () {
        var tokens1 = new _token2.default('fixedArray', [tokenAddress1, tokenAddress2]);
        var tokens2 = new _token2.default('fixedArray', [tokenAddress3, tokenAddress4]);
        var dynamic = new _token2.default('array', [tokens1, tokens2]);
        var expected = '' + (0, _pad.padU32)(0x20) + (0, _pad.padU32)(2) + encAddress1 + encAddress2 + encAddress3 + encAddress4;

        (0, _chai.expect)(_encoder2.default.encode([dynamic])).to.equal(expected);
      });

      it('encodes dynamic array of dynamic array addresses', function () {
        var tokens1 = new _token2.default('array', [tokenAddress1]);
        var tokens2 = new _token2.default('array', [tokenAddress2]);
        var dynamic = new _token2.default('array', [tokens1, tokens2]);
        var expected = '' + (0, _pad.padU32)(0x20) + (0, _pad.padU32)(2) + (0, _pad.padU32)(0x80) + (0, _pad.padU32)(0xc0) + (0, _pad.padU32)(1) + encAddress1 + (0, _pad.padU32)(1) + encAddress2;

        (0, _chai.expect)(_encoder2.default.encode([dynamic])).to.equal(expected);
      });

      it('encodes dynamic array of dynamic array addresses (2)', function () {
        var tokens1 = new _token2.default('array', [tokenAddress1, tokenAddress2]);
        var tokens2 = new _token2.default('array', [tokenAddress3, tokenAddress4]);
        var dynamic = new _token2.default('array', [tokens1, tokens2]);
        var expected = '' + (0, _pad.padU32)(0x20) + (0, _pad.padU32)(2) + (0, _pad.padU32)(0x80) + (0, _pad.padU32)(0xe0) + (0, _pad.padU32)(2) + encAddress1 + encAddress2 + (0, _pad.padU32)(2) + encAddress3 + encAddress4;

        (0, _chai.expect)(_encoder2.default.encode([dynamic])).to.equal(expected);
      });

      it('encodes fixed array of fixed array addresses', function () {
        var tokens1 = new _token2.default('fixedArray', [tokenAddress1, tokenAddress2]);
        var tokens2 = new _token2.default('fixedArray', [tokenAddress3, tokenAddress4]);
        var dynamic = new _token2.default('fixedArray', [tokens1, tokens2]);
        var expected = '' + encAddress1 + encAddress2 + encAddress3 + encAddress4;

        (0, _chai.expect)(_encoder2.default.encode([dynamic])).to.equal(expected);
      });
    });

    describe('bytes', function () {
      var bytes1 = '0x1234';
      var bytes2 = '0x10000000000000000000000000000000000000000000000000000000000002';
      var bytes3 = '0x1000000000000000000000000000000000000000000000000000000000000000';

      it('encodes fixed bytes', function () {
        var token = new _token2.default('fixedBytes', bytes1);

        (0, _chai.expect)(_encoder2.default.encode([token])).to.equal((0, _pad.padFixedBytes)(bytes1));
      });

      it('encodes bytes', function () {
        var token = new _token2.default('bytes', bytes1);

        (0, _chai.expect)(_encoder2.default.encode([token])).to.equal('' + (0, _pad.padU32)(0x20) + (0, _pad.padU32)(2) + (0, _pad.padFixedBytes)(bytes1));
      });

      it('encodes bytes (short of boundary)', function () {
        var token = new _token2.default('bytes', bytes2);

        (0, _chai.expect)(_encoder2.default.encode([token])).to.equal('' + (0, _pad.padU32)(0x20) + (0, _pad.padU32)(0x1f) + (0, _pad.padFixedBytes)(bytes2));
      });

      it('encodes bytes (two blocks)', function () {
        var input = '' + bytes3 + bytes3.slice(-64);
        var token = new _token2.default('bytes', input);

        (0, _chai.expect)(_encoder2.default.encode([token])).to.equal('' + (0, _pad.padU32)(0x20) + (0, _pad.padU32)(0x40) + (0, _pad.padFixedBytes)(input));
      });

      it('encodes two consecutive bytes', function () {
        var in1 = '0x10000000000000000000000000000000000000000000000000000000000002';
        var in2 = '0x0010000000000000000000000000000000000000000000000000000000000002';
        var tokens = [new _token2.default('bytes', in1), new _token2.default('bytes', in2)];

        (0, _chai.expect)(_encoder2.default.encode(tokens)).to.equal('' + (0, _pad.padU32)(0x40) + (0, _pad.padU32)(0x80) + (0, _pad.padU32)(0x1f) + (0, _pad.padFixedBytes)(in1) + (0, _pad.padU32)(0x20) + (0, _pad.padFixedBytes)(in2));
      });
    });

    describe('string', function () {
      it('encodes a string', function () {
        var string = 'gavofyork';
        var stringEnc = (0, _pad.padFixedBytes)('0x6761766f66796f726b');
        var token = new _token2.default('string', string);

        (0, _chai.expect)(_encoder2.default.encode([token])).to.equal('' + (0, _pad.padU32)(0x20) + (0, _pad.padU32)(string.length.toString(16)) + stringEnc);
      });
    });

    describe('uint', function () {
      it('encodes a uint', function () {
        var token = new _token2.default('uint', 4);

        (0, _chai.expect)(_encoder2.default.encode([token])).to.equal((0, _pad.padU32)(4));
      });
    });

    describe('int', function () {
      it('encodes a int', function () {
        var token = new _token2.default('int', 4);

        (0, _chai.expect)(_encoder2.default.encode([token])).to.equal((0, _pad.padU32)(4));
      });
    });

    describe('bool', function () {
      it('encodes a bool (true)', function () {
        var token = new _token2.default('bool', true);

        (0, _chai.expect)(_encoder2.default.encode([token])).to.equal((0, _pad.padU32)(1));
      });

      it('encodes a bool (false)', function () {
        var token = new _token2.default('bool', false);

        (0, _chai.expect)(_encoder2.default.encode([token])).to.equal((0, _pad.padU32)(0));
      });
    });

    describe('comprehensive test', function () {
      it('encodes a complex sequence', function () {
        var bytes = '0x131a3afc00d1b1e3461b955e53fc866dcf303b3eb9f4c16f89e388930f48134b131a3afc00d1b1e3461b955e53fc866dcf303b3eb9f4c16f89e388930f48134b';
        var tokens = [new _token2.default('int', 5), new _token2.default('bytes', bytes), new _token2.default('int', 3), new _token2.default('bytes', bytes)];

        (0, _chai.expect)(_encoder2.default.encode(tokens)).to.equal('' + (0, _pad.padU32)(5) + (0, _pad.padU32)(0x80) + (0, _pad.padU32)(3) + (0, _pad.padU32)(0xe0) + (0, _pad.padU32)(0x40) + bytes.substr(2) + (0, _pad.padU32)(0x40) + bytes.substr(2));
      });

      it('encodes a complex sequence (nested)', function () {
        var array = [new _token2.default('int', 5), new _token2.default('int', 6), new _token2.default('int', 7)];
        var tokens = [new _token2.default('int', 1), new _token2.default('string', 'gavofyork'), new _token2.default('int', 2), new _token2.default('int', 3), new _token2.default('int', 4), new _token2.default('array', array)];
        var stringEnc = (0, _pad.padFixedBytes)('0x6761766f66796f726b');

        (0, _chai.expect)(_encoder2.default.encode(tokens)).to.equal('' + (0, _pad.padU32)(1) + (0, _pad.padU32)(0xc0) + (0, _pad.padU32)(2) + (0, _pad.padU32)(3) + (0, _pad.padU32)(4) + (0, _pad.padU32)(0x100) + (0, _pad.padU32)(9) + stringEnc + (0, _pad.padU32)(3) + (0, _pad.padU32)(5) + (0, _pad.padU32)(6) + (0, _pad.padU32)(7));
      });
    });
  });
});