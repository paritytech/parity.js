'use strict';Object.defineProperty(exports, "__esModule", { value: true });var _slicedToArray = function () {function sliceIterator(arr, i) {var _arr = [];var _n = true;var _d = false;var _e = undefined;try {for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {_arr.push(_s.value);if (i && _arr.length === i) break;}} catch (err) {_d = true;_e = err;} finally {try {if (!_n && _i["return"]) _i["return"]();} finally {if (_d) throw _e;}}return _arr;}return function (arr, i) {if (Array.isArray(arr)) {return arr;} else if (Symbol.iterator in Object(arr)) {return sliceIterator(arr, i);} else {throw new TypeError("Invalid attempt to destructure non-iterable instance");}};}();var _createClass = function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};}();var _eventemitter = require('eventemitter3');var _eventemitter2 = _interopRequireDefault(_eventemitter);
var _subscriptions = require('../subscriptions');function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self, call) {if (!self) {throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call && (typeof call === "object" || typeof call === "function") ? call : self;}function _inherits(subClass, superClass) {if (typeof superClass !== "function" && superClass !== null) {throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;}var

JsonRpcBase = function (_EventEmitter) {_inherits(JsonRpcBase, _EventEmitter);
  function JsonRpcBase() {_classCallCheck(this, JsonRpcBase);var _this = _possibleConstructorReturn(this, (JsonRpcBase.__proto__ || Object.getPrototypeOf(JsonRpcBase)).call(this));


    _this._id = 1;
    _this._debug = false;
    _this._connected = false;
    _this._middlewareList = Promise.resolve([]);return _this;
  }_createClass(JsonRpcBase, [{ key: 'encode', value: function encode(

    method, params) {
      var json = JSON.stringify({
        jsonrpc: '2.0',
        method: method,
        params: params,
        id: this._id++ });


      return json;
    } }, { key: 'addMiddleware', value: function addMiddleware(

    Middleware) {var _this2 = this;
      this._middlewareList = Promise.
      all([
      Middleware,
      this._middlewareList]).

      then(function (_ref) {var _ref2 = _slicedToArray(_ref, 2),Middleware = _ref2[0],middlewareList = _ref2[1];
        // Do nothing if `handlerPromise` resolves to a null-y value.
        if (Middleware == null) {
          return middlewareList;
        }

        // don't mutate the original array
        return middlewareList.concat([new Middleware(_this2)]);
      });
    } }, { key: '_wrapSuccessResult', value: function _wrapSuccessResult(

    result) {
      return {
        id: this._id,
        jsonrpc: '2.0',
        result: result };

    } }, { key: '_wrapErrorResult', value: function _wrapErrorResult(

    error) {
      return {
        id: this._id,
        jsonrpc: '2.0',
        error: {
          code: error.code,
          message: error.text } };


    } }, { key: 'execute', value: function execute(

    method, params) {var _this3 = this;
      return this._middlewareList.then(function (middlewareList) {var _iteratorNormalCompletion = true;var _didIteratorError = false;var _iteratorError = undefined;try {
          for (var _iterator = middlewareList[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {var middleware = _step.value;
            var res = middleware.handle(method, params);

            if (res != null) {
              return Promise.
              resolve(res).
              then(function (res) {
                var result = _this3._wrapSuccessResult(res);
                var json = _this3.encode(method, params);

                _subscriptions.Logging.send(method, params, { json: json, result: result });

                return res;
              });
            }
          }} catch (err) {_didIteratorError = true;_iteratorError = err;} finally {try {if (!_iteratorNormalCompletion && _iterator.return) {_iterator.return();}} finally {if (_didIteratorError) {throw _iteratorError;}}}

        return _this3._execute(method, params);
      });
    } }, { key: '_execute', value: function _execute()

    {
      throw new Error('Missing implementation of JsonRpcBase#_execute');
    } }, { key: '_setConnected', value: function _setConnected()

    {
      if (!this._connected) {
        this._connected = true;
        this.emit('open');
      }
    } }, { key: '_setDisconnected', value: function _setDisconnected()

    {
      if (this._connected) {
        this._connected = false;
        this.emit('close');
      }
    } }, { key: 'setDebug', value: function setDebug(













    flag) {
      this._debug = flag;
    } }, { key: 'error', value: function error(

    _error) {
      if (this.isDebug) {
        console.error(_error);
      }
    } }, { key: 'log', value: function log(

    _log) {
      if (this.isDebug) {
        console.log(_log);
      }
    } }, { key: 'id', get: function get() {return this._id;} }, { key: 'isDebug', get: function get() {return this._debug;} }, { key: 'isConnected', get: function get() {return this._connected;} }]);return JsonRpcBase;}(_eventemitter2.default);exports.default = JsonRpcBase;module.exports = exports['default'];