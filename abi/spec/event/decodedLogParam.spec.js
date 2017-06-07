'use strict';var _chai = require('chai');
var _decodedLogParam = require('./decodedLogParam');var _decodedLogParam2 = _interopRequireDefault(_decodedLogParam);
var _paramType = require('../paramType');var _paramType2 = _interopRequireDefault(_paramType);
var _token = require('../../token');var _token2 = _interopRequireDefault(_token);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

describe('abi/spec/event/DecodedLogParam', function () {
  describe('constructor', function () {
    var pt = new _paramType2.default('bool');
    var tk = new _token2.default('bool');

    it('disallows kind not instanceof ParamType', function () {
      (0, _chai.expect)(function () {return new _decodedLogParam2.default('test', 'param');}).to.throw(/ParamType/);
    });

    it('disallows token not instanceof Token', function () {
      (0, _chai.expect)(function () {return new _decodedLogParam2.default('test', pt, 'token');}).to.throw(/Token/);
    });

    it('stores all parameters received', function () {
      var log = new _decodedLogParam2.default('test', pt, tk);

      (0, _chai.expect)(log.name).to.equal('test');
      (0, _chai.expect)(log.kind).to.equal(pt);
      (0, _chai.expect)(log.token).to.equal(tk);
    });
  });
});