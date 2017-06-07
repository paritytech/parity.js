'use strict';Object.defineProperty(exports, "__esModule", { value: true });var _createClass = function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};}();var _input = require('../../format/input');
var _output = require('../../format/output');function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}var

Signer = function () {
  function Signer(provider) {_classCallCheck(this, Signer);
    this._provider = provider;
  }_createClass(Signer, [{ key: 'confirmRequest', value: function confirmRequest(

    requestId, options, password) {
      return this._provider.
      send('signer_confirmRequest', (0, _input.inNumber16)(requestId), (0, _input.inOptions)(options), password);
    } }, { key: 'confirmRequestRaw', value: function confirmRequestRaw(

    requestId, data) {
      return this._provider.
      send('signer_confirmRequestRaw', (0, _input.inNumber16)(requestId), (0, _input.inData)(data));
    } }, { key: 'confirmRequestWithToken', value: function confirmRequestWithToken(

    requestId, options, password) {
      return this._provider.
      send('signer_confirmRequestWithToken', (0, _input.inNumber16)(requestId), (0, _input.inOptions)(options), password);
    } }, { key: 'generateAuthorizationToken', value: function generateAuthorizationToken()

    {
      return this._provider.
      send('signer_generateAuthorizationToken');
    } }, { key: 'generateWebProxyAccessToken', value: function generateWebProxyAccessToken()

    {
      return this._provider.
      send('signer_generateWebProxyAccessToken');
    } }, { key: 'rejectRequest', value: function rejectRequest(

    requestId) {
      return this._provider.
      send('signer_rejectRequest', (0, _input.inNumber16)(requestId));
    } }, { key: 'requestsToConfirm', value: function requestsToConfirm()

    {
      return this._provider.
      send('signer_requestsToConfirm').
      then(function (requests) {return (requests || []).map(_output.outSignerRequest);});
    } }, { key: 'signerEnabled', value: function signerEnabled()

    {
      return this._provider.
      send('signer_signerEnabled');
    } }]);return Signer;}();exports.default = Signer;module.exports = exports['default'];