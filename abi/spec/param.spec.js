'use strict';var _chai = require('chai');
var _param = require('./param');var _param2 = _interopRequireDefault(_param);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

describe('abi/spec/Param', function () {
  describe('constructor', function () {
    var param = new _param2.default('foo', 'uint');

    it('sets the properties', function () {
      (0, _chai.expect)(param.name).to.equal('foo');
      (0, _chai.expect)(param.kind.type).to.equal('uint');
    });
  });

  describe('toParams', function () {
    it('maps an array of params', function () {
      var params = _param2.default.toParams([{ name: 'foo', type: 'uint' }]);

      (0, _chai.expect)(params.length).to.equal(1);
      (0, _chai.expect)(params[0].name).to.equal('foo');
      (0, _chai.expect)(params[0].kind.type).to.equal('uint');
    });

    it('converts only if needed', function () {
      var _params = _param2.default.toParams([{ name: 'foo', type: 'uint' }]);
      var params = _param2.default.toParams(_params);

      (0, _chai.expect)(params.length).to.equal(1);
      (0, _chai.expect)(params[0].name).to.equal('foo');
      (0, _chai.expect)(params[0].kind.type).to.equal('uint');
    });
  });
});