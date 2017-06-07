'use strict';var _decodeResult = require('./decodeResult');var _decodeResult2 = _interopRequireDefault(_decodeResult);
var _chai = require('chai');function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

describe('abi/decoder/DecodeResult', function () {
  describe('constructor', function () {
    it('sets the token of the object', function () {
      (0, _chai.expect)(new _decodeResult2.default('token', 2).token).to.equal('token');
    });

    it('sets the newOffset of the object', function () {
      (0, _chai.expect)(new _decodeResult2.default('baz', 4).newOffset).to.equal(4);
    });
  });
});