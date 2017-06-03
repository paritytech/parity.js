import "isomorphic-fetch";
import { expect } from 'chai';
import ethereumRpc from '@parity/jsonrpc';
import nock from 'nock';

import util from './util';
import Api from './';

const TEST_HTTP_URL = 'http://localhost:6688';

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

function endpointTest (instance, moduleId, name) {
  describe(name, () => {
    it(`has the ${moduleId}.${name} endpoint`, () => {
      expect(typeof instance[moduleId][name] === 'function').to.be.ok;
    });

    it(`maps to ${moduleId}_${name} via RPC`, () => {
      const scope = mockHttp([{ method: `${moduleId}_${name}`, reply: {} }]);

      return instance[moduleId][name]()
        .then(() => {
          expect(scope.isDone()).to.be.true;
        })
        .catch(() => {
          nock.cleanAll();
        });
    });
  });
}

function mockHttp (requests) {
  nock.cleanAll();
  let scope = nock(TEST_HTTP_URL);

  requests.forEach((request, index) => {
    scope = scope
      .post('/')
      .reply(request.code || 200, (uri, body) => {
        if (body.method !== request.method) {
          return {
            error: `Invalid method ${body.method}, expected ${request.method}`
          };
        }

        scope.body = scope.body || {};
        scope.body[request.method] = body;

        return request.reply;
      });
  });

  return scope;
}
