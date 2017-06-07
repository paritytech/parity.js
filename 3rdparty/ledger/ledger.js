'use strict';Object.defineProperty(exports, "__esModule", { value: true });exports.LEDGER_PATH_ETH = exports.LEDGER_PATH_ETC = undefined;var _createClass = function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};}(); // Copyright 2015-2017 Parity Technologies (UK) Ltd.
// This file is part of Parity.

// Parity is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.

// Parity is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.

// You should have received a copy of the GNU General Public License
// along with Parity.  If not, see <http://www.gnu.org/licenses/>.

require('u2f-api-polyfill');

var _bignumber = require('bignumber.js');var _bignumber2 = _interopRequireDefault(_bignumber);
var _ethereumjsTx = require('ethereumjs-tx');var _ethereumjsTx2 = _interopRequireDefault(_ethereumjsTx);
var _u2fApi = require('u2f-api');var _u2fApi2 = _interopRequireDefault(_u2fApi);

var _ledger = require('./vendor/ledger3');var _ledger2 = _interopRequireDefault(_ledger);
var _ledgerEth = require('./vendor/ledger-eth');var _ledgerEth2 = _interopRequireDefault(_ledgerEth);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}

var LEDGER_PATH_ETC = "44’/60’/160720'/0'/0";
var LEDGER_PATH_ETH = "44'/60'/0'/0";
var SCRAMBLE_KEY = 'w0w';

function numberToHex(number) {
  return '0x' + new _bignumber2.default(number).toString(16);
}var

Ledger = function () {
  function Ledger(api, ledger) {_classCallCheck(this, Ledger);
    this._api = api;
    this._ledger = ledger;

    this._isSupported = false;

    this.checkJSSupport();
  }

  // FIXME: Until we have https support from Parity u2f will not work. Here we mark it completely
  // as unsupported until a full end-to-end environment is available.
  _createClass(Ledger, [{ key: 'checkJSSupport', value: function checkJSSupport()



    {var _this = this;
      return _u2fApi2.default.
      isSupported().
      then(function (isSupported) {
        console.log('Ledger:checkJSSupport', isSupported);

        _this._isSupported = isSupported;
      });
    } }, { key: 'getAppConfiguration', value: function getAppConfiguration()

    {var _this2 = this;
      return new Promise(function (resolve, reject) {
        _this2._ledger.getAppConfiguration(function (response, error) {
          if (error) {
            reject(error);
            return;
          }

          resolve(response);
        });
      });
    } }, { key: 'scan', value: function scan()

    {var _this3 = this;
      return new Promise(function (resolve, reject) {
        _this3._ledger.getAddress(LEDGER_PATH_ETH, function (response, error) {
          if (error) {
            reject(error);
            return;
          }

          resolve([response.address]);
        }, true, false);
      });
    } }, { key: 'signTransaction', value: function signTransaction(

    transaction) {var _this4 = this;
      return this._api.net.version().then(function (_chainId) {
        return new Promise(function (resolve, reject) {
          var chainId = new _bignumber2.default(_chainId).toNumber();
          var tx = new _ethereumjsTx2.default({
            data: transaction.data || transaction.input,
            gasPrice: numberToHex(transaction.gasPrice),
            gasLimit: numberToHex(transaction.gasLimit),
            nonce: numberToHex(transaction.nonce),
            to: transaction.to ? transaction.to.toLowerCase() : undefined,
            value: numberToHex(transaction.value),
            v: Buffer.from([chainId]), // pass the chainId to the ledger
            r: Buffer.from([]),
            s: Buffer.from([]) });

          var rawTransaction = tx.serialize().toString('hex');

          _this4._ledger.signTransaction(LEDGER_PATH_ETH, rawTransaction, function (response, error) {
            if (error) {
              reject(error);
              return;
            }

            tx.v = Buffer.from(response.v, 'hex');
            tx.r = Buffer.from(response.r, 'hex');
            tx.s = Buffer.from(response.s, 'hex');

            if (chainId !== Math.floor((tx.v[0] - 35) / 2)) {
              reject(new Error('Invalid EIP155 signature received from Ledger.'));
              return;
            }

            resolve('0x' + tx.serialize().toString('hex'));
          });
        });
      });
    } }, { key: 'isSupported', get: function get() {return false && this._isSupported;} }], [{ key: 'create', value: function create(

    api, ledger) {
      if (!ledger) {
        ledger = new _ledgerEth2.default(new _ledger2.default(SCRAMBLE_KEY));
      }

      return new Ledger(api, ledger);
    } }]);return Ledger;}();exports.default = Ledger;exports.



LEDGER_PATH_ETC = LEDGER_PATH_ETC;exports.
LEDGER_PATH_ETH = LEDGER_PATH_ETH;