'use strict';var _chai = require('chai');
var _mockRpc = require('../mockRpc');
var _http = require('./http');var _http2 = _interopRequireDefault(_http);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

var transport = new _http2.default(_mockRpc.TEST_HTTP_URL, -1);

describe('api/transport/Http', function () {
  describe('instance', function () {
    it('encodes the options correctly', function () {
      var opt = transport._encodeOptions('someMethod', ['param']);
      var enc = {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Content-Length': 65 },

        body: '{"jsonrpc":"2.0","method":"someMethod","params":["param"],"id":' + (transport._id - 1) + '}' };


      (0, _chai.expect)(opt).to.deep.equal(enc);
    });
  });

  describe('transport emitter', function () {
    it('emits close event', function (done) {
      transport.once('close', function () {
        done();
      });

      transport.execute('eth_call');
    });

    it('emits open event', function (done) {
      (0, _mockRpc.mockHttp)([{ method: 'eth_call', reply: { result: '' } }]);

      transport.once('open', function () {
        done();
      });

      transport.execute('eth_call');
    });
  });

  describe('transport', function () {
    var RESULT = ['this is some result'];

    var scope = void 0;
    var result = void 0;

    beforeEach(function () {
      scope = (0, _mockRpc.mockHttp)([{ method: 'eth_call', reply: { result: RESULT } }]);

      return transport.
      execute('eth_call', [1, 2, 3, 'test']).
      then(function (_result) {
        result = _result;
      });
    });

    it('makes POST', function () {
      (0, _chai.expect)(scope.isDone()).to.be.true;
    });

    it('sets jsonrpc', function () {
      (0, _chai.expect)(scope.body.eth_call.jsonrpc).to.equal('2.0');
    });

    it('sets the method', function () {
      (0, _chai.expect)(scope.body.eth_call.method).to.equal('eth_call');
    });

    it('passes the params', function () {
      (0, _chai.expect)(scope.body.eth_call.params).to.deep.equal([1, 2, 3, 'test']);
    });

    it('increments the id', function () {
      (0, _chai.expect)(scope.body.eth_call.id).not.to.equal(0);
    });

    it('passes the actual result back', function () {
      (0, _chai.expect)(result).to.deep.equal(RESULT);
    });
  });

  describe('HTTP errors', function () {
    var scope = void 0;
    var error = void 0;

    beforeEach(function () {
      scope = (0, _mockRpc.mockHttp)([{ method: 'eth_call', reply: {}, code: 500 }]);

      return transport.
      execute('eth_call').
      catch(function (_error) {
        error = _error;
      });
    });

    it('returns HTTP errors as throws', function () {
      (0, _chai.expect)(scope.isDone()).to.be.true;
      (0, _chai.expect)(error.message).to.match(/Internal Server Error/);
    });
  });

  describe('RPC errors', function () {
    var ERROR = { code: -1, message: 'ERROR: RPC failure' };

    var scope = void 0;
    var error = void 0;

    beforeEach(function () {
      scope = (0, _mockRpc.mockHttp)([{ method: 'eth_call', reply: { error: ERROR } }]);

      return transport.
      execute('eth_call').
      catch(function (_error) {
        error = _error;
      });
    });

    it('returns RPC errors as throws', function () {
      (0, _chai.expect)(scope.isDone()).to.be.true;
      (0, _chai.expect)(error.message).to.match(/RPC failure/);
    });
  });
});