'use strict';Object.defineProperty(exports, "__esModule", { value: true });var _createClass = function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};}();var _encoder = require('../encoder/encoder');var _encoder2 = _interopRequireDefault(_encoder);
var _param = require('./param');var _param2 = _interopRequireDefault(_param);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}var

Constructor = function () {
  function Constructor(abi) {_classCallCheck(this, Constructor);
    this._inputs = _param2.default.toParams(abi.inputs || []);
  }_createClass(Constructor, [{ key: 'inputParamTypes', value: function inputParamTypes()





    {
      return this._inputs.map(function (input) {return input.kind;});
    } }, { key: 'encodeCall', value: function encodeCall(

    tokens) {
      return _encoder2.default.encode(tokens);
    } }, { key: 'inputs', get: function get() {return this._inputs;} }]);return Constructor;}();exports.default = Constructor;module.exports = exports['default'];