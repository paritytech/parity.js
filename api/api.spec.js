import ethereumRpc from '@parity/jsonrpc';

import { TEST_HTTP_URL, endpointTest } from '../../test/mockRpc';

import util from './util';
import Api from './index';

describe('api/Api', () => {
  describe('constructor', () => {
    it('requires defined/non-null provider object', () => {
      expect(() => new Api()).to.throw(/Api needs provider/);
      expect(() => new Api(null)).to.throw(/Api needs provider/);
    });

    it('requires an send function on the transport object', () => {
      expect(() => new Api({})).to.throw(/Api needs provider/);
      expect(() => new Api({ send: true })).to.throw(/Api needs provider/);
    });
  });

  describe('interface', () => {
    const api = new Api(new Api.Provider.Http(TEST_HTTP_URL, -1));

    Object.keys(ethereumRpc).sort().forEach((endpoint) => {
      describe(endpoint, () => {
        Object.keys(ethereumRpc[endpoint]).sort().forEach((method) => {
          endpointTest(api, endpoint, method);
        });
      });
    });
  });

  it('exposes util as static property', () => {
    expect(Api.util).to.equal(util);
  });
});
