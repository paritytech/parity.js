'use strict';var _chai = require('chai');
var _mockRpc = require('../mockRpc');
var _ws = require('./ws');var _ws2 = _interopRequireDefault(_ws);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

describe('api/transport/Ws', function () {
  var transport = void 0;
  var scope = void 0;

  describe('transport emitter', function () {
    var connect = function connect() {
      var scope = (0, _mockRpc.mockWs)();
      var transport = new _ws2.default(_mockRpc.TEST_WS_URL);

      return { transport: transport, scope: scope };
    };

    it('emits open event', function (done) {var _connect =
      connect(),transport = _connect.transport,scope = _connect.scope;

      transport.once('open', function () {
        done();
      });

      scope.stop();
    });

    it('emits close event', function (done) {var _connect2 =
      connect(),transport = _connect2.transport,scope = _connect2.scope;

      transport.once('open', function () {
        scope.server.close();
      });

      transport.once('close', function () {
        done();
      });
    });
  });

  describe('transport', function () {
    var result = void 0;

    beforeEach(function () {
      scope = (0, _mockRpc.mockWs)([{ method: 'test_anyCall', reply: 'TestResult' }]);
      transport = new _ws2.default(_mockRpc.TEST_WS_URL);

      return transport.
      execute('test_anyCall', [1, 2, 3]).
      then(function (_result) {
        result = _result;
      });
    });

    afterEach(function () {
      scope.stop();
    });

    it('makes call', function () {
      (0, _chai.expect)(scope.isDone()).to.be.true;
    });

    it('sets jsonrpc', function () {
      (0, _chai.expect)(scope.body.test_anyCall.jsonrpc).to.equal('2.0');
    });

    it('sets the method', function () {
      (0, _chai.expect)(scope.body.test_anyCall.method).to.equal('test_anyCall');
    });

    it('passes the params', function () {
      (0, _chai.expect)(scope.body.test_anyCall.params).to.deep.equal([1, 2, 3]);
    });

    it('increments the id', function () {
      (0, _chai.expect)(scope.body.test_anyCall.id).not.to.equal(0);
    });

    it('passes the actual result back', function () {
      (0, _chai.expect)(result).to.equal('TestResult');
    });
  });

  describe('errors', function () {
    beforeEach(function () {
      scope = (0, _mockRpc.mockWs)([{ method: 'test_anyCall', reply: { error: { code: 1, message: 'TestError' } } }]);
      transport = new _ws2.default(_mockRpc.TEST_WS_URL);
    });

    afterEach(function () {
      scope.stop();
    });

    it('returns RPC errors when encountered', function () {
      return transport.
      execute('test_anyCall').
      catch(function (error) {
        (0, _chai.expect)(error).to.match(/TestError/);
      });
    });
  });
});