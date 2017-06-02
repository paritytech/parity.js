import { expect } from 'chai';
import sinon from 'sinon';

import Logging from './logging';

describe('api/subscriptions/logging', () => {
  let cb;
  let logging;

  beforeEach(() => {
    cb = sinon.stub();
    logging = new Logging(cb);
  });

  describe('constructor', () => {
    it('starts the instance in a started state', () => {
      expect(logging.isStarted).to.be.true;
    });
  });

  describe('send', () => {
    const method = 'method';
    const params = 'params';
    const json = 'json';

    beforeEach(() => {
      Logging.send(method, params, json);
    });

    it('calls the subscription update', () => {
      expect(cb).to.have.been.calledWith('logging', null, { method, params, json });
    });
  });
});
