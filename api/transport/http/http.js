'use strict';Object.defineProperty(exports, "__esModule", { value: true });var _createClass = function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};}();var _subscriptions = require('../../subscriptions');
var _jsonRpcBase = require('../jsonRpcBase');var _jsonRpcBase2 = _interopRequireDefault(_jsonRpcBase);
var _error = require('../error');var _error2 = _interopRequireDefault(_error);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self, call) {if (!self) {throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call && (typeof call === "object" || typeof call === "function") ? call : self;}function _inherits(subClass, superClass) {if (typeof superClass !== "function" && superClass !== null) {throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;}

/* global fetch */var
Http = function (_JsonRpcBase) {_inherits(Http, _JsonRpcBase);
  function Http(url) {var connectTimeout = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1000;_classCallCheck(this, Http);var _this = _possibleConstructorReturn(this, (Http.__proto__ || Object.getPrototypeOf(Http)).call(this));_this.































































    _pollConnection = function () {
      if (_this._connectTimeout <= 0) {
        return;
      }

      var nextTimeout = function nextTimeout() {return setTimeout(_this._pollConnection, _this._connectTimeout);};

      _this.
      execute('net_listening').
      then(nextTimeout).
      catch(nextTimeout);
    };_this._connected = true;_this._url = url;_this._connectTimeout = connectTimeout;_this._pollConnection();return _this;}_createClass(Http, [{ key: '_encodeOptions', value: function _encodeOptions(method, params) {var json = this.encode(method, params);this.log(json);return { method: 'POST', headers: { 'Accept': 'application/json', 'Content-Type': 'application/json', 'Content-Length': json.length }, body: json };} }, { key: '_execute', value: function _execute(method, params) {var _this2 = this;var request = this._encodeOptions(method, params);return fetch(this._url, request).catch(function (error) {_this2._setDisconnected();throw error;}).then(function (response) {_this2._setConnected();if (response.status !== 200) {_this2._setDisconnected();_this2.error(JSON.stringify({ status: response.status, statusText: response.statusText }));console.error(method + '(' + JSON.stringify(params) + '): ' + response.status + ': ' + response.statusText);throw new Error(response.status + ': ' + response.statusText);}return response.json();}).then(function (response) {_subscriptions.Logging.send(method, params, { request: request, response: response });if (response.error) {_this2.error(JSON.stringify(response));console.error(method + '(' + JSON.stringify(params) + '): ' + response.error.code + ': ' + response.error.message);var error = new _error2.default(method, response.error.code, response.error.message);throw error;}_this2.log(JSON.stringify(response));return response.result;});} }]);return Http;}(_jsonRpcBase2.default);exports.default = Http;module.exports = exports['default'];