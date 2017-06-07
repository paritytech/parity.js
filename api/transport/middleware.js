"use strict";Object.defineProperty(exports, "__esModule", { value: true });var _createClass = function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};}();function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}var Middleware = function () {
  function Middleware(transport) {_classCallCheck(this, Middleware);
    this._transport = transport;
    this._handlers = {};
  }_createClass(Middleware, [{ key: "register", value: function register(

    method, handler) {
      this._handlers[method] = handler;
    } }, { key: "handle", value: function handle(

    method, params) {
      var handler = this._handlers[method];

      if (handler != null) {
        return handler(params);
      }

      return null;
    } }, { key: "rpcRequest", value: function rpcRequest(

    method, params) {
      return this._transport._execute(method, params);
    } }]);return Middleware;}();exports.default = Middleware;module.exports = exports["default"];