'use strict';Object.defineProperty(exports, "__esModule", { value: true });var _createClass = function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};}();var _input = require('../../format/input');
var _output = require('../../format/output');function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}var

Personal = function () {
  function Personal(provider) {_classCallCheck(this, Personal);
    this._provider = provider;
  }_createClass(Personal, [{ key: 'listAccounts', value: function listAccounts()

    {
      return this._provider.
      send('personal_listAccounts').
      then(function (accounts) {return (accounts || []).map(_output.outAddress);});
    } }, { key: 'newAccount', value: function newAccount(

    password) {
      return this._provider.
      send('personal_newAccount', password).
      then(_output.outAddress);
    } }, { key: 'sendTransaction', value: function sendTransaction(

    options, password) {
      return this._provider.
      send('personal_sendTransaction', (0, _input.inOptions)(options), password);
    } }, { key: 'unlockAccount', value: function unlockAccount(

    account, password) {var duration = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
      return this._provider.
      send('personal_unlockAccount', (0, _input.inAddress)(account), password, (0, _input.inNumber10)(duration));
    } }]);return Personal;}();exports.default = Personal;module.exports = exports['default'];