'use strict';var _chai = require('chai');
var _sinon = require('sinon');var _sinon2 = _interopRequireDefault(_sinon);

var _types = require('./types');
var _eth = require('../rpc/eth');var _eth2 = _interopRequireDefault(_eth);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

describe('api/util/types', function () {
  describe('isArray', function () {
    it('correctly identifies null as false', function () {
      (0, _chai.expect)((0, _types.isArray)(null)).to.be.false;
    });

    it('correctly identifies empty array as true', function () {
      (0, _chai.expect)((0, _types.isArray)([])).to.be.true;
    });

    it('correctly identifies array as true', function () {
      (0, _chai.expect)((0, _types.isArray)([1, 2, 3])).to.be.true;
    });
  });

  describe('isError', function () {
    it('correctly identifies null as false', function () {
      (0, _chai.expect)((0, _types.isError)(null)).to.be.false;
    });

    it('correctly identifies Error as true', function () {
      (0, _chai.expect)((0, _types.isError)(new Error('an error'))).to.be.true;
    });
  });

  describe('isFunction', function () {
    it('correctly identifies null as false', function () {
      (0, _chai.expect)((0, _types.isFunction)(null)).to.be.false;
    });

    it('correctly identifies function as true', function () {
      (0, _chai.expect)((0, _types.isFunction)(_sinon2.default.stub())).to.be.true;
    });
  });

  describe('isHex', function () {
    it('correctly identifies hex by leading 0x', function () {
      (0, _chai.expect)((0, _types.isHex)('0x123')).to.be.true;
    });

    it('correctly identifies hex without leading 0x', function () {
      (0, _chai.expect)((0, _types.isHex)('123')).to.be.true;
    });

    it('correctly identifies non-hex values', function () {
      (0, _chai.expect)((0, _types.isHex)('123j')).to.be.false;
    });

    it('correctly indentifies non-string values', function () {
      (0, _chai.expect)((0, _types.isHex)(false)).to.be.false;
      (0, _chai.expect)((0, _types.isHex)()).to.be.false;
      (0, _chai.expect)((0, _types.isHex)([1, 2, 3])).to.be.false;
    });
  });

  describe('isInstanceOf', function () {
    it('correctly identifies build-in instanceof', function () {
      (0, _chai.expect)((0, _types.isInstanceOf)(new String('123'), String)).to.be.true; // eslint-disable-line no-new-wrappers
    });

    it('correctly identifies own instanceof', function () {
      (0, _chai.expect)((0, _types.isInstanceOf)(new _eth2.default({}), _eth2.default)).to.be.true;
    });

    it('correctly reports false for own', function () {
      (0, _chai.expect)((0, _types.isInstanceOf)({}, _eth2.default)).to.be.false;
    });
  });

  describe('isObject', function () {
    it('correctly identifies empty object as object', function () {
      (0, _chai.expect)((0, _types.isObject)({})).to.be.true;
    });

    it('correctly identifies non-empty object as object', function () {
      (0, _chai.expect)((0, _types.isObject)({ data: '123' })).to.be.true;
    });

    it('correctly identifies Arrays as non-objects', function () {
      (0, _chai.expect)((0, _types.isObject)([1, 2, 3])).to.be.false;
    });

    it('correctly identifies Strings as non-objects', function () {
      (0, _chai.expect)((0, _types.isObject)('123')).to.be.false;
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
});