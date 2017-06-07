'use strict';Object.defineProperty(exports, "__esModule", { value: true });var _createClass = function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};}();var _constructor = require('./constructor');var _constructor2 = _interopRequireDefault(_constructor);
var _event = require('./event/event');var _event2 = _interopRequireDefault(_event);
var _function = require('./function');var _function2 = _interopRequireDefault(_function);
var _token = require('../token');var _token2 = _interopRequireDefault(_token);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}var

Interface = function () {
  function Interface(abi) {_classCallCheck(this, Interface);
    this._interface = Interface.parseABI(abi);
  }_createClass(Interface, [{ key: 'encodeTokens', value: function encodeTokens(

















    paramTypes, values) {
      return Interface.encodeTokens(paramTypes, values);
    } }, { key: 'interface', get: function get() {return this._interface;} }, { key: 'constructors', get: function get() {return this._interface.filter(function (item) {return item instanceof _constructor2.default;});} }, { key: 'events', get: function get() {return this._interface.filter(function (item) {return item instanceof _event2.default;});} }, { key: 'functions', get: function get() {return this._interface.filter(function (item) {return item instanceof _function2.default;});} }], [{ key: 'encodeTokens', value: function encodeTokens(

    paramTypes, values) {
      var createToken = function createToken(paramType, value) {
        if (paramType.subtype) {
          return new _token2.default(paramType.type, value.map(function (entry) {return createToken(paramType.subtype, entry);}));
        }

        return new _token2.default(paramType.type, value);
      };

      return paramTypes.map(function (paramType, idx) {return createToken(paramType, values[idx]);});
    } }, { key: 'parseABI', value: function parseABI(

    abi) {
      return abi.map(function (item) {
        switch (item.type) {
          case 'constructor':
            return new _constructor2.default(item);

          case 'event':
            return new _event2.default(item);

          case 'function':
          case 'fallback':
            return new _function2.default(item);

          default:
            throw new Error('Unknown ABI type ' + item.type);}

      });
    } }]);return Interface;}();exports.default = Interface;module.exports = exports['default'];