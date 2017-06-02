import sinon from 'sinon';

import Manager, { events } from './manager';

function newStub () {
  const start = () => manager._updateSubscriptions(manager.__test, null, 'test');

  const manager = new Manager({
    transport: {
      isConnected: true
    }
  });

  manager._eth = {
    isStarted: false,
    start
  };

  manager._personal = {
    isStarted: false,
    start
  };

  manager._signer = {
    isStarted: false,
    start
  };

  return manager;
}

describe('api/subscriptions/manager', () => {
  let manager;

  beforeEach(() => {
    manager = newStub();
  });

  describe('constructor', () => {
    it('sets up the subscription types & defaults', () => {
      expect(manager.subscriptions).to.be.an.array;
      expect(Object.keys(manager.values)).to.deep.equal(Object.keys(events));
    });
  });

  describe('subscriptions', () => {
    Object
      .keys(events)
      .filter((eventName) => eventName.indexOf('_') !== -1)
      .forEach((eventName) => {
        const { module } = events[eventName];
        let engine;
        let cb;
        let subscriptionId;

        describe(eventName, () => {
          beforeEach(() => {
            engine = manager[`_${module}`];
            manager.__test = eventName;
            cb = sinon.stub();
            sinon.spy(engine, 'start');

            return manager
              .subscribe(eventName, cb)
              .then((_subscriptionId) => {
                subscriptionId = _subscriptionId;
              });
          });

          it(`puts the ${module} engine in a started state`, () => {
            expect(engine.start).to.have.been.called;
          });

          it('returns a subscriptionId', () => {
            expect(subscriptionId).to.be.a.number;
          });

          it('calls the subscription callback with updated values', () => {
            expect(cb).to.have.been.calledWith(null, 'test');
          });
        });
      });
  });

  describe('unsubscriptions', () => {
    Object
      .keys(events)
      .filter((eventName) => eventName.indexOf('_') !== -1)
      .forEach((eventName) => {
        const { module } = events[eventName];
        let engine;
        let cb;

        describe(eventName, () => {
          beforeEach(() => {
            engine = manager[`_${module}`];
            manager.__test = eventName;
            cb = sinon.stub();
            sinon.spy(engine, 'start');

            return manager
              .subscribe(eventName, cb)
              .then((_subscriptionId) => {
                manager.unsubscribe(_subscriptionId);
              })
              .then(() => {
                manager._updateSubscriptions(manager.__test, null, 'test2');
              });
          });

          it('does not call the callback after unsubscription', () => {
            expect(cb).to.have.been.calledWith(null, 'test');
            expect(cb).to.not.have.been.calledWith(null, 'test2');
          });
        });
      });
  });
});
