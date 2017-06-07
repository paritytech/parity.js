'use strict';Object.defineProperty(exports, "__esModule", { value: true });exports.

























call = call;var _qs = require('qs');var _links = require('./links'); // Copyright 2015-2017 Parity Technologies (UK) Ltd.
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
var options = { method: 'GET', headers: { 'Accept': 'application/json' } };function call(module, action, _params, test, netVersion) {var query = (0, _qs.stringify)(Object.assign({ module: module, action: action }, _params || {}));return fetch((0, _links.apiLink)(query, test, netVersion), options).then(function (response) {if (!response.ok) {throw { code: response.status, message: response.statusText }; // eslint-disable-line
    }return response.json();}).then(function (result) {
    if (result.message === 'NOTOK') {
      throw { code: -1, message: result.result }; // eslint-disable-line
    }

    return result.result;
  });
}