'use strict';Object.defineProperty(exports, "__esModule", { value: true });var _createClass = function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};}();var _input = require('../../format/input');function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}var

Db = function () {
  function Db(transport) {_classCallCheck(this, Db);
    this._transport = transport;
  }_createClass(Db, [{ key: 'getHex', value: function getHex(

    dbName, keyName) {
      return this._transport.
      send('db_getHex', dbName, keyName);
    } }, { key: 'getString', value: function getString(

    dbName, keyName) {
      return this._transport.
      send('db_getString', dbName, keyName);
    } }, { key: 'putHex', value: function putHex(

    dbName, keyName, hexData) {
      return this._transport.
      send('db_putHex', dbName, keyName, (0, _input.inHex)(hexData));
    } }, { key: 'putString', value: function putString(

    dbName, keyName, stringData) {
      return this._transport.
      send('db_putString', dbName, keyName, stringData);
    } }]);return Db;}();exports.default = Db;module.exports = exports['default'];