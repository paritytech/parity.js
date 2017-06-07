'use strict';var _chai = require('chai');
var _types = require('./types');
var _token = require('../token');var _token2 = _interopRequireDefault(_token);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

describe('abi/util/types', function () {
  describe('isArray', function () {
    it('correctly identifies empty arrays as Array', function () {
      (0, _chai.expect)((0, _types.isArray)([])).to.be.true;
    });

    it('correctly identifies non-empty arrays as Array', function () {
      (0, _chai.expect)((0, _types.isArray)([1, 2, 3])).to.be.true;
    });

    it('correctly identifies strings as non-Array', function () {
      (0, _chai.expect)((0, _types.isArray)('not an array')).to.be.false;
    });

    it('correctly identifies objects as non-Array', function () {
      (0, _chai.expect)((0, _types.isArray)({})).to.be.false;
    });
  });

  describe('isString', function () {
    it('correctly identifies empty string as string', function () {
      (0, _chai.expect)((0, _types.isString)('')).to.be.true;
    });

    it('correctly identifies string as string', function () {
      (0, _chai.expect)((0, _types.isString)('123')).to.be.true;
    });
  });

  describe('isInstanceOf', function () {
    it('correctly identifies build-in instanceof', function () {
      (0, _chai.expect)((0, _types.isInstanceOf)(new String('123'), String)).to.be.true; // eslint-disable-line no-new-wrappers
    });

    it('correctly identifies own instanceof', function () {
      (0, _chai.expect)((0, _types.isInstanceOf)(new _token2.default('int', 123), _token2.default)).to.be.true;
    });

    it('correctly reports false for own', function () {
      (0, _chai.expect)((0, _types.isInstanceOf)({ type: 'int' }, _token2.default)).to.be.false;
    });
  });
});