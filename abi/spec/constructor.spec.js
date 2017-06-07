'use strict';var _chai = require('chai');
var _constructor = require('./constructor');var _constructor2 = _interopRequireDefault(_constructor);
var _param = require('./param');var _param2 = _interopRequireDefault(_param);
var _token = require('../token');var _token2 = _interopRequireDefault(_token);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

describe('abi/spec/Constructor', function () {
  var inputsArr = [{ name: 'boolin', type: 'bool' }, { name: 'stringin', type: 'string' }];
  var bool = new _param2.default('boolin', 'bool');
  var string = new _param2.default('stringin', 'string');

  var inputs = [bool, string];
  var cr = new _constructor2.default({ inputs: inputsArr });

  describe('constructor', function () {
    it('stores the inputs as received', function () {
      (0, _chai.expect)(cr.inputs).to.deep.equal(inputs);
    });

    it('matches empty inputs with []', function () {
      (0, _chai.expect)(new _constructor2.default({}).inputs).to.deep.equal([]);
    });
  });

  describe('inputParamTypes', function () {
    it('retrieves the input types as received', function () {
      (0, _chai.expect)(cr.inputParamTypes()).to.deep.equal([bool.kind, string.kind]);
    });
  });

  describe('encodeCall', function () {
    it('encodes correctly', function () {
      var result = cr.encodeCall([new _token2.default('bool', true), new _token2.default('string', 'jacogr')]);

      (0, _chai.expect)(result).to.equal('0000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000000000000066a61636f67720000000000000000000000000000000000000000000000000000');
    });
  });
});