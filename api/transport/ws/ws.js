'use strict';Object.defineProperty(exports, "__esModule", { value: true });var _createClass = function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};}();var _jsSha = require('js-sha3');

var _subscriptions = require('../../subscriptions');
var _jsonRpcBase = require('../jsonRpcBase');var _jsonRpcBase2 = _interopRequireDefault(_jsonRpcBase);
var _error = require('../error');var _error2 = _interopRequireDefault(_error);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self, call) {if (!self) {throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call && (typeof call === "object" || typeof call === "function") ? call : self;}function _inherits(subClass, superClass) {if (typeof superClass !== "function" && superClass !== null) {throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;} // eslint-disable-line camelcase

/* global WebSocket */var
Ws = function (_JsonRpcBase) {_inherits(Ws, _JsonRpcBase);
  function Ws(url, token) {var autoconnect = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;_classCallCheck(this, Ws);var _this = _possibleConstructorReturn(this, (Ws.__proto__ || Object.getPrototypeOf(Ws)).call(this));_this.







































































































    _onOpen = function (event) {
      _this._setConnected();
      _this._connecting = false;
      _this._retries = 0;

      Object.keys(_this._messages).
      filter(function (id) {return _this._messages[id].queued;}).
      forEach(_this._send);

      _this._connectPromiseFunctions.resolve();

      _this._connectPromise = null;
      _this._connectPromiseFunctions = {};
    };_this.

    _onClose = function (event) {
      _this._setDisconnected();
      _this._connecting = false;

      event.timestamp = Date.now();
      _this._lastError = event;

      if (_this._autoConnect) {
        var timeout = _this.retryTimeout;

        var time = timeout < 1000 ?
        Math.round(timeout) + 'ms' :
        Math.round(timeout / 10) / 100 + 's';

        console.log('ws:onClose', 'trying again in ' + time + '...');

        _this._reconnectTimeoutId = setTimeout(function () {
          _this.connect();
        }, timeout);

        return;
      }

      if (_this._connectPromise) {
        _this._connectPromiseFunctions.reject(event);

        _this._connectPromise = null;
        _this._connectPromiseFunctions = {};
      }

      console.log('ws:onClose');
    };_this.

    _onError = function (event) {
      // Only print error if the WS is connected
      // ie. don't print if error == closed
      window.setTimeout(function () {
        if (_this._connected) {
          console.error('ws:onError');

          event.timestamp = Date.now();
          _this._lastError = event;

          if (_this._connectPromise) {
            _this._connectPromiseFunctions.reject(event);

            _this._connectPromise = null;
            _this._connectPromiseFunctions = {};
          }
        }
      }, 50);
    };_this.

    _onMessage = function (event) {
      try {
        var result = JSON.parse(event.data);var _this$_messages$resul =
        _this._messages[result.id],method = _this$_messages$resul.method,params = _this$_messages$resul.params,json = _this$_messages$resul.json,resolve = _this$_messages$resul.resolve,reject = _this$_messages$resul.reject;

        _subscriptions.Logging.send(method, params, { json: json, result: result });

        if (result.error) {
          _this.error(event.data);

          // Don't print error if request rejected or not is not yet up...
          if (!/(rejected|not yet up)/.test(result.error.message)) {
            console.error(method + '(' + JSON.stringify(params) + '): ' + result.error.code + ': ' + result.error.message);
          }

          var error = new _error2.default(method, result.error.code, result.error.message);

          reject(error);

          delete _this._messages[result.id];
          return;
        }

        resolve(result.result);
        delete _this._messages[result.id];
      } catch (e) {
        console.error('ws::_onMessage', event.data, e);
      }
    };_this.

    _send = function (id) {
      var message = _this._messages[id];

      if (_this._connected) {
        if (process.env.NODE_ENV === 'development') {
          _this._count++;
        }

        return _this._ws.send(message.json);
      }

      message.queued = !_this._connected;
      message.timestamp = Date.now();
    };_this._url = url;_this._token = token;_this._messages = {};_this._sessionHash = null;_this._connecting = false;_this._connected = false;_this._lastError = null;_this._autoConnect = autoconnect;_this._retries = 0;_this._reconnectTimeoutId = null;_this._connectPromise = null;_this._connectPromiseFunctions = {};if (autoconnect) {_this.connect();}return _this;}_createClass(Ws, [{ key: 'updateToken', value: function updateToken(token) {var connect = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;this._token = token; // this._autoConnect = true;
      if (connect) {this.connect();}} }, { key: 'connect', value: function connect() {var _this2 = this;if (this._connected) {return Promise.resolve();}if (this._connecting) {return this._connectPromise || Promise.resolve();}if (this._reconnectTimeoutId) {window.clearTimeout(this._reconnectTimeoutId);this._reconnectTimeoutId = null;}var time = parseInt(new Date().getTime() / 1000, 10);var sha3 = (0, _jsSha.keccak_256)(this._token + ':' + time);var hash = sha3 + '_' + time;if (this._ws) {this._ws.onerror = null;this._ws.onopen = null;this._ws.onclose = null;this._ws.onmessage = null;this._ws.close();this._ws = null;this._sessionHash = null;}this._connecting = true;this._connected = false;this._lastError = null;this._sessionHash = sha3;this._ws = new WebSocket(this._url, hash);this._ws.onerror = this._onError;this._ws.onopen = this._onOpen;this._ws.onclose = this._onClose;this._ws.onmessage = this._onMessage; // Get counts in dev mode only
      if (process.env.NODE_ENV === 'development') {this._count = 0;this._lastCount = { timestamp: Date.now(), count: 0 };window.setInterval(function () {var n = _this2._count - _this2._lastCount.count;var t = (Date.now() - _this2._lastCount.timestamp) / 1000;var s = Math.round(1000 * n / t) / 1000;if (_this2._debug) {console.log('::parityWS', 'speed: ' + s + ' req/s', 'count: ' + _this2._count, '(+' + n + ')');}_this2._lastCount = { timestamp: Date.now(), count: _this2._count };}, 5000);window._parityWS = this;}this._connectPromise = new Promise(function (resolve, reject) {_this2._connectPromiseFunctions = { resolve: resolve, reject: reject };});return this._connectPromise;} }, { key: '_execute', value: function _execute(method, params) {var _this3 = this;
      return new Promise(function (resolve, reject) {
        var id = _this3.id;
        var json = _this3.encode(method, params);

        _this3._messages[id] = { id: id, method: method, params: params, json: json, resolve: resolve, reject: reject };
        _this3._send(id);
      });
    } }, { key: 'token', get: function get()

    {
      return this._token;
    } }, { key: 'sessionHash', get: function get()

    {
      return this._sessionHash;
    } }, { key: 'isAutoConnect', get: function get()

    {
      return this._autoConnect;
    } }, { key: 'isConnecting', get: function get()

    {
      return this._connecting;
    } }, { key: 'lastError', get: function get()

    {
      return this._lastError;
    }

    /**
       * Exponential Timeout for Retries
       *
       * @see http://dthain.blogspot.de/2009/02/exponential-backoff-in-distributed.html
       */ }, { key: 'retryTimeout', get: function get()
    {
      // R between 1 and 2
      var R = Math.random() + 1;
      // Initial timeout (100ms)
      var T = 100;
      // Exponential Factor
      var F = 2;
      // Max timeout (4s)
      var M = 4000;
      // Current number of retries
      var N = this._retries;

      // Increase retries number
      this._retries++;

      return Math.min(R * T * Math.pow(F, N), M);
    } }]);return Ws;}(_jsonRpcBase2.default);exports.default = Ws;module.exports = exports['default'];