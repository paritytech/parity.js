'use strict';Object.defineProperty(exports, "__esModule", { value: true });var _createClass = function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};}();var _decoder = require('../decoder/decoder');var _decoder2 = _interopRequireDefault(_decoder);
var _encoder = require('../encoder/encoder');var _encoder2 = _interopRequireDefault(_encoder);
var _param = require('./param');var _param2 = _interopRequireDefault(_param);
var _signature = require('../util/signature');function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}var

Func = function () {
  function Func(abi) {_classCallCheck(this, Func);
    this._abi = abi;
    this._constant = !!abi.constant;
    this._payable = abi.payable;
    this._inputs = _param2.default.toParams(abi.inputs || []);
    this._outputs = _param2.default.toParams(abi.outputs || []);var _methodSignature =

    (0, _signature.methodSignature)(abi.name, this.inputParamTypes()),id = _methodSignature.id,name = _methodSignature.name,signature = _methodSignature.signature;

    this._id = id;
    this._name = name;
    this._signature = signature;
  }_createClass(Func, [{ key: 'inputParamTypes', value: function inputParamTypes()

































    {
      return this._inputs.map(function (input) {return input.kind;});
    } }, { key: 'outputParamTypes', value: function outputParamTypes()

    {
      return this._outputs.map(function (output) {return output.kind;});
    } }, { key: 'encodeCall', value: function encodeCall(

    tokens) {
      return '' + this._signature + _encoder2.default.encode(tokens);
    } }, { key: 'decodeInput', value: function decodeInput(

    data) {
      return _decoder2.default.decode(this.inputParamTypes(), data);
    } }, { key: 'decodeOutput', value: function decodeOutput(

    data) {
      return _decoder2.default.decode(this.outputParamTypes(), data);
    } }, { key: 'abi', get: function get() {return this._abi;} }, { key: 'constant', get: function get() {return this._constant;} }, { key: 'name', get: function get() {return this._name;} }, { key: 'id', get: function get() {return this._id;} }, { key: 'payable', get: function get() {return this._payable;} }, { key: 'inputs', get: function get() {return this._inputs;} }, { key: 'outputs', get: function get() {return this._outputs;} }, { key: 'signature', get: function get() {return this._signature;} }]);return Func;}();exports.default = Func;module.exports = exports['default'];