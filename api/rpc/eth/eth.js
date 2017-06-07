'use strict';Object.defineProperty(exports, "__esModule", { value: true });var _createClass = function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};}();var _input = require('../../format/input');
var _output = require('../../format/output');function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}var

Eth = function () {
  function Eth(provider) {_classCallCheck(this, Eth);
    this._provider = provider;
  }_createClass(Eth, [{ key: 'accounts', value: function accounts()

    {
      return this._provider.
      send('eth_accounts').
      then(function (accounts) {return (accounts || []).map(_output.outAddress);});
    } }, { key: 'blockNumber', value: function blockNumber()

    {
      return this._provider.
      send('eth_blockNumber').
      then(_output.outNumber);
    } }, { key: 'call', value: function call(

    options) {var blockNumber = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'latest';
      return this._provider.
      send('eth_call', (0, _input.inOptions)(options), (0, _input.inBlockNumber)(blockNumber));
    } }, { key: 'coinbase', value: function coinbase()

    {
      return this._provider.
      send('eth_coinbase').
      then(_output.outAddress);
    } }, { key: 'compileLLL', value: function compileLLL(

    code) {
      return this._provider.
      send('eth_compileLLL', (0, _input.inData)(code));
    } }, { key: 'compileSerpent', value: function compileSerpent(

    code) {
      return this._provider.
      send('eth_compileSerpent', (0, _input.inData)(code));
    } }, { key: 'compileSolidity', value: function compileSolidity(

    code) {
      return this._provider.
      send('eth_compileSolidity', (0, _input.inData)(code));
    } }, { key: 'estimateGas', value: function estimateGas(

    options) {
      return this._provider.
      send('eth_estimateGas', (0, _input.inOptions)(options)).
      then(_output.outNumber);
    } }, { key: 'fetchQueuedTransactions', value: function fetchQueuedTransactions()

    {
      return this._provider.
      send('eth_fetchQueuedTransactions');
    } }, { key: 'flush', value: function flush()

    {
      return this._provider.
      send('eth_flush');
    } }, { key: 'gasPrice', value: function gasPrice()

    {
      return this._provider.
      send('eth_gasPrice').
      then(_output.outNumber);
    } }, { key: 'getBalance', value: function getBalance(

    address) {var blockNumber = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'latest';
      return this._provider.
      send('eth_getBalance', (0, _input.inAddress)(address), (0, _input.inBlockNumber)(blockNumber)).
      then(_output.outNumber);
    } }, { key: 'getBlockByHash', value: function getBlockByHash(

    hash) {var full = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      return this._provider.
      send('eth_getBlockByHash', (0, _input.inHex)(hash), full).
      then(_output.outBlock);
    } }, { key: 'getBlockByNumber', value: function getBlockByNumber()

    {var blockNumber = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'latest';var full = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      return this._provider.
      send('eth_getBlockByNumber', (0, _input.inBlockNumber)(blockNumber), full).
      then(_output.outBlock);
    } }, { key: 'getBlockTransactionCountByHash', value: function getBlockTransactionCountByHash(

    hash) {
      return this._provider.
      send('eth_getBlockTransactionCountByHash', (0, _input.inHex)(hash)).
      then(_output.outNumber);
    } }, { key: 'getBlockTransactionCountByNumber', value: function getBlockTransactionCountByNumber()

    {var blockNumber = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'latest';
      return this._provider.
      send('eth_getBlockTransactionCountByNumber', (0, _input.inBlockNumber)(blockNumber)).
      then(_output.outNumber);
    } }, { key: 'getCode', value: function getCode(

    address) {var blockNumber = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'latest';
      return this._provider.
      send('eth_getCode', (0, _input.inAddress)(address), (0, _input.inBlockNumber)(blockNumber));
    } }, { key: 'getCompilers', value: function getCompilers()

    {
      return this._provider.
      send('eth_getCompilers');
    } }, { key: 'getFilterChanges', value: function getFilterChanges(

    filterId) {
      return this._provider.
      send('eth_getFilterChanges', (0, _input.inNumber16)(filterId)).
      then(function (logs) {return logs.map(_output.outLog);});
    } }, { key: 'getFilterChangesEx', value: function getFilterChangesEx(

    filterId) {
      return this._provider.
      send('eth_getFilterChangesEx', (0, _input.inNumber16)(filterId));
    } }, { key: 'getFilterLogs', value: function getFilterLogs(

    filterId) {
      return this._provider.
      send('eth_getFilterLogs', (0, _input.inNumber16)(filterId)).
      then(function (logs) {return logs.map(_output.outLog);});
    } }, { key: 'getFilterLogsEx', value: function getFilterLogsEx(

    filterId) {
      return this._provider.
      send('eth_getFilterLogsEx', (0, _input.inNumber16)(filterId));
    } }, { key: 'getLogs', value: function getLogs(

    options) {
      return this._provider.
      send('eth_getLogs', (0, _input.inFilter)(options)).
      then(function (logs) {return logs.map(_output.outLog);});
    } }, { key: 'getLogsEx', value: function getLogsEx(

    options) {
      return this._provider.
      send('eth_getLogsEx', (0, _input.inFilter)(options));
    } }, { key: 'getStorageAt', value: function getStorageAt(

    address) {var index = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;var blockNumber = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'latest';
      return this._provider.
      send('eth_getStorageAt', (0, _input.inAddress)(address), (0, _input.inNumber16)(index), (0, _input.inBlockNumber)(blockNumber));
    } }, { key: 'getTransactionByBlockHashAndIndex', value: function getTransactionByBlockHashAndIndex(

    hash) {var index = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      return this._provider.
      send('eth_getTransactionByBlockHashAndIndex', (0, _input.inHex)(hash), (0, _input.inNumber16)(index)).
      then(_output.outTransaction);
    } }, { key: 'getTransactionByBlockNumberAndIndex', value: function getTransactionByBlockNumberAndIndex()

    {var blockNumber = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'latest';var index = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      return this._provider.
      send('eth_getTransactionByBlockNumberAndIndex', (0, _input.inBlockNumber)(blockNumber), (0, _input.inNumber16)(index)).
      then(_output.outTransaction);
    } }, { key: 'getTransactionByHash', value: function getTransactionByHash(

    hash) {
      return this._provider.
      send('eth_getTransactionByHash', (0, _input.inHex)(hash)).
      then(_output.outTransaction);
    } }, { key: 'getTransactionCount', value: function getTransactionCount(

    address) {var blockNumber = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'latest';
      return this._provider.
      send('eth_getTransactionCount', (0, _input.inAddress)(address), (0, _input.inBlockNumber)(blockNumber)).
      then(_output.outNumber);
    } }, { key: 'getTransactionReceipt', value: function getTransactionReceipt(

    txhash) {
      return this._provider.
      send('eth_getTransactionReceipt', (0, _input.inHex)(txhash)).
      then(_output.outReceipt);
    } }, { key: 'getUncleByBlockHashAndIndex', value: function getUncleByBlockHashAndIndex(

    hash) {var index = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      return this._provider.
      send('eth_getUncleByBlockHashAndIndex', (0, _input.inHex)(hash), (0, _input.inNumber16)(index));
    } }, { key: 'getUncleByBlockNumberAndIndex', value: function getUncleByBlockNumberAndIndex()

    {var blockNumber = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'latest';var index = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      return this._provider.
      send('eth_getUncleByBlockNumberAndIndex', (0, _input.inBlockNumber)(blockNumber), (0, _input.inNumber16)(index));
    } }, { key: 'getUncleCountByBlockHash', value: function getUncleCountByBlockHash(

    hash) {
      return this._provider.
      send('eth_getUncleCountByBlockHash', (0, _input.inHex)(hash)).
      then(_output.outNumber);
    } }, { key: 'getUncleCountByBlockNumber', value: function getUncleCountByBlockNumber()

    {var blockNumber = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'latest';
      return this._provider.
      send('eth_getUncleCountByBlockNumber', (0, _input.inBlockNumber)(blockNumber)).
      then(_output.outNumber);
    } }, { key: 'getWork', value: function getWork()

    {
      return this._provider.
      send('eth_getWork');
    } }, { key: 'hashrate', value: function hashrate()

    {
      return this._provider.
      send('eth_hashrate').
      then(_output.outNumber);
    } }, { key: 'inspectTransaction', value: function inspectTransaction()

    {
      return this._provider.
      send('eth_inspectTransaction');
    } }, { key: 'mining', value: function mining()

    {
      return this._provider.
      send('eth_mining');
    } }, { key: 'newBlockFilter', value: function newBlockFilter()

    {
      return this._provider.
      send('eth_newBlockFilter');
    } }, { key: 'newFilter', value: function newFilter(

    options) {
      return this._provider.
      send('eth_newFilter', (0, _input.inFilter)(options));
    } }, { key: 'newFilterEx', value: function newFilterEx(

    options) {
      return this._provider.
      send('eth_newFilterEx', (0, _input.inFilter)(options));
    } }, { key: 'newPendingTransactionFilter', value: function newPendingTransactionFilter()

    {
      return this._provider.
      send('eth_newPendingTransactionFilter');
    } }, { key: 'notePassword', value: function notePassword()

    {
      return this._provider.
      send('eth_notePassword');
    } }, { key: 'pendingTransactions', value: function pendingTransactions()

    {
      return this._provider.
      send('eth_pendingTransactions');
    } }, { key: 'protocolVersion', value: function protocolVersion()

    {
      return this._provider.
      send('eth_protocolVersion');
    } }, { key: 'register', value: function register()

    {
      return this._provider.
      send('eth_register');
    } }, { key: 'sendRawTransaction', value: function sendRawTransaction(

    data) {
      return this._provider.
      send('eth_sendRawTransaction', (0, _input.inData)(data));
    } }, { key: 'sendTransaction', value: function sendTransaction(

    options) {
      return this._provider.
      send('eth_sendTransaction', (0, _input.inOptions)(options));
    } }, { key: 'sign', value: function sign(

    address, hash) {
      return this._provider.
      send('eth_sign', (0, _input.inAddress)(address), (0, _input.inHash)(hash));
    } }, { key: 'signTransaction', value: function signTransaction(

    options) {
      return this._provider.
      send('eth_signTransaction', (0, _input.inOptions)(options));
    } }, { key: 'submitHashrate', value: function submitHashrate(

    hashrate, clientId) {
      return this._provider.
      send('eth_submitHashrate', (0, _input.inNumber16)(hashrate), clientId);
    } }, { key: 'submitWork', value: function submitWork(

    nonce, powHash, mixDigest) {
      return this._provider.
      send('eth_submitWork', (0, _input.inNumber16)(nonce), powHash, mixDigest);
    } }, { key: 'syncing', value: function syncing()

    {
      return this._provider.
      send('eth_syncing').
      then(_output.outSyncing);
    } }, { key: 'uninstallFilter', value: function uninstallFilter(

    filterId) {
      return this._provider.
      send('eth_uninstallFilter', (0, _input.inHex)(filterId));
    } }, { key: 'unregister', value: function unregister()

    {
      return this._provider.
      send('eth_unregister');
    } }]);return Eth;}();exports.default = Eth;module.exports = exports['default'];