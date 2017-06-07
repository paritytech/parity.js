'use strict';var _bignumber = require('bignumber.js');var _bignumber2 = _interopRequireDefault(_bignumber);
var _chai = require('chai');

var _input = require('./input');




var _address = require('../../abi/util/address');function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

describe('api/format/input', function () {
  var address = '0x63cf90d3f0410092fc0fca41846f596223979195';

  describe('inAddress', function () {
    var address = '63cf90d3f0410092fc0fca41846f596223979195';

    it('adds the leading 0x as required', function () {
      (0, _chai.expect)((0, _input.inAddress)(address)).to.equal('0x' + address);
    });

    it('returns verified addresses as-is', function () {
      (0, _chai.expect)((0, _input.inAddress)('0x' + address)).to.equal('0x' + address);
    });

    it('returns lowercase equivalents', function () {
      (0, _chai.expect)((0, _input.inAddress)(address.toUpperCase())).to.equal('0x' + address);
    });

    it('returns 0x on null addresses', function () {
      (0, _chai.expect)((0, _input.inAddress)()).to.equal('0x');
    });
  });

  describe('inBlockNumber()', function () {
    it('returns earliest as-is', function () {
      (0, _chai.expect)((0, _input.inBlockNumber)('earliest')).to.equal('earliest');
    });

    it('returns latest as-is', function () {
      (0, _chai.expect)((0, _input.inBlockNumber)('latest')).to.equal('latest');
    });

    it('returns pending as-is', function () {
      (0, _chai.expect)((0, _input.inBlockNumber)('pending')).to.equal('pending');
    });

    it('formats existing BigNumber into hex', function () {
      (0, _chai.expect)((0, _input.inBlockNumber)(new _bignumber2.default(0x123456))).to.equal('0x123456');
    });

    it('formats hex strings into hex', function () {
      (0, _chai.expect)((0, _input.inBlockNumber)('0x123456')).to.equal('0x123456');
    });

    it('formats numbers into hex', function () {
      (0, _chai.expect)((0, _input.inBlockNumber)(0x123456)).to.equal('0x123456');
    });
  });

  describe('inData', function () {
    it('formats to hex', function () {
      (0, _chai.expect)((0, _input.inData)('123456')).to.equal('0x123456');
    });

    it('converts a string to a hex representation', function () {
      (0, _chai.expect)((0, _input.inData)('jaco')).to.equal('0x6a61636f');
    });
  });

  describe('inHex', function () {
    it('leaves leading 0x as-is', function () {
      (0, _chai.expect)((0, _input.inHex)('0x123456')).to.equal('0x123456');
    });

    it('adds a leading 0x', function () {
      (0, _chai.expect)((0, _input.inHex)('123456')).to.equal('0x123456');
    });

    it('returns uppercase as lowercase (leading 0x)', function () {
      (0, _chai.expect)((0, _input.inHex)('0xABCDEF')).to.equal('0xabcdef');
    });

    it('returns uppercase as lowercase (no leading 0x)', function () {
      (0, _chai.expect)((0, _input.inHex)('ABCDEF')).to.equal('0xabcdef');
    });

    it('handles empty & null', function () {
      (0, _chai.expect)((0, _input.inHex)()).to.equal('0x');
      (0, _chai.expect)((0, _input.inHex)('')).to.equal('0x');
    });
  });

  describe('inFilter', function () {
    ['address'].forEach(function (input) {
      it('formats ' + input + ' address as address', function () {
        var block = {};

        block[input] = address;
        var formatted = (0, _input.inFilter)(block)[input];

        (0, _chai.expect)((0, _address.isAddress)(formatted)).to.be.true;
        (0, _chai.expect)(formatted).to.equal(address);
      });
    });

    ['fromBlock', 'toBlock'].forEach(function (input) {
      it('formats ' + input + ' number as blockNumber', function () {
        var block = {};

        block[input] = 0x123;
        var formatted = (0, _input.inFilter)(block)[input];

        (0, _chai.expect)(formatted).to.equal('0x123');
      });
    });

    it('ignores and passes through unknown keys', function () {
      (0, _chai.expect)((0, _input.inFilter)({ someRandom: 'someRandom' })).to.deep.equal({ someRandom: 'someRandom' });
    });

    it('formats an filter options object with relevant entries converted', function () {
      (0, _chai.expect)(
      (0, _input.inFilter)({
        address: address,
        fromBlock: 'latest',
        toBlock: 0x101,
        extraData: 'someExtraStuffInHere',
        limit: 0x32 })).

      to.deep.equal({
        address: address,
        fromBlock: 'latest',
        toBlock: '0x101',
        extraData: 'someExtraStuffInHere',
        limit: 50 });

    });
  });

  describe('inNumber10()', function () {
    it('formats existing BigNumber into number', function () {
      (0, _chai.expect)((0, _input.inNumber10)(new _bignumber2.default(123))).to.equal(123);
    });

    it('formats hex strings into decimal', function () {
      (0, _chai.expect)((0, _input.inNumber10)('0x0a')).to.equal(10);
    });

    it('formats numbers into number', function () {
      (0, _chai.expect)((0, _input.inNumber10)(123)).to.equal(123);
    });

    it('formats undefined into 0', function () {
      (0, _chai.expect)((0, _input.inNumber10)()).to.equal(0);
    });
  });

  describe('inNumber16()', function () {
    it('formats existing BigNumber into hex', function () {
      (0, _chai.expect)((0, _input.inNumber16)(new _bignumber2.default(0x123456))).to.equal('0x123456');
    });

    it('formats hex strings into hex', function () {
      (0, _chai.expect)((0, _input.inNumber16)('0x123456')).to.equal('0x123456');
    });

    it('formats numbers into hex', function () {
      (0, _chai.expect)((0, _input.inNumber16)(0x123456)).to.equal('0x123456');
    });

    it('formats undefined into 0', function () {
      (0, _chai.expect)((0, _input.inNumber16)()).to.equal('0x0');
    });
  });

  describe('inOptions', function () {
    ['data'].forEach(function (input) {
      it('converts ' + input + ' to hex data', function () {
        var block = {};

        block[input] = '1234';
        var formatted = (0, _input.inData)(block[input]);

        (0, _chai.expect)(formatted).to.equal('0x1234');
      });
    });

    ['from', 'to'].forEach(function (input) {
      it('formats ' + input + ' address as address', function () {
        var block = {};

        block[input] = address;
        var formatted = (0, _input.inOptions)(block)[input];

        (0, _chai.expect)((0, _address.isAddress)(formatted)).to.be.true;
        (0, _chai.expect)(formatted).to.equal(address);
      });
    });

    it('does not encode an empty `to` value', function () {
      var options = { to: '' };
      var formatted = (0, _input.inOptions)(options);

      (0, _chai.expect)(formatted.to).to.equal('');
    });

    ['gas', 'gasPrice', 'value', 'nonce'].forEach(function (input) {
      it('formats ' + input + ' number as hexnumber', function () {
        var block = {};

        block[input] = 0x123;
        var formatted = (0, _input.inOptions)(block)[input];

        (0, _chai.expect)(formatted).to.equal('0x123');
      });
    });

    it('passes condition as null when specified as such', function () {
      (0, _chai.expect)((0, _input.inOptions)({ condition: null })).to.deep.equal({ condition: null });
    });

    it('ignores and passes through unknown keys', function () {
      (0, _chai.expect)((0, _input.inOptions)({ someRandom: 'someRandom' })).to.deep.equal({ someRandom: 'someRandom' });
    });

    it('formats an options object with relevant entries converted', function () {
      (0, _chai.expect)(
      (0, _input.inOptions)({
        from: address,
        to: address,
        gas: new _bignumber2.default('0x100'),
        gasPrice: 0x101,
        value: 258,
        nonce: '0x104',
        data: '0123456789',
        extraData: 'someExtraStuffInHere' })).

      to.deep.equal({
        from: address,
        to: address,
        gas: '0x100',
        gasPrice: '0x101',
        value: '0x102',
        nonce: '0x104',
        data: '0x0123456789',
        extraData: 'someExtraStuffInHere' });

    });
  });

  describe('inTraceType', function () {
    it('returns array of types as is', function () {
      var types = ['vmTrace', 'trace', 'stateDiff'];

      (0, _chai.expect)((0, _input.inTraceType)(types)).to.deep.equal(types);
    });

    it('formats single string type into array', function () {
      var type = 'vmTrace';

      (0, _chai.expect)((0, _input.inTraceType)(type)).to.deep.equal([type]);
    });
  });

  describe('inDeriveHash', function () {
    it('returns derive hash', function () {
      (0, _chai.expect)((0, _input.inDeriveHash)(1)).to.deep.equal({
        hash: '0x1',
        type: 'soft' });


      (0, _chai.expect)((0, _input.inDeriveHash)(null)).to.deep.equal({
        hash: '0x',
        type: 'soft' });


      (0, _chai.expect)((0, _input.inDeriveHash)({
        hash: 5 })).
      to.deep.equal({
        hash: '0x5',
        type: 'soft' });


      (0, _chai.expect)((0, _input.inDeriveHash)({
        hash: 5,
        type: 'hard' })).
      to.deep.equal({
        hash: '0x5',
        type: 'hard' });

    });
  });

  describe('inDeriveIndex', function () {
    it('returns derive hash', function () {
      (0, _chai.expect)((0, _input.inDeriveIndex)(null)).to.deep.equal([]);
      (0, _chai.expect)((0, _input.inDeriveIndex)([])).to.deep.equal([]);

      (0, _chai.expect)((0, _input.inDeriveIndex)([1])).to.deep.equal([{
        index: 1,
        type: 'soft' }]);


      (0, _chai.expect)((0, _input.inDeriveIndex)({
        index: 1 })).
      to.deep.equal([{
        index: 1,
        type: 'soft' }]);


      (0, _chai.expect)((0, _input.inDeriveIndex)([{
        index: 1,
        type: 'hard' },
      5])).to.deep.equal([
      {
        index: 1,
        type: 'hard' },

      {
        index: 5,
        type: 'soft' }]);


    });
  });
});