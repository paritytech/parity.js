'use strict';Object.defineProperty(exports, "__esModule", { value: true });exports.TEST_WS_URL = exports.TEST_HTTP_URL = undefined;exports.





mockHttp = mockHttp;exports.























mockWs = mockWs;exports.




























endpointTest = endpointTest;var _nock = require('nock');var _nock2 = _interopRequireDefault(_nock);var _mockSocket = require('mock-socket');function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var TEST_HTTP_URL = exports.TEST_HTTP_URL = 'http://localhost:6688';var TEST_WS_URL = exports.TEST_WS_URL = 'ws://localhost:8866';function mockHttp(requests) {_nock2.default.cleanAll();var scope = (0, _nock2.default)(TEST_HTTP_URL);requests.forEach(function (request, index) {scope = scope.post('/').reply(request.code || 200, function (uri, body) {if (body.method !== request.method) {return { error: 'Invalid method ' + body.method + ', expected ' + request.method };}scope.body = scope.body || {};scope.body[request.method] = body;return request.reply;});});return scope;}function mockWs(requests) {var mockServer = new _mockSocket.Server(TEST_WS_URL);var scope = { requests: 0, body: {}, server: mockServer };scope.isDone = function () {return scope.requests === requests.length;};scope.stop = function () {if (mockServer) {mockServer.stop();mockServer = null;}};mockServer.on('message', function (_body) {var body = JSON.parse(_body);var request = requests[scope.requests];var reply = request.reply;var response = reply.error ? { id: body.id, error: { code: reply.error.code, message: reply.error.message } } : { id: body.id, result: reply };scope.body[request.method] = body;scope.requests++;mockServer.send(JSON.stringify(response));});return scope;}function endpointTest(instance, moduleId, name) {
  describe(name, function () {
    it('has the ' + moduleId + '.' + name + ' endpoint', function () {
      expect(typeof instance[moduleId][name] === 'function').to.be.ok;
    });

    it('maps to ' + moduleId + '_' + name + ' via RPC', function () {
      var scope = mockHttp([{ method: moduleId + '_' + name, reply: {} }]);

      return instance[moduleId][name]().
      then(function () {
        expect(scope.isDone()).to.be.true;
      }).
      catch(function () {
        _nock2.default.cleanAll();
      });
    });
  });
}