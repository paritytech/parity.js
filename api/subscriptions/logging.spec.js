'use strict';var _chai = require('chai');var _chai2 = _interopRequireDefault(_chai);
var _sinon = require('sinon');var _sinon2 = _interopRequireDefault(_sinon);
var _sinonChai = require('sinon-chai');var _sinonChai2 = _interopRequireDefault(_sinonChai);
var _logging = require('./logging');var _logging2 = _interopRequireDefault(_logging);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

_chai2.default.use(_sinonChai2.default);

describe('api/subscriptions/logging', function () {
  var cb = void 0;
  var logging = void 0;

  beforeEach(function () {
    cb = _sinon2.default.spy();
    logging = new _logging2.default(cb);
  });

  describe('constructor', function () {
    it('starts the instance in a started state', function () {
      (0, _chai.expect)(logging.isStarted).to.be.true;
    });
  });

  describe('send', function () {
    var method = 'method';
    var params = 'params';
    var json = 'json';

    beforeEach(function () {
      _logging2.default.send(method, params, json);
    });

    it('calls the subscription update', function () {
      (0, _chai.expect)(cb).calledWith('logging', null, { method: method, params: params, json: json });
    });
  });
});