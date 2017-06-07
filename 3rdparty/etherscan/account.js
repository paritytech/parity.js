'use strict';Object.defineProperty(exports, "__esModule", { value: true });exports.account = undefined;















var _bignumber = require('bignumber.js');var _bignumber2 = _interopRequireDefault(_bignumber);

var _util = require('../../api/util');var _util2 = _interopRequireDefault(_util);
var _call2 = require('./call');function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

var PAGE_SIZE = 25; // Copyright 2015-2017 Parity Technologies (UK) Ltd.
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
function _call(method, params, test, netVersion) {return (0, _call2.call)('account', method, params, test, netVersion);}function balance(address, test, netVersion) {return _call('balance', { address: address, tag: 'latest' }, test, netVersion).then(function (balance) {// same format as balancemulti below
    return { account: address,
      balance: balance };

  });
}

function balances(addresses, test, netVersion) {
  return _call('balancemulti', {
    address: addresses.join(','),
    tag: 'latest' },
  test, netVersion);
}

function transactions(address, page, test, netVersion) {
  // page offset from 0
  return _call('txlist', {
    address: address,
    offset: PAGE_SIZE,
    page: (page || 0) + 1,
    sort: 'desc' },
  test, netVersion).then(function (transactions) {
    return transactions.map(function (tx) {
      return {
        blockNumber: new _bignumber2.default(tx.blockNumber || 0),
        from: _util2.default.toChecksumAddress(tx.from),
        hash: tx.hash,
        timeStamp: tx.timeStamp,
        to: _util2.default.toChecksumAddress(tx.to),
        value: tx.value };

    });
  });
}

var account = {
  balance: balance,
  balances: balances,
  transactions: transactions };exports.


account = account;