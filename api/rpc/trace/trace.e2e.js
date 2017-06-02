import { createHttpApi } from '../../../../test/e2e/ethapi';

describe('ethapi.trace', () => {
  const ethapi = createHttpApi();

  describe('block', () => {
    it('returns the latest block traces', () => {
      return ethapi.trace.block().then((traces) => {
        expect(traces).to.be.ok;
      });
    });

    it('returns traces for a specified block', () => {
      return ethapi.trace.block('0x65432').then((traces) => {
        expect(traces).to.be.ok;
      });
    });
  });

  describe('replayTransaction', () => {
    it('returns traces for a specific transaction', () => {
      return ethapi.eth.getBlockByNumber().then((latestBlock) => {
        return ethapi.trace.replayTransaction(latestBlock.transactions[0]).then((traces) => {
          expect(traces).to.be.ok;
        });
      });
    });
  });
});
