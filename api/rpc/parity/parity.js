'use strict';Object.defineProperty(exports, "__esModule", { value: true });var _createClass = function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};}();var _input = require('../../format/input');
var _output = require('../../format/output');function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}var

Parity = function () {
  function Parity(provider) {_classCallCheck(this, Parity);
    this._provider = provider;
  }_createClass(Parity, [{ key: 'acceptNonReservedPeers', value: function acceptNonReservedPeers()

    {
      return this._provider.
      send('parity_acceptNonReservedPeers');
    } }, { key: 'accountsInfo', value: function accountsInfo()

    {
      return this._provider.
      send('parity_accountsInfo').
      then(_output.outAccountInfo);
    } }, { key: 'allAccountsInfo', value: function allAccountsInfo()

    {
      return this._provider.
      send('parity_allAccountsInfo').
      then(_output.outAccountInfo);
    } }, { key: 'addReservedPeer', value: function addReservedPeer(

    enode) {
      return this._provider.
      send('parity_addReservedPeer', enode);
    } }, { key: 'chainStatus', value: function chainStatus()

    {
      return this._provider.
      send('parity_chainStatus').
      then(_output.outChainStatus);
    } }, { key: 'changePassword', value: function changePassword(

    account, password, newPassword) {
      return this._provider.
      send('parity_changePassword', (0, _input.inAddress)(account), password, newPassword);
    } }, { key: 'changeVault', value: function changeVault(

    account, vaultName) {
      return this._provider.
      send('parity_changeVault', (0, _input.inAddress)(account), vaultName);
    } }, { key: 'changeVaultPassword', value: function changeVaultPassword(

    vaultName, password) {
      return this._provider.
      send('parity_changeVaultPassword', vaultName, password);
    } }, { key: 'checkRequest', value: function checkRequest(

    requestId) {
      return this._provider.
      send('parity_checkRequest', (0, _input.inNumber16)(requestId));
    } }, { key: 'cidV0', value: function cidV0(

    data) {
      return this._provider.
      send('parity_cidV0', (0, _input.inData)(data));
    } }, { key: 'closeVault', value: function closeVault(

    vaultName) {
      return this._provider.
      send('parity_closeVault', vaultName);
    } }, { key: 'composeTransaction', value: function composeTransaction(

    options) {
      return this._provider.
      send('parity_composeTransaction', (0, _input.inOptions)(options));
    } }, { key: 'consensusCapability', value: function consensusCapability()

    {
      return this._provider.
      send('parity_consensusCapability');
    } }, { key: 'dappsList', value: function dappsList()

    {
      return this._provider.
      send('parity_dappsList');
    } }, { key: 'dappsUrl', value: function dappsUrl()

    {
      return this._provider.
      send('parity_dappsUrl');
    } }, { key: 'decryptMessage', value: function decryptMessage(

    address, data) {
      return this._provider.
      send('parity_decryptMessage', (0, _input.inAddress)(address), (0, _input.inHex)(data));
    } }, { key: 'defaultAccount', value: function defaultAccount()

    {
      return this._provider.
      send('parity_defaultAccount').
      then(_output.outAddress);
    } }, { key: 'defaultExtraData', value: function defaultExtraData()

    {
      return this._provider.
      send('parity_defaultExtraData');
    } }, { key: 'devLogs', value: function devLogs()

    {
      return this._provider.
      send('parity_devLogs');
    } }, { key: 'devLogsLevels', value: function devLogsLevels()

    {
      return this._provider.
      send('parity_devLogsLevels');
    } }, { key: 'deriveAddressHash', value: function deriveAddressHash(

    address, password, hash, shouldSave) {
      return this._provider.
      send('parity_deriveAddressHash', (0, _input.inAddress)(address), password, (0, _input.inDeriveHash)(hash), !!shouldSave).
      then(_output.outAddress);
    } }, { key: 'deriveAddressIndex', value: function deriveAddressIndex(

    address, password, index, shouldSave) {
      return this._provider.
      send('parity_deriveAddressIndex', (0, _input.inAddress)(address), password, (0, _input.inDeriveIndex)(index), !!shouldSave).
      then(_output.outAddress);
    } }, { key: 'dropNonReservedPeers', value: function dropNonReservedPeers()

    {
      return this._provider.
      send('parity_dropNonReservedPeers');
    } }, { key: 'enode', value: function enode()

    {
      return this._provider.
      send('parity_enode');
    } }, { key: 'encryptMessage', value: function encryptMessage(

    pubkey, data) {
      return this._provider.
      send('parity_encryptMessage', (0, _input.inHex)(pubkey), (0, _input.inHex)(data));
    } }, { key: 'executeUpgrade', value: function executeUpgrade()

    {
      return this._provider.
      send('parity_executeUpgrade');
    } }, { key: 'exportAccount', value: function exportAccount(

    address, password) {
      return this._provider.
      send('parity_exportAccount', (0, _input.inAddress)(address), password);
    } }, { key: 'extraData', value: function extraData()

    {
      return this._provider.
      send('parity_extraData');
    } }, { key: 'futureTransactions', value: function futureTransactions()

    {
      return this._provider.
      send('parity_futureTransactions');
    } }, { key: 'gasCeilTarget', value: function gasCeilTarget()

    {
      return this._provider.
      send('parity_gasCeilTarget').
      then(_output.outNumber);
    } }, { key: 'gasFloorTarget', value: function gasFloorTarget()

    {
      return this._provider.
      send('parity_gasFloorTarget').
      then(_output.outNumber);
    } }, { key: 'gasPriceHistogram', value: function gasPriceHistogram()

    {
      return this._provider.
      send('parity_gasPriceHistogram').
      then(_output.outHistogram);
    } }, { key: 'generateSecretPhrase', value: function generateSecretPhrase()

    {
      return this._provider.
      send('parity_generateSecretPhrase');
    } }, { key: 'getBlockHeaderByNumber', value: function getBlockHeaderByNumber()

    {var blockNumber = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'latest';
      return this._provider.
      send('parity_getBlockHeaderByNumber', (0, _input.inBlockNumber)(blockNumber)).
      then(_output.outBlock);
    } }, { key: 'getDappAddresses', value: function getDappAddresses(

    dappId) {
      return this._provider.
      send('parity_getDappAddresses', dappId).
      then(_output.outAddresses);
    } }, { key: 'getDappDefaultAddress', value: function getDappDefaultAddress(

    dappId) {
      return this._provider.
      send('parity_getDappDefaultAddress', dappId).
      then(_output.outAddress);
    } }, { key: 'getNewDappsAddresses', value: function getNewDappsAddresses()

    {
      return this._provider.
      send('parity_getNewDappsAddresses').
      then(function (addresses) {return addresses ? addresses.map(_output.outAddress) : null;});
    } }, { key: 'getNewDappsDefaultAddress', value: function getNewDappsDefaultAddress()

    {
      return this._provider.
      send('parity_getNewDappsDefaultAddress').
      then(_output.outAddress);
    } }, { key: 'getVaultMeta', value: function getVaultMeta(

    vaultName) {
      return this._provider.
      send('parity_getVaultMeta', vaultName).
      then(_output.outVaultMeta);
    } }, { key: 'hardwareAccountsInfo', value: function hardwareAccountsInfo()

    {
      return this._provider.
      send('parity_hardwareAccountsInfo').
      then(_output.outHwAccountInfo);
    } }, { key: 'hashContent', value: function hashContent(

    url) {
      return this._provider.
      send('parity_hashContent', url);
    } }, { key: 'importGethAccounts', value: function importGethAccounts(

    accounts) {
      return this._provider.
      send('parity_importGethAccounts', (0, _input.inAddresses)(accounts)).
      then(_output.outAddresses);
    } }, { key: 'killAccount', value: function killAccount(

    account, password) {
      return this._provider.
      send('parity_killAccount', (0, _input.inAddress)(account), password);
    } }, { key: 'listAccounts', value: function listAccounts(

    count) {var offset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;var blockNumber = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'latest';
      return this._provider.
      send('parity_listAccounts', count, (0, _input.inAddress)(offset), (0, _input.inBlockNumber)(blockNumber)).
      then(function (accounts) {return (accounts || []).map(_output.outAddress);});
    } }, { key: 'listOpenedVaults', value: function listOpenedVaults()

    {
      return this._provider.
      send('parity_listOpenedVaults');
    } }, { key: 'listVaults', value: function listVaults()

    {
      return this._provider.
      send('parity_listVaults');
    } }, { key: 'listRecentDapps', value: function listRecentDapps()

    {
      return this._provider.
      send('parity_listRecentDapps').
      then(_output.outRecentDapps);
    } }, { key: 'listStorageKeys', value: function listStorageKeys(

    address, count) {var hash = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;var blockNumber = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'latest';
      return this._provider.
      send('parity_listStorageKeys', (0, _input.inAddress)(address), count, (0, _input.inHex)(hash), (0, _input.inBlockNumber)(blockNumber));
    } }, { key: 'removeAddress', value: function removeAddress(

    address) {
      return this._provider.
      send('parity_removeAddress', (0, _input.inAddress)(address));
    } }, { key: 'listGethAccounts', value: function listGethAccounts()

    {
      return this._provider.
      send('parity_listGethAccounts').
      then(_output.outAddresses);
    } }, { key: 'localTransactions', value: function localTransactions()

    {
      return this._provider.
      send('parity_localTransactions').
      then(function (transactions) {
        Object.values(transactions).
        filter(function (tx) {return tx.transaction;}).
        forEach(function (tx) {
          tx.transaction = (0, _output.outTransaction)(tx.transaction);
        });
        return transactions;
      });
    } }, { key: 'minGasPrice', value: function minGasPrice()

    {
      return this._provider.
      send('parity_minGasPrice').
      then(_output.outNumber);
    } }, { key: 'mode', value: function mode()

    {
      return this._provider.
      send('parity_mode');
    }

    // DEPRECATED - use chain instead.
  }, { key: 'netChain', value: function netChain() {
      return this._provider.
      send('parity_chain');
    } }, { key: 'nodeKind', value: function nodeKind()

    {
      return this._provider.
      send('parity_nodeKind').
      then(_output.outNodeKind);
    } }, { key: 'chain', value: function chain()

    {
      return this._provider.
      send('parity_chain');
    } }, { key: 'netPeers', value: function netPeers()

    {
      return this._provider.
      send('parity_netPeers').
      then(_output.outPeers);
    } }, { key: 'netMaxPeers', value: function netMaxPeers()

    {
      return this._provider.
      send('parity_netMaxPeers').
      then(_output.outNumber);
    } }, { key: 'netPort', value: function netPort()

    {
      return this._provider.
      send('parity_netPort').
      then(_output.outNumber);
    } }, { key: 'newAccountFromPhrase', value: function newAccountFromPhrase(

    phrase, password) {
      return this._provider.
      send('parity_newAccountFromPhrase', phrase, password).
      then(_output.outAddress);
    } }, { key: 'newAccountFromSecret', value: function newAccountFromSecret(

    secret, password) {
      return this._provider.
      send('parity_newAccountFromSecret', (0, _input.inHex)(secret), password).
      then(_output.outAddress);
    } }, { key: 'newAccountFromWallet', value: function newAccountFromWallet(

    json, password) {
      return this._provider.
      send('parity_newAccountFromWallet', json, password).
      then(_output.outAddress);
    } }, { key: 'newVault', value: function newVault(

    vaultName, password) {
      return this._provider.
      send('parity_newVault', vaultName, password);
    } }, { key: 'nextNonce', value: function nextNonce(

    account) {
      return this._provider.
      send('parity_nextNonce', (0, _input.inAddress)(account)).
      then(_output.outNumber);
    } }, { key: 'nodeName', value: function nodeName()

    {
      return this._provider.
      send('parity_nodeName');
    } }, { key: 'openVault', value: function openVault(

    vaultName, password) {
      return this._provider.
      send('parity_openVault', vaultName, password);
    } }, { key: 'pendingTransactions', value: function pendingTransactions()

    {
      return this._provider.
      send('parity_pendingTransactions').
      then(function (data) {return data.map(_output.outTransaction);});
    } }, { key: 'pendingTransactionsStats', value: function pendingTransactionsStats()

    {
      return this._provider.
      send('parity_pendingTransactionsStats');
    } }, { key: 'phraseToAddress', value: function phraseToAddress(

    phrase) {
      return this._provider.
      send('parity_phraseToAddress', phrase).
      then(_output.outAddress);
    } }, { key: 'postSign', value: function postSign(

    address, hash) {
      return this._provider.
      send('parity_postSign', (0, _input.inAddress)(address), (0, _input.inHex)(hash));
    } }, { key: 'postTransaction', value: function postTransaction()

    {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      return this._provider.
      send('parity_postTransaction', (0, _input.inOptions)(options));
    } }, { key: 'registryAddress', value: function registryAddress()

    {
      return this._provider.
      send('parity_registryAddress').
      then(_output.outAddress);
    } }, { key: 'releasesInfo', value: function releasesInfo()

    {
      return this._provider.
      send('parity_releasesInfo');
    } }, { key: 'removeReservedPeer', value: function removeReservedPeer(

    enode) {
      return this._provider.
      send('parity_removeReservedPeer', enode);
    } }, { key: 'removeTransaction', value: function removeTransaction(

    hash) {
      return this._provider.
      send('parity_removeTransaction', (0, _input.inHex)(hash)).
      then(_output.outTransaction);
    } }, { key: 'rpcSettings', value: function rpcSettings()

    {
      return this._provider.
      send('parity_rpcSettings');
    } }, { key: 'setAccountName', value: function setAccountName(

    address, name) {
      return this._provider.
      send('parity_setAccountName', (0, _input.inAddress)(address), name);
    } }, { key: 'setAccountMeta', value: function setAccountMeta(

    address, meta) {
      return this._provider.
      send('parity_setAccountMeta', (0, _input.inAddress)(address), JSON.stringify(meta));
    } }, { key: 'setAuthor', value: function setAuthor(

    address) {
      return this._provider.
      send('parity_setAuthor', (0, _input.inAddress)(address));
    } }, { key: 'setDappAddresses', value: function setDappAddresses(

    dappId, addresses) {
      return this._provider.
      send('parity_setDappAddresses', dappId, (0, _input.inAddresses)(addresses));
    } }, { key: 'setDappDefaultAddress', value: function setDappDefaultAddress(

    dappId, address) {
      return this._provider.
      send('parity_setDappDefaultAddress', dappId, address ? (0, _input.inAddress)(address) : null);
    } }, { key: 'setEngineSigner', value: function setEngineSigner(

    address, password) {
      return this._provider.
      send('parity_setEngineSigner', (0, _input.inAddress)(address), password);
    } }, { key: 'setExtraData', value: function setExtraData(

    data) {
      return this._provider.
      send('parity_setExtraData', (0, _input.inData)(data));
    } }, { key: 'setGasCeilTarget', value: function setGasCeilTarget(

    quantity) {
      return this._provider.
      send('parity_setGasCeilTarget', (0, _input.inNumber16)(quantity));
    } }, { key: 'setGasFloorTarget', value: function setGasFloorTarget(

    quantity) {
      return this._provider.
      send('parity_setGasFloorTarget', (0, _input.inNumber16)(quantity));
    } }, { key: 'setMaxTransactionGas', value: function setMaxTransactionGas(

    quantity) {
      return this._provider.
      send('parity_setMaxTransactionGas', (0, _input.inNumber16)(quantity));
    } }, { key: 'setMinGasPrice', value: function setMinGasPrice(

    quantity) {
      return this._provider.
      send('parity_setMinGasPrice', (0, _input.inNumber16)(quantity));
    } }, { key: 'setMode', value: function setMode(

    mode) {
      return this._provider.
      send('parity_setMode', mode);
    } }, { key: 'setChain', value: function setChain(

    specName) {
      return this._provider.
      send('parity_setChain', specName);
    } }, { key: 'setNewDappsAddresses', value: function setNewDappsAddresses(

    addresses) {
      return this._provider.
      send('parity_setNewDappsAddresses', addresses ? (0, _input.inAddresses)(addresses) : null);
    } }, { key: 'setNewDappsDefaultAddress', value: function setNewDappsDefaultAddress(

    address) {
      return this._provider.
      send('parity_setNewDappsDefaultAddress', (0, _input.inAddress)(address));
    } }, { key: 'setTransactionsLimit', value: function setTransactionsLimit(

    quantity) {
      return this._provider.
      send('parity_setTransactionsLimit', (0, _input.inNumber16)(quantity));
    } }, { key: 'setVaultMeta', value: function setVaultMeta(

    vaultName, meta) {
      return this._provider.
      send('parity_setVaultMeta', vaultName, JSON.stringify(meta));
    } }, { key: 'signMessage', value: function signMessage(

    address, password, messageHash) {
      return this._provider.
      send('parity_signMessage', (0, _input.inAddress)(address), password, (0, _input.inHex)(messageHash));
    } }, { key: 'testPassword', value: function testPassword(

    account, password) {
      return this._provider.
      send('parity_testPassword', (0, _input.inAddress)(account), password);
    } }, { key: 'transactionsLimit', value: function transactionsLimit()

    {
      return this._provider.
      send('parity_transactionsLimit').
      then(_output.outNumber);
    } }, { key: 'unsignedTransactionsCount', value: function unsignedTransactionsCount()

    {
      return this._provider.
      send('parity_unsignedTransactionsCount').
      then(_output.outNumber);
    } }, { key: 'upgradeReady', value: function upgradeReady()

    {
      return this._provider.
      send('parity_upgradeReady');
    } }, { key: 'versionInfo', value: function versionInfo()

    {
      return this._provider.
      send('parity_versionInfo');
    } }, { key: 'wsUrl', value: function wsUrl()

    {
      return this._provider.
      send('parity_wsUrl');
    } }]);return Parity;}();exports.default = Parity;module.exports = exports['default'];