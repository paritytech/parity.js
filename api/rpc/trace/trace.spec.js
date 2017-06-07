'use strict';var _chai = require('chai');
var _mockRpc = require('../mockRpc');

var _provider = require('../../provider');
var _trace = require('./trace');var _trace2 = _interopRequireDefault(_trace);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

var instance = new _trace2.default(new _provider.PromiseWrapper(new _provider.Http(_mockRpc.TEST_HTTP_URL, -1)));

describe('api/rpc/Trace', function () {
  var scope = void 0;

  describe('block', function () {
    beforeEach(function () {
      scope = (0, _mockRpc.mockHttp)([{ method: 'trace_block', reply: { result: [] } }]);
    });

    it('assumes latest blockNumber when not specified', function () {
      return instance.block().then(function () {
        (0, _chai.expect)(scope.body.trace_block.params).to.deep.equal(['latest']);
      });
    });

    it('passed specified blockNumber', function () {
      return instance.block(0x123).then(function () {
        (0, _chai.expect)(scope.body.trace_block.params).to.deep.equal(['0x123']);
      });
    });
  });
});