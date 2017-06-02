import { randomPhrase } from '@parity/wordlist';
import { phraseToAddress, phraseToWallet } from './';

describe('api/local/ethkey', () => {
  describe('phraseToAddress', function () {
    this.timeout(30000);

    it('generates a valid address', () => {
      const phrase = randomPhrase(12);

      return phraseToAddress(phrase).then((address) => {
        expect(address.length).to.be.equal(42);
        expect(address.slice(0, 4)).to.be.equal('0x00');
      });
    });

    it('generates valid address for empty phrase', () => {
      return phraseToAddress('').then((address) => {
        expect(address).to.be.equal('0x00a329c0648769a73afac7f9381e08fb43dbea72');
      });
    });
  });

  describe('phraseToWallet', function () {
    this.timeout(30000);

    it('generates a valid wallet object', () => {
      const phrase = randomPhrase(12);

      return phraseToWallet(phrase).then((wallet) => {
        expect(wallet.address.length).to.be.equal(42);
        expect(wallet.secret.length).to.be.equal(66);
        expect(wallet.public.length).to.be.equal(130);

        expect(wallet.address.slice(0, 4)).to.be.equal('0x00');
        expect(wallet.secret.slice(0, 2)).to.be.equal('0x');
        expect(wallet.public.slice(0, 2)).to.be.equal('0x');
      });
    });
  });
});
