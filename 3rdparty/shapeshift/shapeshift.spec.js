'use strict';var _chai = require('chai');var _chai2 = _interopRequireDefault(_chai);
var _sinonChai = require('sinon-chai');var _sinonChai2 = _interopRequireDefault(_sinonChai);
var _sinon = require('sinon');var _sinon2 = _interopRequireDefault(_sinon);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

_chai2.default.use(_sinonChai2.default);

var ShapeShift = require('./');
var initShapeshift = ShapeShift.default || ShapeShift;

var helpers = require('./helpers.spec.js');

var mockget = helpers.mockget;
var mockpost = helpers.mockpost;

describe('shapeshift/calls', function () {
  var clock = void 0;
  var shapeshift = void 0;

  beforeEach(function () {
    clock = _sinon2.default.useFakeTimers();
    shapeshift = initShapeshift(helpers.APIKEY);
  });

  afterEach(function () {
    clock.restore();
  });

  describe('getCoins', function () {
    var REPLY = {
      BTC: {
        name: 'Bitcoin',
        symbol: 'BTC',
        image: 'https://shapeshift.io/images/coins/bitcoin.png',
        status: 'available' },

      ETH: {
        name: 'Ether',
        symbol: 'ETH',
        image: 'https://shapeshift.io/images/coins/ether.png',
        status: 'available' } };



    var scope = void 0;

    beforeEach(function () {
      scope = mockget(shapeshift, [{ path: 'getcoins', reply: REPLY }]);

      return shapeshift.getCoins();
    });

    it('makes the call', function () {
      (0, _chai.expect)(scope.isDone()).to.be.ok;
    });
  });

  describe('getMarketInfo', function () {
    var REPLY = {
      pair: 'btc_ltc',
      rate: 128.17959917,
      minerFee: 0.003,
      limit: 0,
      minimum: 0.00004632 };


    var scope = void 0;

    beforeEach(function () {
      scope = mockget(shapeshift, [{ path: 'marketinfo/btc_ltc', reply: REPLY }]);

      return shapeshift.getMarketInfo('btc_ltc');
    });

    it('makes the call', function () {
      (0, _chai.expect)(scope.isDone()).to.be.ok;
    });
  });

  describe('getStatus', function () {
    var REPLY = {
      status: '0x123',
      address: '0x123' };


    var scope = void 0;

    beforeEach(function () {
      scope = mockget(shapeshift, [{ path: 'txStat/0x123', reply: REPLY }]);

      return shapeshift.getStatus('0x123');
    });

    it('makes the call', function () {
      (0, _chai.expect)(scope.isDone()).to.be.ok;
    });
  });

  describe('shift', function () {
    var REPLY = {
      deposit: '1BTC',
      depositType: 'btc',
      withdrawal: '0x456',
      withdrawalType: 'eth' };


    var scope = void 0;

    beforeEach(function () {
      scope = mockpost(shapeshift, [{ path: 'shift', reply: REPLY }]);

      return shapeshift.shift('0x456', '1BTC', 'btc_eth');
    });

    it('makes the call', function () {
      (0, _chai.expect)(scope.isDone()).to.be.ok;
    });

    describe('body', function () {
      it('has withdrawal set', function () {
        (0, _chai.expect)(scope.body.shift.withdrawal).to.equal('0x456');
      });

      it('has returnAddress set', function () {
        (0, _chai.expect)(scope.body.shift.returnAddress).to.equal('1BTC');
      });

      it('has pair set', function () {
        (0, _chai.expect)(scope.body.shift.pair).to.equal('btc_eth');
      });
    });
  });

  describe('subscriptions', function () {
    var ADDRESS = '0123456789abcdef';
    var REPLY = {
      status: 'complete',
      address: ADDRESS };


    var callback = void 0;

    beforeEach(function () {
      mockget(shapeshift, [{ path: 'txStat/' + ADDRESS, reply: REPLY }]);
      callback = _sinon2.default.stub();
      shapeshift.subscribe(ADDRESS, callback);
    });

    describe('subscribe', function () {
      it('adds the depositAddress to the list', function () {
        var subscriptions = shapeshift._getSubscriptions();

        (0, _chai.expect)(subscriptions.length).to.equal(1);
        (0, _chai.expect)(subscriptions[0].depositAddress).to.equal(ADDRESS);
      });

      it('starts the polling timer', function () {
        (0, _chai.expect)(shapeshift._isPolling()).to.be.true;
      });

      it('calls the callback once the timer has elapsed', function () {
        clock.tick(2222);

        return shapeshift._getSubscriptionPromises().then(function () {
          (0, _chai.expect)(callback).to.have.been.calledWith(null, REPLY);
        });
      });

      it('auto-unsubscribes on completed', function () {
        clock.tick(2222);

        return shapeshift._getSubscriptionPromises().then(function () {
          (0, _chai.expect)(shapeshift._getSubscriptions().length).to.equal(0);
        });
      });
    });

    describe('unsubscribe', function () {
      it('unbsubscribes when requested', function () {
        (0, _chai.expect)(shapeshift._getSubscriptions().length).to.equal(1);
        shapeshift.unsubscribe(ADDRESS);
        (0, _chai.expect)(shapeshift._getSubscriptions().length).to.equal(0);
      });

      it('clears the polling on no subscriptions', function () {
        shapeshift.unsubscribe(ADDRESS);
        (0, _chai.expect)(shapeshift._isPolling()).to.be.false;
      });

      it('handles unsubscribe of auto-unsubscribe', function () {
        clock.tick(2222);

        return shapeshift._getSubscriptionPromises().then(function () {
          (0, _chai.expect)(shapeshift.unsubscribe(ADDRESS)).to.be.true;
        });
      });

      it('handles unsubscribe when multiples listed', function () {
        var ADDRESS2 = 'abcdef0123456789';

        shapeshift.subscribe(ADDRESS2, _sinon2.default.stub());
        (0, _chai.expect)(shapeshift._getSubscriptions().length).to.equal(2);
        (0, _chai.expect)(shapeshift._getSubscriptions()[0].depositAddress).to.equal(ADDRESS);
        shapeshift.unsubscribe(ADDRESS);
        (0, _chai.expect)(shapeshift._getSubscriptions()[0].depositAddress).to.equal(ADDRESS2);
      });
    });
  });
});