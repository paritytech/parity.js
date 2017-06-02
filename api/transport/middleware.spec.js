import Middleware from './middleware';
import JsonRpcBase from './jsonRpcBase';

const MOCKED = 'mocked!';

class MockTransport extends JsonRpcBase {
  _execute () {
    return Promise.resolve(MOCKED);
  }
}

class MockMiddleware extends Middleware {
  constructor (transport) {
    super(transport);

    this.register('mock_rpc', ([num]) => num);
    this.register('mock_null', () => null);
  }
}

describe('api/transport/Middleware', () => {
  let transport;

  beforeEach(() => {
    transport = new MockTransport();
    transport.addMiddleware(MockMiddleware);
  });

  it('Routes requests to middleware', () => {
    return transport.execute('mock_rpc', [100]).then((num) => {
      expect(num).to.be.equal(100);
    });
  });

  it('Passes non-mocked requests through', () => {
    return transport.execute('not_moced', [200]).then((result) => {
      expect(result).to.be.equal(MOCKED);
    });
  });

  it('Passes mocked requests through, if middleware returns null', () => {
    return transport.execute('mock_null', [300]).then((result) => {
      expect(result).to.be.equal(MOCKED);
    });
  });
});
