import { TEST_HTTP_URL, mockHttp } from '../../../../test/mockRpc';

import { Http, PromiseWrapper } from '../../provider';
import Web3 from './web3';

const instance = new Web3(new PromiseWrapper(new Http(TEST_HTTP_URL, -1)));

describe('api/rpc/Web3', () => {
  let scope;

  describe('sha3', () => {
    beforeEach(() => {
      scope = mockHttp([{ method: 'web3_sha3', reply: { result: [] } }]);
    });

    it('formats the inputs correctly', () => {
      return instance.sha3('1234').then(() => {
        expect(scope.body.web3_sha3.params).to.deep.equal(['0x1234']);
      });
    });
  });
});
