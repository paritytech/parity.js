'use strict';















var _chai = require('chai');var _chai2 = _interopRequireDefault(_chai);
var _sinonChai = require('sinon-chai');var _sinonChai2 = _interopRequireDefault(_sinonChai);
var _mochaWrap = require('mocha-wrap');var _mochaWrap2 = _interopRequireDefault(_mochaWrap);
var _sinon = require('sinon');var _sinon2 = _interopRequireDefault(_sinon);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };} // Copyright 2015-2017 Parity Technologies (UK) Ltd.
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
_chai2.default.use(_sinonChai2.default);var TEST_ADDRESS = '0x63Cf90D3f0410092FC0fca41846f596223979195';var mockWindow = { location: { href: 'test/url' } };global.location = {
  href: 'test/url' };


global.navigator = {
  userAgent: 'node.js' };


var Ledger = void 0;

var api = void 0;
var ledger = void 0;
var vendor = void 0;

function createApi() {
  api = {
    net: {
      version: _sinon2.default.stub().resolves('2') } };



  return api;
}

function createVendor() {var error = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
  vendor = {
    getAddress: function getAddress(path, callback) {
      callback({
        address: TEST_ADDRESS },
      error);
    },
    getAppConfiguration: function getAppConfiguration(callback) {
      callback({}, error);
    },
    signTransaction: function signTransaction(path, rawTransaction, callback) {
      callback({
        v: [39],
        r: [0],
        s: [0] },
      error);
    } };


  return vendor;
}

function create(error) {
  ledger = new Ledger(createApi(), createVendor(error));

  return ledger;
}

(0, _mochaWrap2.default)().withGlobal('window', function () {return mockWindow;}).describe('3rdparty/ledger', function () {
  beforeEach(function () {
    Ledger = require('./');
    create();

    _sinon2.default.spy(vendor, 'getAddress');
    _sinon2.default.spy(vendor, 'getAppConfiguration');
    _sinon2.default.spy(vendor, 'signTransaction');
  });

  afterEach(function () {
    vendor.getAddress.restore();
    vendor.getAppConfiguration.restore();
    vendor.signTransaction.restore();
  });

  describe('getAppConfiguration', function () {
    beforeEach(function () {
      return ledger.getAppConfiguration();
    });

    it('calls into getAppConfiguration', function () {
      (0, _chai.expect)(vendor.getAppConfiguration).to.have.been.called;
    });
  });

  describe('scan', function () {
    beforeEach(function () {
      return ledger.scan();
    });

    it('calls into getAddress', function () {
      (0, _chai.expect)(vendor.getAddress).to.have.been.called;
    });
  });

  describe('signTransaction', function () {
    beforeEach(function () {
      return ledger.signTransaction({
        data: '0x0',
        gasPrice: 20000000,
        gasLimit: 1000000,
        nonce: 2,
        to: '0x63Cf90D3f0410092FC0fca41846f596223979195',
        value: 1 });

    });

    it('retrieves chainId via API', function () {
      (0, _chai.expect)(api.net.version).to.have.been.called;
    });

    it('calls into signTransaction', function () {
      (0, _chai.expect)(vendor.signTransaction).to.have.been.called;
    });
  });
});