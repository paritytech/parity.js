'use strict';Object.defineProperty(exports, "__esModule", { value: true });exports.events = undefined;var _createClass = function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};}();var _types = require('../util/types');

var _eth = require('./eth');var _eth2 = _interopRequireDefault(_eth);
var _logging = require('./logging');var _logging2 = _interopRequireDefault(_logging);
var _personal = require('./personal');var _personal2 = _interopRequireDefault(_personal);
var _signer = require('./signer');var _signer2 = _interopRequireDefault(_signer);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}

var events = {
  'logging': { module: 'logging' },
  'eth_blockNumber': { module: 'eth' },
  'parity_accountsInfo': { module: 'personal' },
  'parity_allAccountsInfo': { module: 'personal' },
  'parity_defaultAccount': { module: 'personal' },
  'parity_postTransaction': { module: 'signer' },
  'eth_accounts': { module: 'personal' },
  'signer_requestsToConfirm': { module: 'signer' } };var


Manager = function () {
  function Manager(api) {var _this = this;_classCallCheck(this, Manager);this.





















































































    _updateSubscriptions = function (subscriptionName, error, data) {
      var subscriptions = _this.subscriptions.
      filter(function (subscription) {return subscription.name === subscriptionName;});

      _this.values[subscriptionName] = { error: error, data: data };

      subscriptions.
      forEach(function (subscription) {
        _this._sendData(subscription.id, error, data);
      });
    };this._api = api;this.subscriptions = [];this.values = {};Object.keys(events).forEach(function (subscriptionName) {_this.values[subscriptionName] = { error: null, data: null };});this._logging = new _logging2.default(this._updateSubscriptions);this._eth = new _eth2.default(this._updateSubscriptions, api);this._personal = new _personal2.default(this._updateSubscriptions, api, this);this._signer = new _signer2.default(this._updateSubscriptions, api, this);}_createClass(Manager, [{ key: '_validateType', value: function _validateType(subscriptionName) {var subscription = events[subscriptionName];if (!subscription) {return new Error(subscriptionName + ' is not a valid interface, subscribe using one of ' + Object.keys(events).join(', '));}return subscription;} }, { key: 'subscribe', value: function subscribe(subscriptionName, callback) {var _this2 = this;var autoRemove = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;return new Promise(function (resolve, reject) {var subscription = _this2._validateType(subscriptionName);if ((0, _types.isError)(subscription)) {reject(subscription);return;}var subscriptionId = _this2.subscriptions.length;var _values$subscriptionN = _this2.values[subscriptionName],error = _values$subscriptionN.error,data = _values$subscriptionN.data;var engine = _this2['_' + subscription.module];_this2.subscriptions[subscriptionId] = { name: subscriptionName, id: subscriptionId, autoRemove: autoRemove, callback: callback };if (!engine.isStarted) {engine.start();} else if (error !== null || data !== null) {_this2._sendData(subscriptionId, error, data);}resolve(subscriptionId);});} }, { key: 'unsubscribe', value: function unsubscribe(subscriptionId) {var _this3 = this;return new Promise(function (resolve, reject) {if (!_this3.subscriptions[subscriptionId]) {reject(new Error('Cannot find subscription ' + subscriptionId));return;}delete _this3.subscriptions[subscriptionId];resolve();});} }, { key: '_sendData', value: function _sendData(subscriptionId, error, data) {var _subscriptions$subscr = this.subscriptions[subscriptionId],autoRemove = _subscriptions$subscr.autoRemove,callback = _subscriptions$subscr.callback;var result = true;try {result = callback(error, data);} catch (error) {console.error('Unable to update callback for subscriptionId ' + subscriptionId, error);}if (autoRemove && result && typeof result === 'boolean') {this.unsubscribe(subscriptionId);}} }]);return Manager;}();exports.default = Manager;exports.



events = events;