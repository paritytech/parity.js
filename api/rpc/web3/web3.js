'use strict';Object.defineProperty(exports, "__esModule", { value: true });var _createClass = function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};}();var _input = require('../../format/input');function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}var

Web3 = function () {
  function Web3(provider) {_classCallCheck(this, Web3);
    this._provider = provider;
  }_createClass(Web3, [{ key: 'clientVersion', value: function clientVersion()

    {
      return this._provider.
      send('web3_clientVersion');
    } }, { key: 'sha3', value: function sha3(

    hexStr) {
      return this._provider.
      send('web3_sha3', (0, _input.inHex)(hexStr));
    } }]);return Web3;}();exports.default = Web3;module.exports = exports['default'];