"use strict";Object.defineProperty(exports, "__esModule", { value: true });var _createClass = function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};}();function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}var DecodedLog = function () {
  function DecodedLog(params, address) {_classCallCheck(this, DecodedLog);
    this._params = params;
    this._address = address;
  }_createClass(DecodedLog, [{ key: "address", get: function get()

    {
      return this._address;
    } }, { key: "params", get: function get()

    {
      return this._params;
    } }]);return DecodedLog;}();exports.default = DecodedLog;module.exports = exports["default"];