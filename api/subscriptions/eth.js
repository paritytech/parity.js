'use strict';Object.defineProperty(exports, "__esModule", { value: true });var _createClass = function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};}();var _bignumber = require('bignumber.js');var _bignumber2 = _interopRequireDefault(_bignumber);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}var

Eth = function () {
  function Eth(updateSubscriptions, api) {var _this = this;_classCallCheck(this, Eth);this.


















    _blockNumber = function () {
      var nextTimeout = function nextTimeout() {var timeout = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1000;
        _this._pollTimerId = setTimeout(function () {
          _this._blockNumber();
        }, timeout);
      };

      if (!_this._api.transport.isConnected) {
        nextTimeout(500);
        return;
      }

      return _this._api.eth.
      blockNumber().
      then(function (blockNumber) {
        if (!blockNumber.eq(_this._lastBlock)) {
          _this._lastBlock = blockNumber;
          _this._updateSubscriptions('eth_blockNumber', null, blockNumber);
        }

        nextTimeout();
      }).
      catch(function () {return nextTimeout();});
    };this._api = api;this._updateSubscriptions = updateSubscriptions;this._started = false;this._lastBlock = new _bignumber2.default(-1);this._pollTimerId = null;}_createClass(Eth, [{ key: 'start', value: function start() {this._started = true;return this._blockNumber();} }, { key: 'isStarted', get: function get() {return this._started;} }]);return Eth;}();exports.default = Eth;module.exports = exports['default'];