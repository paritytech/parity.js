'use strict';Object.defineProperty(exports, "__esModule", { value: true });var _createClass = function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};}();var _output = require('../../format/output');function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}var

Net = function () {
  function Net(provider) {_classCallCheck(this, Net);
    this._provider = provider;
  }_createClass(Net, [{ key: 'listening', value: function listening()

    {
      return this._provider.
      send('net_listening');
    } }, { key: 'peerCount', value: function peerCount()

    {
      return this._provider.
      send('net_peerCount').
      then(_output.outNumber);
    } }, { key: 'version', value: function version()

    {
      return this._provider.
      send('net_version');
    } }]);return Net;}();exports.default = Net;module.exports = exports['default'];