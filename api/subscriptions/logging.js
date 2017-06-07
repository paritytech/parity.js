'use strict';Object.defineProperty(exports, "__esModule", { value: true });var _createClass = function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};}();function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}var instance = null;var

Logging = function () {
  function Logging(updateSubscriptions) {_classCallCheck(this, Logging);
    this._updateSubscriptions = updateSubscriptions;

    instance = this;
  }_createClass(Logging, [{ key: 'start', value: function start()





    {
    } }, { key: 'isStarted', get: function get() {return true;} }], [{ key: 'send', value: function send(

    method, params, json) {
      if (!instance) {
        return;
      }

      return instance._updateSubscriptions('logging', null, {
        method: method,
        params: params,
        json: json });

    } }]);return Logging;}();exports.default = Logging;module.exports = exports['default'];