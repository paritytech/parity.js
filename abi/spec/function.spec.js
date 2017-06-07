'use strict';var _chai = require('chai');
var _function = require('./function');var _function2 = _interopRequireDefault(_function);
var _param = require('./param');var _param2 = _interopRequireDefault(_param);
var _token = require('../token');var _token2 = _interopRequireDefault(_token);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

describe('abi/spec/Function', function () {
  var inputsArr = [{ name: 'boolin', type: 'bool' }, { name: 'stringin', type: 'string' }];
  var outputsArr = [{ name: 'output', type: 'uint' }];

  var uint = new _param2.default('output', 'uint');
  var bool = new _param2.default('boolin', 'bool');
  var string = new _param2.default('stringin', 'string');
  var inputs = [bool, string];
  var outputs = [uint];

  var func = new _function2.default({
    name: 'test',
    inputs: inputsArr,
    outputs: outputsArr });


  describe('constructor', function () {
    it('returns signature correctly if name already contains it', function () {
      var func = new _function2.default({
        name: 'test(bool,string)',
        inputs: inputsArr,
        outputs: outputsArr });


      (0, _chai.expect)(func.name).to.equal('test');
      (0, _chai.expect)(func.id).to.equal('test(bool,string)');
      (0, _chai.expect)(func.signature).to.equal('02356205');
    });

    it('stores the parameters as received', function () {
      (0, _chai.expect)(func.name).to.equal('test');
      (0, _chai.expect)(func.constant).to.be.false;
      (0, _chai.expect)(func.inputs).to.deep.equal(inputs);
      (0, _chai.expect)(func.outputs).to.deep.equal(outputs);
    });

    it('matches empty inputs with []', function () {
      (0, _chai.expect)(new _function2.default({ name: 'test', outputs: outputsArr }).inputs).to.deep.equal([]);
    });

    it('matches empty outputs with []', function () {
      (0, _chai.expect)(new _function2.default({ name: 'test', inputs: inputsArr }).outputs).to.deep.equal([]);
    });

    it('sets the method signature', function () {
      (0, _chai.expect)(new _function2.default({ name: 'baz' }).signature).to.equal('a7916fac');
    });

    it('allows constant functions', function () {
      (0, _chai.expect)(new _function2.default({ name: 'baz', constant: true }).constant).to.be.true;
    });
  });

  describe('inputParamTypes', function () {
    it('retrieves the input types as received', function () {
      (0, _chai.expect)(func.inputParamTypes()).to.deep.equal([bool.kind, string.kind]);
    });
  });

  describe('outputParamTypes', function () {
    it('retrieves the output types as received', function () {
      (0, _chai.expect)(func.outputParamTypes()).to.deep.equal([uint.kind]);
    });
  });

  describe('encodeCall', function () {
    it('encodes the call correctly', function () {
      var result = func.encodeCall([new _token2.default('bool', true), new _token2.default('string', 'jacogr')]);

      (0, _chai.expect)(result).to.equal('023562050000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000000000000066a61636f67720000000000000000000000000000000000000000000000000000');
    });
  });

  describe('decodeOutput', function () {
    it('decodes the result correctly', function () {
      var result = func.decodeOutput('1111111111111111111111111111111111111111111111111111111111111111');

      (0, _chai.expect)(result[0].value.toString(16)).to.equal('1111111111111111111111111111111111111111111111111111111111111111');
    });
  });
});