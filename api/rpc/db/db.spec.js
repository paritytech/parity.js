'use strict';var _chai = require('chai');
var _mockRpc = require('../mockRpc');

var _provider = require('../../provider');
var _db = require('./db');var _db2 = _interopRequireDefault(_db);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

var instance = new _db2.default(new _provider.PromiseWrapper(new _provider.Http(_mockRpc.TEST_HTTP_URL, -1)));

describe('api/rpc/Db', function () {
  var scope = void 0;

  describe('putHex', function () {
    beforeEach(function () {
      scope = (0, _mockRpc.mockHttp)([{ method: 'db_putHex', reply: { result: [] } }]);
    });

    it('formats the inputs correctly', function () {
      return instance.putHex('db', 'key', '1234').then(function () {
        (0, _chai.expect)(scope.body.db_putHex.params).to.deep.equal(['db', 'key', '0x1234']);
      });
    });
  });
});