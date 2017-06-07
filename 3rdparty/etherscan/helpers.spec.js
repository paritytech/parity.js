'use strict';Object.defineProperty(exports, "__esModule", { value: true });exports.mockget = undefined;















var _nock = require('nock');var _nock2 = _interopRequireDefault(_nock);
var _qs = require('qs');

var _links = require('./links');function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

function mockget(requests, test, netVersion) {
  var scope = (0, _nock2.default)((0, _links.url)(test, netVersion));

  requests.forEach(function (request) {
    scope = scope.
    get('/api?' + (0, _qs.stringify)(request.query)).
    reply(request.code || 200, function () {
      return { result: request.reply };
    });
  });

  return scope;
} // Copyright 2015-2017 Parity Technologies (UK) Ltd.
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
exports.mockget = mockget;