'use strict';var _chai = require('chai');
var _sinon = require('sinon');var _sinon2 = _interopRequireDefault(_sinon);

var _jsonRpcBase = require('./jsonRpcBase');var _jsonRpcBase2 = _interopRequireDefault(_jsonRpcBase);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

var base = new _jsonRpcBase2.default();

describe('api/transport/JsonRpcBase', function () {
  describe('encode', function () {
    it('encodes the body correctly, incrementing id', function () {
      var id = base.id;
      var bdy = base.encode('someMethod', ['param1', 'param2']);
      var enc = '{"jsonrpc":"2.0","method":"someMethod","params":["param1","param2"],"id":' + id + '}';

      (0, _chai.expect)(bdy).to.equal(enc);
      (0, _chai.expect)(base.id - id).to.equal(1);
    });
  });

  describe('setDebug', function () {
    it('starts with disabled flag', function () {
      (0, _chai.expect)(base.isDebug).to.be.false;
    });

    it('true flag switches on', function () {
      base.setDebug(true);
      (0, _chai.expect)(base.isDebug).to.be.true;
    });

    it('false flag switches off', function () {
      base.setDebug(true);
      (0, _chai.expect)(base.isDebug).to.be.true;
      base.setDebug(false);
      (0, _chai.expect)(base.isDebug).to.be.false;
    });

    describe('logging', function () {
      beforeEach(function () {
        _sinon2.default.spy(console, 'log');
        _sinon2.default.spy(console, 'error');
      });

      afterEach(function () {
        console.log.restore();
        console.error.restore();
      });

      it('does not log errors with flag off', function () {
        base.setDebug(false);
        base.log('error');
        (0, _chai.expect)(console.log).to.not.be;
      });

      it('does not log errors with flag off', function () {
        base.setDebug(false);
        base.error('error');
        (0, _chai.expect)(console.error).to.not.be;
      });

      it('does log errors with flag on', function () {
        base.setDebug(true);
        base.log('error');
        (0, _chai.expect)(console.log).to.be;
      });

      it('does log errors with flag on', function () {
        base.setDebug(true);
        base.error('error');
        (0, _chai.expect)(console.error).to.be;
      });
    });
  });
});