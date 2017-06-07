'use strict';Object.defineProperty(exports, "__esModule", { value: true });var _createClass = function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};}();var _types = require('../spec/paramType/types');var _types2 = _interopRequireDefault(_types);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}var

Token = function () {
  function Token(type, value) {_classCallCheck(this, Token);
    Token.validateType(type);

    this._type = type;
    this._value = value;
  }_createClass(Token, [{ key: 'type', get: function get()

    {
      return this._type;
    } }, { key: 'value', get: function get()

    {
      return this._value;
    } }], [{ key: 'validateType', value: function validateType(

    type) {
      if (_types2.default.filter(function (_type) {return type === _type;}).length) {
        return true;
      }

      throw new Error('Invalid type ' + type + ' received for Token');
    } }]);return Token;}();exports.default = Token;module.exports = exports['default'];