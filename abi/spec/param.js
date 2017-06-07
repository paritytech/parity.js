'use strict';Object.defineProperty(exports, "__esModule", { value: true });var _createClass = function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};}();var _format = require('./paramType/format');function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}var

Param = function () {
  function Param(name, type) {_classCallCheck(this, Param);
    this._name = name;
    this._kind = (0, _format.toParamType)(type);
  }_createClass(Param, [{ key: 'name', get: function get()

    {
      return this._name;
    } }, { key: 'kind', get: function get()

    {
      return this._kind;
    } }], [{ key: 'toParams', value: function toParams(

    params) {
      return params.map(function (param) {
        if (param instanceof Param) {
          return param;
        }

        return new Param(param.name, param.type);
      });
    } }]);return Param;}();exports.default = Param;module.exports = exports['default'];