'use strict';Object.defineProperty(exports, "__esModule", { value: true });var _createClass = function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};}();var _format = require('../paramType/format');function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}var

EventParam = function () {
  function EventParam(name, type) {var indexed = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;_classCallCheck(this, EventParam);
    this._name = name;
    this._indexed = indexed;
    this._kind = (0, _format.toParamType)(type, indexed);
  }_createClass(EventParam, [{ key: 'name', get: function get()

    {
      return this._name;
    } }, { key: 'kind', get: function get()

    {
      return this._kind;
    } }, { key: 'indexed', get: function get()

    {
      return this._indexed;
    } }], [{ key: 'toEventParams', value: function toEventParams(

    params) {
      return params.map(function (param) {return new EventParam(param.name, param.type, param.indexed);});
    } }]);return EventParam;}();exports.default = EventParam;module.exports = exports['default'];