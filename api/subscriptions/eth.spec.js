'use strict';var _chai = require('chai');
var _bignumber = require('bignumber.js');var _bignumber2 = _interopRequireDefault(_bignumber);
var _sinon = require('sinon');var _sinon2 = _interopRequireDefault(_sinon);

var _eth = require('./eth');var _eth2 = _interopRequireDefault(_eth);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

var START_BLOCK = 5000;

function stubApi(_blockNumber) {
  var _calls = {
    blockNumber: [] };


  return {
    _calls: _calls,
    transport: {
      isConnected: true },

    eth: {
      blockNumber: function blockNumber() {
        var stub = _sinon2.default.stub().resolves(new _bignumber2.default(_blockNumber || START_BLOCK))();

        _calls.blockNumber.push(stub);
        return stub;
      } } };


}

describe('api/subscriptions/eth', function () {
  var api = void 0;
  var eth = void 0;
  var cb = void 0;

  beforeEach(function () {
    api = stubApi();
    cb = _sinon2.default.stub();
    eth = new _eth2.default(cb, api);
  });

  describe('constructor', function () {
    it('starts the instance in a stopped state', function () {
      (0, _chai.expect)(eth.isStarted).to.be.false;
    });
  });

  describe('start', function () {
    describe('blockNumber available', function () {
      beforeEach(function () {
        return eth.start();
      });

      it('sets the started status', function () {
        (0, _chai.expect)(eth.isStarted).to.be.true;
      });

      it('calls eth_blockNumber', function () {
        (0, _chai.expect)(api._calls.blockNumber.length).to.be.ok;
      });

      it('updates subscribers', function () {
        (0, _chai.expect)(cb).to.have.been.calledWith('eth_blockNumber', null, new _bignumber2.default(START_BLOCK));
      });
    });

    describe('blockNumber not available', function () {
      beforeEach(function () {
        api = stubApi(-1);
        eth = new _eth2.default(cb, api);
        return eth.start();
      });

      it('sets the started status', function () {
        (0, _chai.expect)(eth.isStarted).to.be.true;
      });

      it('calls eth_blockNumber', function () {
        (0, _chai.expect)(api._calls.blockNumber.length).to.be.ok;
      });

      it('does not update subscribers', function () {
        (0, _chai.expect)(cb).not.to.been.called;
      });
    });
  });
});