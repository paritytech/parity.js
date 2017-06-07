'use strict';Object.defineProperty(exports, "__esModule", { value: true });var _createClass = function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};}();function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}var Personal = function () {
  function Personal(updateSubscriptions, api, subscriber) {var _this = this;_classCallCheck(this, Personal);this.




























    _defaultAccount = function () {var timerDisabled = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      var nextTimeout = function nextTimeout() {var timeout = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1000;
        if (!timerDisabled) {
          _this._pollTimerId = setTimeout(function () {
            _this._defaultAccount();
          }, timeout);
        }
      };

      if (!_this._api.transport.isConnected) {
        nextTimeout(500);
        return;
      }

      return _this._api.parity.
      defaultAccount().
      then(function (defaultAccount) {
        if (_this._lastDefaultAccount !== defaultAccount) {
          _this._lastDefaultAccount = defaultAccount;
          _this._updateSubscriptions('parity_defaultAccount', null, defaultAccount);
        }

        nextTimeout();
      }).
      catch(function () {return nextTimeout();});
    };this.

    _listAccounts = function () {
      return _this._api.eth.
      accounts().
      then(function (accounts) {
        _this._updateSubscriptions('eth_accounts', null, accounts);
      });
    };this.

    _accountsInfo = function () {
      return _this._api.parity.
      accountsInfo().
      then(function (info) {
        _this._updateSubscriptions('parity_accountsInfo', null, info);

        return _this._api.parity.
        allAccountsInfo().
        catch(function () {
          // NOTE: This fails on non-secure APIs, swallow error
          return {};
        }).
        then(function (allInfo) {
          _this._updateSubscriptions('parity_allAccountsInfo', null, allInfo);
        });
      });
    };this._subscriber = subscriber;this._api = api;this._updateSubscriptions = updateSubscriptions;this._started = false;this._lastDefaultAccount = '0x0';this._pollTimerId = null;}_createClass(Personal, [{ key: 'start', value: function start() {this._started = true;return Promise.all([this._defaultAccount(), this._listAccounts(), this._accountsInfo(), this._loggingSubscribe()]);} // FIXME: Because of the different API instances, the "wait for valid changes" approach
    // doesn't work. Since the defaultAccount is critical to operation, we poll in exactly
    // same way we do in ../eth (ala eth_blockNumber) and update. This should be moved
    // to pub-sub as it becomes available
  }, { key: '_loggingSubscribe', value: function _loggingSubscribe() {var _this2 = this;return this._subscriber.subscribe('logging', function (error, data) {if (error || !data) {
          return;
        }

        switch (data.method) {
          case 'parity_closeVault':
          case 'parity_openVault':
          case 'parity_killAccount':
          case 'parity_importGethAccounts':
          case 'parity_newAccountFromPhrase':
          case 'parity_newAccountFromWallet':
          case 'personal_newAccount':
            _this2._defaultAccount(true);
            _this2._listAccounts();
            _this2._accountsInfo();
            return;

          case 'parity_removeAddress':
          case 'parity_setAccountName':
          case 'parity_setAccountMeta':
            _this2._accountsInfo();
            return;

          case 'parity_setDappAddresses':
          case 'parity_setDappDefaultAddress':
          case 'parity_setNewDappsAddresses':
          case 'parity_setNewDappsDefaultAddress':
            _this2._defaultAccount(true);
            _this2._listAccounts();
            return;

          default:
            return;}

      });
    } }, { key: 'isStarted', get: function get() {return this._started;} }]);return Personal;}();exports.default = Personal;module.exports = exports['default'];