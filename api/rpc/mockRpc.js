'use strict';Object.defineProperty(exports, "__esModule", { value: true });exports.TEST_HTTP_URL = undefined;exports.



mockHttp = mockHttp;var _nock = require('nock');var _nock2 = _interopRequireDefault(_nock);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var TEST_HTTP_URL = exports.TEST_HTTP_URL = 'http://localhost:6688';function mockHttp(requests) {
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