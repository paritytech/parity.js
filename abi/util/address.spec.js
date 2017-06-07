'use strict';var _chai = require('chai');

var _address = require('./address');

describe('abi/util/address', function () {
  var value = '63Cf90D3f0410092FC0fca41846f596223979195';
  var address = '0x' + value;
  var lowercase = '0x' + value.toLowerCase();
  var uppercase = '0x' + value.toUpperCase();
  var invalid = '0x' + value.split('').map(function (char) {
    if (char >= 'a' && char <= 'f') {
      return char.toUpperCase();
    } else if (char >= 'A' && char <= 'F') {
      return char.toLowerCase();
    }

    return char;
  }).join('');
  var invalidhex = '0x01234567890123456789012345678901234567gh';

  describe('isChecksumValid', function () {
    it('returns false when fully lowercase', function () {
      (0, _chai.expect)((0, _address.isChecksumValid)(lowercase)).to.be.false;
    });

    it('returns false when fully uppercase', function () {
      (0, _chai.expect)((0, _address.isChecksumValid)(uppercase)).to.be.false;
    });

    it('returns false on a mixed-case address', function () {
      (0, _chai.expect)((0, _address.isChecksumValid)(invalid)).to.be.false;
    });

    it('returns true on a checksummed address', function () {
      (0, _chai.expect)((0, _address.isChecksumValid)(address)).to.be.true;
    });
  });

  describe('isAddress', function () {
    it('returns true when fully lowercase', function () {
      (0, _chai.expect)((0, _address.isAddress)(lowercase)).to.be.true;
    });

    it('returns true when fully uppercase', function () {
      (0, _chai.expect)((0, _address.isAddress)(uppercase)).to.be.true;
    });

    it('returns true when checksummed', function () {
      (0, _chai.expect)((0, _address.isAddress)(address)).to.be.true;
    });

    it('returns false when invalid checksum', function () {
      (0, _chai.expect)((0, _address.isAddress)(invalid)).to.be.false;
    });

    it('returns false on valid length, non-hex', function () {
      (0, _chai.expect)((0, _address.isAddress)(invalidhex)).to.be.false;
    });
  });

  describe('toChecksumAddress', function () {
    it('returns empty when no address specified', function () {
      (0, _chai.expect)((0, _address.toChecksumAddress)()).to.equal('');
    });

    it('returns empty on invalid address structure', function () {
      (0, _chai.expect)((0, _address.toChecksumAddress)('0xnotaddress')).to.equal('');
    });

    it('returns formatted address on checksum input', function () {
      (0, _chai.expect)((0, _address.toChecksumAddress)(address)).to.equal(address);
    });

    it('returns formatted address on lowercase input', function () {
      (0, _chai.expect)((0, _address.toChecksumAddress)(lowercase)).to.equal(address);
    });

    it('returns formatted address on uppercase input', function () {
      (0, _chai.expect)((0, _address.toChecksumAddress)(uppercase)).to.equal(address);
    });

    it('returns formatted address on mixed input', function () {
      (0, _chai.expect)((0, _address.toChecksumAddress)(invalid)).to.equal(address);
    });
  });
});