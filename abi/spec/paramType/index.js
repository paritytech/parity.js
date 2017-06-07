'use strict';Object.defineProperty(exports, "__esModule", { value: true });var _createClass = function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};}();var _types = require('./types');var _types2 = _interopRequireDefault(_types);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}var

ParamType = function () {
  function ParamType(type) {var subtype = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;var length = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;var indexed = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;_classCallCheck(this, ParamType);
    ParamType.validateType(type);

    this._type = type;
    this._subtype = subtype;
    this._length = length;
    this._indexed = indexed;
  }_createClass(ParamType, [{ key: 'type', get: function get()

    {
      return this._type;
    } }, { key: 'subtype', get: function get()

    {
      return this._subtype;
    } }, { key: 'length', get: function get()

    {
      return this._length;
    } }, { key: 'indexed', get: function get()

    {
      return this._indexed;
    } }], [{ key: 'validateType', value: function validateType(

    type) {
      if (_types2.default.filter(function (_type) {return type === _type;}).length) {
        return true;
      }

      throw new Error('Invalid type ' + type + ' received for ParamType');
    } }]);return ParamType;}();exports.default = ParamType;module.exports = exports['default'];