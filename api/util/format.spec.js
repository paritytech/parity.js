'use strict';var _chai = require('chai');
var _format = require('./format');

describe('api/util/format', function () {
  describe('bytesToHex', function () {
    it('correctly converts an empty array', function () {
      (0, _chai.expect)((0, _format.bytesToHex)([])).to.equal('0x');
    });

    it('correctly converts a non-empty array', function () {
      (0, _chai.expect)((0, _format.bytesToHex)([0, 15, 16])).to.equal('0x000f10');
    });
  });

  describe('cleanupValue', function () {
    it('returns unknown values as the original', function () {
      (0, _chai.expect)((0, _format.cleanupValue)('original', 'unknown')).to.equal('original');
    });

    it('returns ascii arrays as ascii', function () {
      (0, _chai.expect)((0, _format.cleanupValue)([97, 115, 99, 105, 105, 0], 'bytes32')).to.equal('ascii');
    });

    it('returns non-ascii arrays as hex strings', function () {
      (0, _chai.expect)((0, _format.cleanupValue)([97, 200, 0, 0], 'bytes4')).to.equal('0x61c80000');
    });

    it('returns uint (>48) as the original', function () {
      (0, _chai.expect)((0, _format.cleanupValue)('original', 'uint49')).to.equal('original');
    });

    it('returns uint (<=48) as the number value', function () {
      (0, _chai.expect)((0, _format.cleanupValue)('12345', 'uint48')).to.equal(12345);
    });
  });

  describe('hexToBytes', function () {
    it('correctly converts an empty string', function () {
      (0, _chai.expect)((0, _format.hexToBytes)('')).to.deep.equal([]);
      (0, _chai.expect)((0, _format.hexToBytes)('0x')).to.deep.equal([]);
    });

    it('correctly converts a non-empty string', function () {
      (0, _chai.expect)((0, _format.hexToBytes)('0x000f10')).to.deep.equal([0, 15, 16]);
    });
  });

  describe('asciiToHex', function () {
    it('correctly converts an empty string', function () {
      (0, _chai.expect)((0, _format.asciiToHex)('')).to.equal('0x');
    });

    it('correctly converts a non-empty string', function () {
      (0, _chai.expect)((0, _format.asciiToHex)('abc')).to.equal('0x616263');
    });
  });

  describe('hexToAscii', function () {
    it('correctly converts an empty string', function () {
      (0, _chai.expect)((0, _format.hexToAscii)('')).to.equal('');
      (0, _chai.expect)((0, _format.hexToAscii)('0x')).to.equal('');
    });

    it('correctly converts a non-empty string', function () {
      (0, _chai.expect)((0, _format.hexToAscii)('0x616263')).to.equal('abc');
    });
  });

  describe('bytesToAscii', function () {
    it('correctly converts an empty string', function () {
      (0, _chai.expect)((0, _format.bytesToAscii)([])).to.equal('');
    });

    it('correctly converts a non-empty string', function () {
      (0, _chai.expect)((0, _format.bytesToAscii)([97, 98, 99])).to.equal('abc');
    });
  });
});