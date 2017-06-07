'use strict';















var _chai = require('chai');

var helpers = require('./helpers.spec.js'); // Copyright 2015-2017 Parity Technologies (UK) Ltd.
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
var ShapeShift = require('./');var initShapeshift = ShapeShift.default || ShapeShift;var mockget = helpers.mockget;var mockpost = helpers.mockpost;describe('shapeshift/rpc', function () {var rpc = void 0;var shapeshift = void 0;beforeEach(function () {
    shapeshift = initShapeshift(helpers.APIKEY);
    rpc = shapeshift.getRpc();
  });

  describe('GET', function () {
    var REPLY = { test: 'this is some result' };

    var scope = void 0;
    var result = void 0;

    beforeEach(function () {
      scope = mockget(shapeshift, [{ path: 'test', reply: REPLY }]);

      return rpc.
      get('test').
      then(function (_result) {
        result = _result;
      });
    });

    it('does GET', function () {
      (0, _chai.expect)(scope.isDone()).to.be.true;
    });

    it('retrieves the info', function () {
      (0, _chai.expect)(result).to.deep.equal(REPLY);
    });
  });

  describe('POST', function () {
    var REPLY = { test: 'this is some result' };

    var scope = void 0;
    var result = void 0;

    beforeEach(function () {
      scope = mockpost(shapeshift, [{ path: 'test', reply: REPLY }]);

      return rpc.
      post('test', { input: 'stuff' }).
      then(function (_result) {
        result = _result;
      });
    });

    it('does POST', function () {
      (0, _chai.expect)(scope.isDone()).to.be.true;
    });

    it('retrieves the info', function () {
      (0, _chai.expect)(result).to.deep.equal(REPLY);
    });

    it('passes the input object', function () {
      (0, _chai.expect)(scope.body.test.input).to.equal('stuff');
    });

    it('passes the apikey specified', function () {
      (0, _chai.expect)(scope.body.test.apiKey).to.equal(helpers.APIKEY);
    });
  });
});