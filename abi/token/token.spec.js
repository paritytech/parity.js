'use strict';var _chai = require('chai');
var _ = require('./');var _2 = _interopRequireDefault(_);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

describe('abi/token/token', function () {
  describe('validateType', function () {
    it('validates address', function () {
      (0, _chai.expect)(_2.default.validateType('address')).to.be.true;
    });

    it('validates fixedArray', function () {
      (0, _chai.expect)(_2.default.validateType('fixedArray')).to.be.true;
    });

    it('validates array', function () {
      (0, _chai.expect)(_2.default.validateType('array')).to.be.true;
    });

    it('validates fixedBytes', function () {
      (0, _chai.expect)(_2.default.validateType('fixedBytes')).to.be.true;
    });

    it('validates bytes', function () {
      (0, _chai.expect)(_2.default.validateType('bytes')).to.be.true;
    });

    it('validates bool', function () {
      (0, _chai.expect)(_2.default.validateType('bool')).to.be.true;
    });

    it('validates int', function () {
      (0, _chai.expect)(_2.default.validateType('int')).to.be.true;
    });

    it('validates uint', function () {
      (0, _chai.expect)(_2.default.validateType('uint')).to.be.true;
    });

    it('validates string', function () {
      (0, _chai.expect)(_2.default.validateType('string')).to.be.true;
    });

    it('throws an error on invalid types', function () {
      (0, _chai.expect)(function () {return _2.default.validateType('noMatch');}).to.throw(/noMatch/);
    });
  });

  describe('constructor', function () {
    it('throws an error on invalid types', function () {
      (0, _chai.expect)(function () {return new _2.default('noMatch', '1');}).to.throw(/noMatch/);
    });

    it('sets the type of the object', function () {
      (0, _chai.expect)(new _2.default('bool', '1').type).to.equal('bool');
    });

    it('sets the value of the object', function () {
      (0, _chai.expect)(new _2.default('bool', '1').value).to.equal('1');
    });
  });
});