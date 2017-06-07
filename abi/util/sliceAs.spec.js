'use strict';var _chai = require('chai');
var _sliceAs = require('./sliceAs');

describe('abi/util/sliceAs', function () {
  var MAX_INT = 'ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff';

  describe('asAddress', function () {
    it('correctly returns the last 0x40 characters', function () {
      var address = '1111111111222222222233333333334444444444';

      (0, _chai.expect)((0, _sliceAs.asAddress)('000000000000000000000000' + address)).to.equal('0x' + address);
    });
  });

  describe('asBool', function () {
    it('correctly returns true', function () {
      (0, _chai.expect)((0, _sliceAs.asBool)('0000000000000000000000000000000000000000000000000000000000000001')).to.be.true;
    });

    it('correctly returns false', function () {
      (0, _chai.expect)((0, _sliceAs.asBool)('0000000000000000000000000000000000000000000000000000000000000000')).to.be.false;
    });
  });

  describe('asI32', function () {
    it('correctly decodes positive numbers', function () {
      (0, _chai.expect)((0, _sliceAs.asI32)('000000000000000000000000000000000000000000000000000000000000007b').toString()).to.equal('123');
    });

    it('correctly decodes negative numbers', function () {
      (0, _chai.expect)((0, _sliceAs.asI32)('ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff85').toString()).to.equal('-123');
    });
  });

  describe('asU32', function () {
    it('returns a maxium U32', function () {
      (0, _chai.expect)((0, _sliceAs.asU32)(MAX_INT).toString(16)).to.equal(MAX_INT);
    });
  });
});