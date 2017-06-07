'use strict';var _chai = require('chai');
var _slice = require('./slice');

describe('abi/util/slice', function () {
  describe('sliceData', function () {
    var slice1 = '131a3afc00d1b1e3461b955e53fc866dcf303b3eb9f4c16f89e388930f48134b';
    var slice2 = '2124768576358735263578356373526387638357635873563586353756358763';

    it('returns an empty array when length === 0', function () {
      (0, _chai.expect)((0, _slice.sliceData)('')).to.deep.equal([]);
    });

    it('returns an array with the slices otherwise', function () {
      var sliced = (0, _slice.sliceData)('' + slice1 + slice2);

      (0, _chai.expect)(sliced.length).to.equal(2);
      (0, _chai.expect)(sliced[0]).to.equal(slice1);
      (0, _chai.expect)(sliced[1]).to.equal(slice2);
    });

    it('removes leading 0x when passed in', function () {
      var sliced = (0, _slice.sliceData)('0x' + slice1 + slice2);

      (0, _chai.expect)(sliced.length).to.equal(2);
      (0, _chai.expect)(sliced[0]).to.equal(slice1);
      (0, _chai.expect)(sliced[1]).to.equal(slice2);
    });
  });
});