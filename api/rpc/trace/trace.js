'use strict';Object.defineProperty(exports, "__esModule", { value: true });var _createClass = function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};}();var _input = require('../../format/input');
var _output = require('../../format/output');function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}var

Trace = function () {
  function Trace(provider) {_classCallCheck(this, Trace);
    this._provider = provider;
  }_createClass(Trace, [{ key: 'block', value: function block()

    {var blockNumber = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'latest';
      return this._provider.
      send('trace_block', (0, _input.inBlockNumber)(blockNumber)).
      then(_output.outTraces);
    } }, { key: 'call', value: function call(

    options) {var blockNumber = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'latest';var whatTrace = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : ['trace'];
      return this._provider.
      send('trace_call', (0, _input.inOptions)(options), (0, _input.inBlockNumber)(blockNumber), (0, _input.inTraceType)(whatTrace)).
      then(_output.outTraceReplay);
    } }, { key: 'filter', value: function filter(

    filterObj) {
      return this._provider.
      send('trace_filter', (0, _input.inTraceFilter)(filterObj)).
      then(_output.outTraces);
    } }, { key: 'get', value: function get(

    txHash, position) {
      return this._provider.
      send('trace_get', (0, _input.inHex)(txHash), (0, _input.inNumber16)(position)).
      then(_output.outTraces);
    } }, { key: 'rawTransaction', value: function rawTransaction(

    data) {var whatTrace = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : ['trace'];
      return this._provider.
      send('trace_rawTransaction', (0, _input.inData)(data), (0, _input.inTraceType)(whatTrace)).
      then(_output.outTraceReplay);
    } }, { key: 'replayTransaction', value: function replayTransaction(

    txHash) {var whatTrace = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : ['trace'];
      return this._provider.
      send('trace_replayTransaction', txHash, (0, _input.inTraceType)(whatTrace)).
      then(_output.outTraceReplay);
    } }, { key: 'transaction', value: function transaction(

    txHash) {
      return this._provider.
      send('trace_transaction', (0, _input.inHex)(txHash)).
      then(_output.outTraces);
    } }]);return Trace;}();exports.default = Trace;module.exports = exports['default'];