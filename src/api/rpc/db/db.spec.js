import { expect } from 'chai';
import { TEST_HTTP_URL, mockHttp } from '../mockRpc';

import { Http, PromiseWrapper } from '../../provider';
import Db from './db';

const instance = new Db(new PromiseWrapper(new Http(TEST_HTTP_URL, -1)));

describe('api/rpc/Db', () => {
  let scope;

  describe('putHex', () => {
    beforeEach(() => {
      scope = mockHttp([{ method: 'db_putHex', reply: { result: [] } }]);
    });

    it('formats the inputs correctly', () => {
      return instance.putHex('db', 'key', '1234').then(() => {
        expect(scope.body.db_putHex.params).to.deep.equal(['db', 'key', '0x1234']);
      });
    });
  });
});
