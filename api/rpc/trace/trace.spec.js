import { expect } from 'chai';
import { TEST_HTTP_URL, mockHttp } from '../mockRpc';

import { Http, PromiseWrapper } from '../../provider';
import Trace from './trace';

const instance = new Trace(new PromiseWrapper(new Http(TEST_HTTP_URL, -1)));

describe('api/rpc/Trace', () => {
  let scope;

  describe('block', () => {
    beforeEach(() => {
      scope = mockHttp([{ method: 'trace_block', reply: { result: [] } }]);
    });

    it('assumes latest blockNumber when not specified', () => {
      return instance.block().then(() => {
        expect(scope.body.trace_block.params).to.deep.equal(['latest']);
      });
    });

    it('passed specified blockNumber', () => {
      return instance.block(0x123).then(() => {
        expect(scope.body.trace_block.params).to.deep.equal(['0x123']);
      });
    });
  });
});
