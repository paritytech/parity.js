'use strict';Object.defineProperty(exports, "__esModule", { value: true });var _createClass = function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};}();var _output = require('../format/output');function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}var

Signer = function () {
  function Signer(updateSubscriptions, api, subscriber) {var _this = this;_classCallCheck(this, Signer);this.



















    _listRequests = function (doTimeout) {
      var nextTimeout = function nextTimeout() {var timeout = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1000;
        if (doTimeout) {
          setTimeout(function () {
            _this._listRequests(true);
          }, timeout);
        }
      };

      if (!_this._api.transport.isConnected) {
        nextTimeout(500);
        return;
      }

      return _this._api.signer.
      requestsToConfirm().
      then(function (requests) {
        _this._updateSubscriptions('signer_requestsToConfirm', null, requests);
        nextTimeout();
      }).
      catch(nextTimeout);
    };this._subscriber = subscriber;this._api = api;this._updateSubscriptions = updateSubscriptions;this._started = false;}_createClass(Signer, [{ key: 'start', value: function start() {this._started = true;return Promise.all([this._listRequests(true), this._loggingSubscribe()]);} }, { key: '_postTransaction', value: function _postTransaction(

    data) {
      var request = {
        transaction: (0, _output.outTransaction)(data.params[0]),
        requestId: data.json.result.result };


      this._updateSubscriptions('parity_postTransaction', null, request);
    } }, { key: '_loggingSubscribe', value: function _loggingSubscribe()

    {var _this2 = this;
      return this._subscriber.subscribe('logging', function (error, data) {
        if (error || !data) {
          return;
        }

        switch (data.method) {
          case 'eth_sendTransaction':
          case 'eth_sendRawTransaction':
            _this2._listRequests(false);
            return;

          case 'parity_postTransaction':
            _this2._postTransaction(data);
            _this2._listRequests(false);
            return;

          default:
            return;}

      });
    } }, { key: 'isStarted', get: function get() {return this._started;} }]);return Signer;}();exports.default = Signer;module.exports = exports['default'];