'use strict';Object.defineProperty(exports, "__esModule", { value: true });var _createClass = function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};}();var _account = require('./account');var _account2 = _interopRequireDefault(_account);
var _store = require('store');var _store2 = _interopRequireDefault(_store);
var _lodash = require('lodash');function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}

var NULL_ADDRESS = '0x0000000000000000000000000000000000000000';
var LS_STORE_KEY = '_parity::localAccounts';var

Accounts = function () {
  function Accounts() {var _this = this;var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _store2.default.get(LS_STORE_KEY) || {};_classCallCheck(this, Accounts);var _data$last =



    data.last,last = _data$last === undefined ? NULL_ADDRESS : _data$last,_data$store = data.store,store = _data$store === undefined ? [] : _data$store;

    this.persist = (0, _lodash.debounce)(function () {
      _store2.default.set(LS_STORE_KEY, _this);
    }, 100);

    this._last = last;
    this._store = store.map(function (data) {return new _account2.default(_this.persist, data);});
  }_createClass(Accounts, [{ key: 'create', value: function create(

    secret, password) {var _this2 = this;
      var privateKey = Buffer.from(secret.slice(2), 'hex');

      return _account2.default.
      fromPrivateKey(this.persist, privateKey, password).
      then(function (account) {var
        address = account.address;

        if (_this2._store.find(function (account) {return account.address === address;})) {
          throw new Error('Account ' + address + ' already exists!');
        }

        _this2._store.push(account);
        _this2.lastAddress = address;

        _this2.persist();

        return account.address;
      });
    } }, { key: 'get', value: function get(









    address) {
      address = address.toLowerCase();

      this.lastAddress = address;

      var account = this._store.find(function (account) {return account.address === address;});

      if (!account) {
        throw new Error('Account not found: ' + address);
      }

      return account;
    } }, { key: 'remove', value: function remove(

    address, password) {var _this3 = this;
      address = address.toLowerCase();

      var account = this.get(address);

      if (!account) {
        return false;
      }

      return account.
      isValidPassword(password).
      then(function (isValid) {
        if (!isValid) {
          return false;
        }

        if (address === _this3.lastAddress) {
          _this3.lastAddress = NULL_ADDRESS;
        }

        _this3.removeUnsafe(address);

        return true;
      });
    } }, { key: 'removeUnsafe', value: function removeUnsafe(

    address) {
      address = address.toLowerCase();

      var index = this._store.findIndex(function (account) {return account.address === address;});

      if (index === -1) {
        return;
      }

      this._store.splice(index, 1);

      this.persist();
    } }, { key: 'mapArray', value: function mapArray(

    mapper) {
      return this._store.map(mapper);
    } }, { key: 'mapObject', value: function mapObject(

    mapper) {
      var result = {};

      this._store.forEach(function (account) {
        result[account.address] = mapper(account);
      });

      return result;
    } }, { key: 'toJSON', value: function toJSON()

    {
      return {
        last: this._last,
        store: this._store };

    } }, { key: 'lastAddress', set: function set(value) {this._last = value.toLowerCase();}, get: function get() {return this._last;} }]);return Accounts;}();exports.default = Accounts;module.exports = exports['default'];