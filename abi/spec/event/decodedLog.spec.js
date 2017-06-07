'use strict';var _chai = require('chai');
var _decodedLog = require('./decodedLog');var _decodedLog2 = _interopRequireDefault(_decodedLog);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

var log = new _decodedLog2.default('someParams', 'someAddress');

describe('abi/spec/event/DecodedLog', function () {
  describe('constructor', function () {
    it('sets internal state', function () {
      (0, _chai.expect)(log.params).to.equal('someParams');
      (0, _chai.expect)(log.address).to.equal('someAddress');
    });
  });
});