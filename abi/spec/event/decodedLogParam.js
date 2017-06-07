'use strict';Object.defineProperty(exports, "__esModule", { value: true });var _createClass = function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};}();var _paramType = require('../paramType');var _paramType2 = _interopRequireDefault(_paramType);
var _token = require('../../token');var _token2 = _interopRequireDefault(_token);
var _types = require('../../util/types');function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}var

DecodedLogParam = function () {
  function DecodedLogParam(name, kind, token) {_classCallCheck(this, DecodedLogParam);
    if (!(0, _types.isInstanceOf)(kind, _paramType2.default)) {
      throw new Error('kind not instanceof ParamType');
    } else if (!(0, _types.isInstanceOf)(token, _token2.default)) {
      throw new Error('token not instanceof Token');
    }

    this._name = name;
    this._kind = kind;
    this._token = token;
  }_createClass(DecodedLogParam, [{ key: 'name', get: function get()

    {
      return this._name;
    } }, { key: 'kind', get: function get()

    {
      return this._kind;
    } }, { key: 'token', get: function get()

    {
      return this._token;
    } }]);return DecodedLogParam;}();exports.default = DecodedLogParam;module.exports = exports['default'];