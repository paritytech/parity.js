'use strict';var _chai = require('chai');

var _ = require('./');

describe('wordlist', function () {

  describe('Random Bytes', function () {
    it('creates random bytes of specified length', function () {
      var bytes = (0, _.randomBytes)(12);
      (0, _chai.expect)(bytes.length).to.equal(12);
    });
  });

  describe('Random number', function () {
    it('creates random number', function () {
      var number = (0, _.randomNumber)();
      (0, _chai.expect)(typeof number === 'number').to.be.true;
    });
  });

  describe('Random word', function () {
    it('creates random bytes', function () {
      var word = (0, _.randomWord)();
      (0, _chai.expect)(typeof word === 'string').to.be.true;
    });
  });

  describe('Random phrase', function () {
    var phrase = (0, _.randomPhrase)(12).split(' ');
    it('creates random phrase of specified length', function () {
      (0, _chai.expect)(phrase.length).to.equal(12);
    });
    it('creates random phrase that was converted to array', function () {
      (0, _chai.expect)(Array.isArray(phrase)).to.be.true;
    });
  });

});