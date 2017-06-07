'use strict';Object.defineProperty(exports, "__esModule", { value: true });var _createClass = function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};}();function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}var Personal = function () {
  function Personal(provider) {_classCallCheck(this, Personal);
    this._provider = provider;
  }_createClass(Personal, [{ key: 'addToGroup', value: function addToGroup(

    identity) {
      return this._provider.
      send('shh_addToGroup', identity);
    } }, { key: 'getFilterChanges', value: function getFilterChanges(

    filterId) {
      return this._provider.
      send('shh_getFilterChanges', filterId);
    } }, { key: 'getMessages', value: function getMessages(

    filterId) {
      return this._provider.
      send('shh_getMessages', filterId);
    } }, { key: 'hasIdentity', value: function hasIdentity(

    identity) {
      return this._provider.
      send('shh_hasIdentity', identity);
    } }, { key: 'newFilter', value: function newFilter(

    options) {
      return this._provider.
      send('shh_newFilter', options);
    } }, { key: 'newGroup', value: function newGroup()

    {
      return this._provider.
      send('shh_newGroup');
    } }, { key: 'newIdentity', value: function newIdentity()

    {
      return this._provider.
      send('shh_newIdentity');
    } }, { key: 'post', value: function post(

    options) {
      return this._provider.
      send('shh_post', options);
    } }, { key: 'uninstallFilter', value: function uninstallFilter(

    filterId) {
      return this._provider.
      send('shh_uninstallFilter', filterId);
    } }, { key: 'version', value: function version()

    {
      return this._provider.
      send('shh_version');
    } }]);return Personal;}();exports.default = Personal;module.exports = exports['default'];