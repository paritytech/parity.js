import { createHttpApi } from '../../../../test/e2e/ethapi';

describe('ethapi.parity', () => {
  const ethapi = createHttpApi();

  describe('chainStatus', () => {
    it('returns and translates the status', () => {
      return ethapi.parity.chainStatus().then((value) => {
        expect(value).to.be.ok;
      });
    });
  });

  describe('gasFloorTarget', () => {
    it('returns and translates the target', () => {
      return ethapi.parity.gasFloorTarget().then((value) => {
        expect(value.gt(0)).to.be.true;
      });
    });
  });

  describe('gasPriceHistogram', () => {
    it('returns and translates the target', () => {
      return ethapi.parity.gasPriceHistogram().then((result) => {
        expect(Object.keys(result)).to.deep.equal(['bucketBounds', 'counts']);
        expect(result.bucketBounds.length > 0).to.be.true;
        expect(result.counts.length > 0).to.be.true;
      });
    });
  });

  describe('netChain', () => {
    it('returns and the chain', () => {
      return ethapi.parity.netChain().then((value) => {
        expect(value).to.equal('morden');
      });
    });
  });

  describe('netPort', () => {
    it('returns and translates the port', () => {
      return ethapi.parity.netPort().then((value) => {
        expect(value.gt(0)).to.be.true;
      });
    });
  });

  describe('transactionsLimit', () => {
    it('returns and translates the limit', () => {
      return ethapi.parity.transactionsLimit().then((value) => {
        expect(value.gt(0)).to.be.true;
      });
    });
  });

  describe('rpcSettings', () => {
    it('returns and translates the settings', () => {
      return ethapi.parity.rpcSettings().then((value) => {
        expect(value).to.be.ok;
      });
    });
  });
});
