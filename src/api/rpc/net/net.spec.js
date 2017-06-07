import { expect } from 'chai';
import { TEST_HTTP_URL, mockHttp } from '../mockRpc';
import { isBigNumber } from '../../util/types';

import { Http, PromiseWrapper } from '../../provider';
import Net from './net';

const instance = new Net(new PromiseWrapper(new Http(TEST_HTTP_URL, -1)));

describe('api/rpc/Net', () => {
  describe('peerCount', () => {
    it('returns the connected peers, formatted', () => {
      mockHttp([{ method: 'net_peerCount', reply: { result: '0x123456' } }]);

      return instance.peerCount().then((count) => {
        expect(isBigNumber(count)).to.be.true;
        expect(count.eq(0x123456)).to.be.true;
      });
    });
  });
});
