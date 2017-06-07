'use strict';Object.defineProperty(exports, "__esModule", { value: true });exports.postToServer = exports.hasReceivedCode = exports.isServerRunning = undefined;















var _querystring = require('querystring');

var isServerRunning = exports.isServerRunning = function isServerRunning() {var isTestnet = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
  var port = isTestnet ? 8443 : 443;

  return fetch('https://sms-verification.parity.io:' + port + '/health', {
    mode: 'cors',
    cache: 'no-store' }).

  then(function (res) {
    return res.ok;
  }).
  catch(function () {
    return false;
  });
}; // Copyright 2015-2017 Parity Technologies (UK) Ltd.
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
var hasReceivedCode = exports.hasReceivedCode = function hasReceivedCode(number, address) {var isTestnet = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;var port = isTestnet ? 8443 : 443;var query = (0, _querystring.stringify)({ number: number, address: address });return fetch('https://sms-verification.parity.io:' + port + '/?' + query, { mode: 'cors', cache: 'no-store' }).then(function (res) {return res.ok;}).
  catch(function () {
    return false; // todo: check for 404
  });
};

var postToServer = exports.postToServer = function postToServer(query) {var isTestnet = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  var port = isTestnet ? 8443 : 443;

  query = (0, _querystring.stringify)(query);

  return fetch('https://sms-verification.parity.io:' + port + '/?' + query, {
    method: 'POST',
    mode: 'cors',
    cache: 'no-store' }).

  then(function (res) {
    return res.json().then(function (data) {
      if (res.ok) {
        return data.message;
      }
      throw new Error(data.message || 'unknown error');
    });
  });
};