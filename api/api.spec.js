'use strict';var _chai = require('chai');
var _jsonrpc = require('../jsonrpc');var _jsonrpc2 = _interopRequireDefault(_jsonrpc);
var _nock = require('nock');var _nock2 = _interopRequireDefault(_nock);

var _util = require('./util');var _util2 = _interopRequireDefault(_util);
var _ = require('./');var _2 = _interopRequireDefault(_);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

var TEST_HTTP_URL = 'http://localhost:6688';

describe('api/Api', function () {
  describe('constructor', function () {
    it('requires defined/non-null provider object', function () {
      (0, _chai.expect)(function () {return new _2.default();}).to.throw(/Api needs provider/);
      (0, _chai.expect)(function () {return new _2.default(null);}).to.throw(/Api needs provider/);
    });

    it('requires an send function on the transport object', function () {
      (0, _chai.expect)(function () {return new _2.default({});}).to.throw(/Api needs provider/);
      (0, _chai.expect)(function () {return new _2.default({ send: true });}).to.throw(/Api needs provider/);
    });
  });

  describe('interface', function () {
    var api = new _2.default(new _2.default.Provider.Http(TEST_HTTP_URL, -1));

    Object.keys(_jsonrpc2.default).sort().forEach(function (endpoint) {
      describe(endpoint, function () {
        Object.keys(_jsonrpc2.default[endpoint]).sort().forEach(function (method) {
          endpointTest(api, endpoint, method);
        });
      });
    });
  });

  it('exposes util as static property', function () {
    (0, _chai.expect)(_2.default.util).to.equal(_util2.default);
  });
});

function endpointTest(instance, moduleId, name) {
  describe(name, function () {
    it('has the ' + moduleId + '.' + name + ' endpoint', function () {
      (0, _chai.expect)(typeof instance[moduleId][name] === 'function').to.be.ok;
    });

    it('maps to ' + moduleId + '_' + name + ' via RPC', function () {
      var scope = mockHttp([{ method: moduleId + '_' + name, reply: {} }]);

      return instance[moduleId][name]().
      then(function () {
        (0, _chai.expect)(scope.isDone()).to.be.true;
      }).
      catch(function () {
        _nock2.default.cleanAll();
      });
    });
  });
}

function mockHttp(requests) {
  _nock2.default.cleanAll();
  var scope = (0, _nock2.default)(TEST_HTTP_URL);

  requests.forEach(function (request, index) {
    scope = scope.
    post('/').
    reply(request.code || 200, function (uri, body) {
      if (body.method !== request.method) {
        return {
          error: 'Invalid method ' + body.method + ', expected ' + request.method };

      }

      scope.body = scope.body || {};
      scope.body[request.method] = body;

      return request.reply;
    });
  });

  return scope;
}