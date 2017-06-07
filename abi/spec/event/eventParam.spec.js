'use strict';var _eventParam = require('./eventParam');var _eventParam2 = _interopRequireDefault(_eventParam);
var _chai = require('chai');function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

describe('abi/spec/event/EventParam', function () {
  describe('constructor', function () {
    it('sets the properties', function () {
      var param = new _eventParam2.default('foo', 'uint', true);

      (0, _chai.expect)(param.name).to.equal('foo');
      (0, _chai.expect)(param.kind.type).to.equal('uint');
      (0, _chai.expect)(param.indexed).to.be.true;
    });

    it('uses defaults for indexed', function () {
      (0, _chai.expect)(new _eventParam2.default('foo', 'uint').indexed).to.be.false;
    });
  });

  describe('toEventParams', function () {
    it('maps an array of params', function () {
      var params = _eventParam2.default.toEventParams([{ name: 'foo', type: 'uint' }]);

      (0, _chai.expect)(params.length).to.equal(1);
      (0, _chai.expect)(params[0].indexed).to.be.false;
      (0, _chai.expect)(params[0].name).to.equal('foo');
      (0, _chai.expect)(params[0].kind.type).to.equal('uint');
    });
  });
});