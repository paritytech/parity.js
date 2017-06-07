'use strict';Object.defineProperty(exports, "__esModule", { value: true }); // Copyright 2015-2017 Parity Technologies (UK) Ltd.
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

// NOTE: Keep 'isTestnet' for backwards library compatibility
var getUrlPrefix = function getUrlPrefix() {var isTestnet = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;var netVersion = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '0';var defaultPrefix = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
  if (isTestnet) {
    return 'ropsten.';
  }

  switch (netVersion) {
    case '1':
      return defaultPrefix;

    case '3':
      return 'ropsten.';

    case '4':
      return 'rinkeby.';

    case '42':
      return 'kovan.';

    default:
      return 'testnet.';}

};

var url = exports.url = function url() {var isTestnet = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;var netVersion = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '0';var defaultPrefix = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
  return 'https://' + getUrlPrefix(isTestnet, netVersion, defaultPrefix) + 'etherscan.io';
};

var txLink = exports.txLink = function txLink(hash) {var isTestnet = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;var netVersion = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '0';
  return url(isTestnet, netVersion) + '/tx/' + hash;
};

var addressLink = exports.addressLink = function addressLink(address) {var isTestnet = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;var netVersion = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '0';
  return url(isTestnet, netVersion) + '/address/' + address;
};

var apiLink = exports.apiLink = function apiLink(query) {var isTestnet = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;var netVersion = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '0';
  return url(isTestnet, netVersion, 'api.') + '/api?' + query;
};