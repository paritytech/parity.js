'use strict';Object.defineProperty(exports, "__esModule", { value: true });exports.default =


















function (apikey) {
  return (0, _shapeshift2.default)((0, _rpc2.default)(apikey));
};var _rpc = require('./rpc');var _rpc2 = _interopRequireDefault(_rpc);var _shapeshift = require('./shapeshift');var _shapeshift2 = _interopRequireDefault(_shapeshift);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}module.exports = exports['default']; // Copyright 2015-2017 Parity Technologies (UK) Ltd.
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