'use strict';var _chai = require('chai');var _chai2 = _interopRequireDefault(_chai);
var _sinon = require('sinon');var _sinon2 = _interopRequireDefault(_sinon);
var _sinonChai = require('sinon-chai');var _sinonChai2 = _interopRequireDefault(_sinonChai);
var _manager = require('./manager');var _manager2 = _interopRequireDefault(_manager);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

_chai2.default.use(_sinonChai2.default);

function newStub() {
  var start = function start() {return manager._updateSubscriptions(manager.__test, null, 'test');};

  var manager = new _manager2.default({
    transport: {
      isConnected: true } });



  manager._eth = {
    isStarted: false,
    start: start };


  manager._personal = {
    isStarted: false,
    start: start };


  manager._signer = {
    isStarted: false,
    start: start };


  return manager;
}

describe('api/subscriptions/manager', function () {
  var manager = void 0;

  beforeEach(function () {
    manager = newStub();
  });

  describe('constructor', function () {
    it('sets up the subscription types & defaults', function () {
      (0, _chai.expect)(manager.subscriptions).to.be.an('array');
      (0, _chai.expect)(Object.keys(manager.values)).to.deep.equal(Object.keys(_manager.events));
    });
  });

  describe('subscriptions', function () {
    Object.
    keys(_manager.events).
    filter(function (eventName) {return eventName.indexOf('_') !== -1;}).
    forEach(function (eventName) {var
      module = _manager.events[eventName].module;
      var engine = void 0;
      var cb = void 0;
      var subscriptionId = void 0;

      describe(eventName, function () {
        beforeEach(function () {
          engine = manager['_' + module];
          manager.__test = eventName;
          cb = _sinon2.default.stub();
          _sinon2.default.spy(engine, 'start');

          return manager.
          subscribe(eventName, cb).
          then(function (_subscriptionId) {
            subscriptionId = _subscriptionId;
          });
        });

        it('puts the ' + module + ' engine in a started state', function () {
          (0, _chai.expect)(engine.start).to.be.called;
        });

        it('returns a subscriptionId', function () {
          (0, _chai.expect)(subscriptionId).to.be.an('number');
        });

        it('calls the subscription callback with updated values', function () {
          (0, _chai.expect)(cb).calledWith(null, 'test').to.be.ok;
        });
      });
    });
  });

  describe('unsubscriptions', function () {
    Object.
    keys(_manager.events).
    filter(function (eventName) {return eventName.indexOf('_') !== -1;}).
    forEach(function (eventName) {var
      module = _manager.events[eventName].module;
      var engine = void 0;
      var cb = void 0;

      describe(eventName, function () {
        beforeEach(function () {
          engine = manager['_' + module];
          manager.__test = eventName;
          cb = _sinon2.default.stub();
          _sinon2.default.spy(engine, 'start');

          return manager.
          subscribe(eventName, cb).
          then(function (_subscriptionId) {
            manager.unsubscribe(_subscriptionId);
          }).
          then(function () {
            manager._updateSubscriptions(manager.__test, null, 'test2');
          });
        });

        it('does not call the callback after unsubscription', function () {
          (0, _chai.expect)(cb).to.have.been.calledWith(null, 'test');
          (0, _chai.expect)(cb).to.not.have.been.calledWith(null, 'test2');
        });
      });
    });
  });
});