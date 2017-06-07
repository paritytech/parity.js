'use strict';Object.defineProperty(exports, "__esModule", { value: true });var _createClass = function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};}();var _ethkey = require('../ethkey');function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}var

Account = function () {
  function Account(persist, data) {_classCallCheck(this, Account);var

    keyObject =


    data.keyObject,_data$meta = data.meta,meta = _data$meta === undefined ? {} : _data$meta,_data$name = data.name,name = _data$name === undefined ? '' : _data$name;

    this._persist = persist;
    this._keyObject = keyObject;
    this._name = name;
    this._meta = meta;
  }_createClass(Account, [{ key: 'isValidPassword', value: function isValidPassword(

    password) {
      return (0, _ethkey.decryptPrivateKey)(this._keyObject, password).
      then(function (privateKey) {
        if (!privateKey) {
          return false;
        }

        return true;
      });
    } }, { key: 'decryptPrivateKey', value: function decryptPrivateKey(





























    password) {
      return (0, _ethkey.decryptPrivateKey)(this._keyObject, password);
    } }, { key: 'changePassword', value: function changePassword(

    key, password) {var _this = this;
      return (0, _ethkey.createKeyObject)(key, password).then(function (keyObject) {
        _this._keyObject = keyObject;

        _this._persist();
      });
    } }, { key: 'toJSON', value: function toJSON()









    {
      return {
        keyObject: this._keyObject,
        name: this._name,
        meta: this._meta };

    } }, { key: 'address', get: function get() {return '0x' + this._keyObject.address.toLowerCase();} }, { key: 'name', get: function get() {return this._name;}, set: function set(name) {this._name = name;this._persist();} }, { key: 'meta', get: function get() {return JSON.stringify(this._meta);}, set: function set(meta) {this._meta = JSON.parse(meta);this._persist();} }, { key: 'uuid', get: function get() {return this._keyObject.id;} }], [{ key: 'fromPrivateKey', value: function fromPrivateKey(persist, key, password) {return (0, _ethkey.createKeyObject)(key, password).then(function (keyObject) {var account = new Account(persist, { keyObject: keyObject });return account;});} }]);return Account;}();exports.default = Account;module.exports = exports['default'];