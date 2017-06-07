'use strict';Object.defineProperty(exports, "__esModule", { value: true });var _slicedToArray = function () {function sliceIterator(arr, i) {var _arr = [];var _n = true;var _d = false;var _e = undefined;try {for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {_arr.push(_s.value);if (i && _arr.length === i) break;}} catch (err) {_d = true;_e = err;} finally {try {if (!_n && _i["return"]) _i["return"]();} finally {if (_d) throw _e;}}return _arr;}return function (arr, i) {if (Array.isArray(arr)) {return arr;} else if (Symbol.iterator in Object(arr)) {return sliceIterator(arr, i);} else {throw new TypeError("Invalid attempt to destructure non-iterable instance");}};}();var _createClass = function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};}();var _eventemitter = require('eventemitter3');var _eventemitter2 = _interopRequireDefault(_eventemitter);

var _contract = require('./contract');var _contract2 = _interopRequireDefault(_contract);
var _provider = require('./provider');
var _transport = require('./transport');

var _rpc = require('./rpc');
var _subscriptions = require('./subscriptions');var _subscriptions2 = _interopRequireDefault(_subscriptions);
var _util = require('./util');var _util2 = _interopRequireDefault(_util);
var _types = require('./util/types');function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self, call) {if (!self) {throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call && (typeof call === "object" || typeof call === "function") ? call : self;}function _inherits(subClass, superClass) {if (typeof superClass !== "function" && superClass !== null) {throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;}
// import { LocalAccountsMiddleware } from './local';
var
Api = function (_EventEmitter) {_inherits(Api, _EventEmitter);
  function Api(provider) {var allowSubscriptions = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;_classCallCheck(this, Api);var _this = _possibleConstructorReturn(this, (Api.__proto__ || Object.getPrototypeOf(Api)).call(this));


    if (!provider || !(0, _types.isFunction)(provider.send) && !(0, _types.isFunction)(provider.execute)) {
      throw new Error('Api needs provider with send() function');
    }

    if (!(0, _types.isFunction)(provider.send)) {
      console.warn(new Error('deprecated: Api needs provider with send() function, old-style Transport found instead'));
    }

    _this._provider = new _provider.PromiseWrapper(provider);

    _this._db = new _rpc.Db(_this._provider);
    _this._eth = new _rpc.Eth(_this._provider);
    _this._net = new _rpc.Net(_this._provider);
    _this._parity = new _rpc.Parity(_this._provider);
    _this._personal = new _rpc.Personal(_this._provider);
    _this._shh = new _rpc.Shh(_this._provider);
    _this._signer = new _rpc.Signer(_this._provider);
    _this._trace = new _rpc.Trace(_this._provider);
    _this._web3 = new _rpc.Web3(_this._provider);

    if (allowSubscriptions) {
      _this._subscriptions = new _subscriptions2.default(_this);
    }

    // Doing a request here in test env would cause an error
    if (process.env.NODE_ENV !== 'test') {
      var middleware = _this.parity.
      nodeKind().
      then(function (nodeKind) {
        // if (nodeKind.availability === 'public') {
        //   return LocalAccountsMiddleware;
        // }

        return null;
      }).
      catch(function () {return null;});

      provider.addMiddleware(middleware);
    }return _this;
  }_createClass(Api, [{ key: 'newContract', value: function newContract(

















































    abi, address) {
      return new _contract2.default(this, abi).at(address);
    } }, { key: 'subscribe', value: function subscribe(

    subscriptionName, callback) {
      if (!this._subscriptions) {
        return Promise.resolve(1);
      }

      return this._subscriptions.subscribe(subscriptionName, callback);
    } }, { key: 'unsubscribe', value: function unsubscribe(

    subscriptionId) {
      if (!this._subscriptions) {
        return Promise.resolve(true);
      }

      return this._subscriptions.unsubscribe(subscriptionId);
    } }, { key: 'pollMethod', value: function pollMethod(

    method, input, validate) {var _this2 = this;var _method$split =
      method.split('_'),_method$split2 = _slicedToArray(_method$split, 2),_group = _method$split2[0],endpoint = _method$split2[1];
      var group = '_' + _group;

      return new Promise(function (resolve, reject) {
        var timeout = function timeout() {
          _this2[group][endpoint](input).
          then(function (result) {
            if (validate ? validate(result) : result) {
              resolve(result);
            } else {
              setTimeout(timeout, 500);
            }
          }).
          catch(function (error) {
            // Don't print if the request is rejected: that's ok
            if (error.type !== 'REQUEST_REJECTED') {
              console.error('pollMethod', error);
            }

            reject(error);
          });
        };

        timeout();
      });
    }








    // NOTE: kept for backwards compatibility
  }, { key: 'db', get: function get() {return this._db;} }, { key: 'eth', get: function get() {return this._eth;} }, { key: 'parity', get: function get() {return this._parity;} }, { key: 'net', get: function get() {return this._net;} }, { key: 'personal', get: function get() {return this._personal;} }, { key: 'provider', get: function get() {return this._provider.provider;} }, { key: 'shh', get: function get() {return this._shh;} }, { key: 'signer', get: function get() {return this._signer;} }, { key: 'trace', get: function get() {return this._trace;} }, { key: 'transport', get: function get() {return this.provider;} }, { key: 'web3', get: function get() {return this._web3;} }, { key: 'util', get: function get() {return _util2.default;} }]);return Api;}(_eventemitter2.default);Api.util = _util2.default;Api.Provider = { Http: _provider.Http, Ws: _provider.Ws };Api.Transport = {
  Http: _transport.Http,
  Ws: _transport.Ws };exports.default = Api;module.exports = exports['default'];