'use strict';var _chai = require('chai');
var _mediate = require('./mediate');var _mediate2 = _interopRequireDefault(_mediate);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

describe('abi/encoder/Mediate', function () {
  var LONG15 = '1234567890abcdef000000000000000000000000000000000000000000000000';
  var DOUBLE15 = '' + LONG15 + LONG15;
  var ARRAY = [new _mediate2.default('raw', DOUBLE15), new _mediate2.default('raw', LONG15)];

  describe('validateType', function () {
    it('validates raw', function () {
      (0, _chai.expect)(_mediate2.default.validateType('raw')).to.be.true;
    });

    it('validates prefixed', function () {
      (0, _chai.expect)(_mediate2.default.validateType('prefixed')).to.be.true;
    });

    it('validates fixedArray', function () {
      (0, _chai.expect)(_mediate2.default.validateType('fixedArray')).to.be.true;
    });

    it('validates array', function () {
      (0, _chai.expect)(_mediate2.default.validateType('array')).to.be.true;
    });

    it('throws an error on invalid types', function () {
      (0, _chai.expect)(function () {return _mediate2.default.validateType('noMatch');}).to.throw(/noMatch/);
    });
  });

  describe('offsetFor', function () {
    it('thows an error when offset < 0', function () {
      (0, _chai.expect)(function () {return _mediate2.default.offsetFor([1], -1);}).to.throw(/Invalid position/);
    });

    it('throws an error when offset >= length', function () {
      (0, _chai.expect)(function () {return _mediate2.default.offsetFor([1], 1);}).to.throw(/Invalid position/);
    });
  });

  describe('constructor', function () {
    it('throws an error on invalid types', function () {
      (0, _chai.expect)(function () {return new _mediate2.default('noMatch', '1');}).to.throw(/noMatch/);
    });

    it('sets the type of the object', function () {
      (0, _chai.expect)(new _mediate2.default('raw', '1').type).to.equal('raw');
    });

    it('sets the value of the object', function () {
      (0, _chai.expect)(new _mediate2.default('raw', '1').value).to.equal('1');
    });
  });

  describe('initLength', function () {
    it('returns correct variable byte length for raw', function () {
      (0, _chai.expect)(new _mediate2.default('raw', DOUBLE15).initLength()).to.equal(64);
    });

    it('returns correct fixed byte length for array', function () {
      (0, _chai.expect)(new _mediate2.default('array', [1, 2, 3, 4]).initLength()).to.equal(32);
    });

    it('returns correct fixed byte length for prefixed', function () {
      (0, _chai.expect)(new _mediate2.default('prefixed', 0).initLength()).to.equal(32);
    });

    it('returns correct variable byte length for fixedArray', function () {
      (0, _chai.expect)(new _mediate2.default('fixedArray', ARRAY).initLength()).to.equal(96);
    });
  });

  describe('closingLength', function () {
    it('returns 0 byte length for raw', function () {
      (0, _chai.expect)(new _mediate2.default('raw', DOUBLE15).closingLength()).to.equal(0);
    });

    it('returns prefix + size for prefixed', function () {
      (0, _chai.expect)(new _mediate2.default('prefixed', DOUBLE15).closingLength()).to.equal(64);
    });

    it('returns prefix + size for array', function () {
      (0, _chai.expect)(new _mediate2.default('array', ARRAY).closingLength()).to.equal(128);
    });

    it('returns total length for fixedArray', function () {
      (0, _chai.expect)(new _mediate2.default('fixedArray', ARRAY).closingLength()).to.equal(96);
    });
  });
});