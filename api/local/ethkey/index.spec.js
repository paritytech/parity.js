'use strict';var _wordlist = require('../../../wordlist');
var _chai = require('chai');
var _ = require('./');

describe('api/local/ethkey', function () {
  describe('phraseToAddress', function () {
    this.timeout(30000);

    it('generates a valid address', function () {
      var phrase = (0, _wordlist.randomPhrase)(12);

      return (0, _.phraseToAddress)(phrase).then(function (address) {
        (0, _chai.expect)(address.length).to.be.equal(42);
        (0, _chai.expect)(address.slice(0, 4)).to.be.equal('0x00');
      });
    });

    it('generates valid address for empty phrase', function () {
      return (0, _.phraseToAddress)('').then(function (address) {
        (0, _chai.expect)(address).to.be.equal('0x00a329c0648769a73afac7f9381e08fb43dbea72');
      });
    });
  });

  describe('phraseToWallet', function () {
    this.timeout(30000);

    it('generates a valid wallet object', function () {
      var phrase = (0, _wordlist.randomPhrase)(12);

      return (0, _.phraseToWallet)(phrase).then(function (wallet) {
        (0, _chai.expect)(wallet.address.length).to.be.equal(42);
        (0, _chai.expect)(wallet.secret.length).to.be.equal(66);
        (0, _chai.expect)(wallet.public.length).to.be.equal(130);

        (0, _chai.expect)(wallet.address.slice(0, 4)).to.be.equal('0x00');
        (0, _chai.expect)(wallet.secret.slice(0, 2)).to.be.equal('0x');
        (0, _chai.expect)(wallet.public.slice(0, 2)).to.be.equal('0x');
      });
    });
  });
});