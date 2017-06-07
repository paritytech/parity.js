'use strict';var _chai = require('chai');
var _wei = require('./wei');

describe('api/util/wei', function () {
  describe('_getUnitMultiplier', function () {
    it('returns 10^0 for wei', function () {
      (0, _chai.expect)((0, _wei._getUnitMultiplier)('wei')).to.equal(Math.pow(10, 0));
    });

    it('returns 10^15 for finney', function () {
      (0, _chai.expect)((0, _wei._getUnitMultiplier)('finney')).to.equal(Math.pow(10, 15));
    });

    it('returns 10^18 for ether', function () {
      (0, _chai.expect)((0, _wei._getUnitMultiplier)('ether')).to.equal(Math.pow(10, 18));
    });

    it('throws an error on invalid units', function () {
      (0, _chai.expect)(function () {return (0, _wei._getUnitMultiplier)('invalid');}).to.throw(/passed to wei formatter/);
    });
  });

  describe('fromWei', function () {
    it('formats into ether when nothing specified', function () {
      (0, _chai.expect)((0, _wei.fromWei)('1230000000000000000').toString()).to.equal('1.23');
    });

    it('formats into finney when specified', function () {
      (0, _chai.expect)((0, _wei.fromWei)('1230000000000000000', 'finney').toString()).to.equal('1230');
    });
  });

  describe('toWei', function () {
    it('formats from ether when nothing specified', function () {
      (0, _chai.expect)((0, _wei.toWei)(1.23).toString()).to.equal('1230000000000000000');
    });

    it('formats from finney when specified', function () {
      (0, _chai.expect)((0, _wei.toWei)(1230, 'finney').toString()).to.equal('1230000000000000000');
    });
  });
});