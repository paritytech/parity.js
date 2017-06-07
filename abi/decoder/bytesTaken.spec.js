'use strict';var _bytesTaken = require('./bytesTaken');var _bytesTaken2 = _interopRequireDefault(_bytesTaken);
var _chai = require('chai');function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

describe('abi/decoder/BytesTaken', function () {
  describe('constructor', function () {
    it('sets the bytes of the object', function () {
      (0, _chai.expect)(new _bytesTaken2.default(1, 2).bytes).to.equal(1);
    });

    it('sets the newOffset of the object', function () {
      (0, _chai.expect)(new _bytesTaken2.default(3, 4).newOffset).to.equal(4);
    });
  });
});