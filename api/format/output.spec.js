'use strict';var _bignumber = require('bignumber.js');var _bignumber2 = _interopRequireDefault(_bignumber);
var _chai = require('chai');

var _output = require('./output');
var _types = require('../util/types');
var _address = require('../../abi/util/address');function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}

describe('api/format/output', function () {
  var address = '0x63cf90d3f0410092fc0fca41846f596223979195';
  var checksum = '0x63Cf90D3f0410092FC0fca41846f596223979195';

  describe('outAccountInfo', function () {
    it('returns meta objects parsed', function () {
      (0, _chai.expect)((0, _output.outAccountInfo)(
      { '0x63cf90d3f0410092fc0fca41846f596223979195': {
          name: 'name', uuid: 'uuid', meta: '{"name":"456"}' } })).

      to.deep.equal({
        '0x63Cf90D3f0410092FC0fca41846f596223979195': {
          name: 'name', uuid: 'uuid', meta: { name: '456' } } });


    });

    it('returns objects without meta & uuid as required', function () {
      (0, _chai.expect)((0, _output.outAccountInfo)(
      { '0x63cf90d3f0410092fc0fca41846f596223979195': { name: 'name' } })).
      to.deep.equal({
        '0x63Cf90D3f0410092FC0fca41846f596223979195': { name: 'name' } });

    });
  });

  describe('outAddress', function () {
    it('retuns the address as checksummed', function () {
      (0, _chai.expect)((0, _output.outAddress)(address)).to.equal(checksum);
    });

    it('retuns the checksum as checksummed', function () {
      (0, _chai.expect)((0, _output.outAddress)(checksum)).to.equal(checksum);
    });
  });

  describe('outBlock', function () {
    ['author', 'miner'].forEach(function (input) {
      it('formats ' + input + ' address as address', function () {
        var block = {};

        block[input] = address;
        var formatted = (0, _output.outBlock)(block)[input];

        (0, _chai.expect)((0, _address.isAddress)(formatted)).to.be.true;
        (0, _chai.expect)(formatted).to.equal(checksum);
      });
    });

    ['difficulty', 'gasLimit', 'gasUsed', 'number', 'nonce', 'totalDifficulty'].forEach(function (input) {
      it('formats ' + input + ' number as hexnumber', function () {
        var block = {};

        block[input] = 0x123;
        var formatted = (0, _output.outBlock)(block)[input];

        (0, _chai.expect)((0, _types.isInstanceOf)(formatted, _bignumber2.default)).to.be.true;
        (0, _chai.expect)(formatted.toString(16)).to.equal('123');
      });
    });

    ['timestamp'].forEach(function (input) {
      it('formats ' + input + ' number as Date', function () {
        var block = {};

        block[input] = 0x57513668;
        var formatted = (0, _output.outBlock)(block)[input];

        (0, _chai.expect)((0, _types.isInstanceOf)(formatted, Date)).to.be.true;
        (0, _chai.expect)(formatted.getTime()).to.equal(1464940136000);
      });
    });

    it('ignores and passes through unknown keys', function () {
      (0, _chai.expect)((0, _output.outBlock)({ someRandom: 'someRandom' })).to.deep.equal({ someRandom: 'someRandom' });
    });

    it('formats a block with all the info converted', function () {
      (0, _chai.expect)(
      (0, _output.outBlock)({
        author: address,
        miner: address,
        difficulty: '0x100',
        gasLimit: '0x101',
        gasUsed: '0x102',
        number: '0x103',
        nonce: '0x104',
        totalDifficulty: '0x105',
        timestamp: '0x57513668',
        extraData: 'someExtraStuffInHere' })).

      to.deep.equal({
        author: checksum,
        miner: checksum,
        difficulty: new _bignumber2.default('0x100'),
        gasLimit: new _bignumber2.default('0x101'),
        gasUsed: new _bignumber2.default('0x102'),
        number: new _bignumber2.default('0x103'),
        nonce: new _bignumber2.default('0x104'),
        totalDifficulty: new _bignumber2.default('0x105'),
        timestamp: new Date('2016-06-03T07:48:56.000Z'),
        extraData: 'someExtraStuffInHere' });

    });
  });

  describe('outChainStatus', function () {
    it('formats blockGap values', function () {
      var status = {
        blockGap: [0x1234, '0x5678'] };


      (0, _chai.expect)((0, _output.outChainStatus)(status)).to.deep.equal({
        blockGap: [new _bignumber2.default(0x1234), new _bignumber2.default(0x5678)] });

    });

    it('handles null blockGap values', function () {
      var status = {
        blockGap: null };


      (0, _chai.expect)((0, _output.outChainStatus)(status)).to.deep.equal(status);
    });
  });

  describe('outDate', function () {
    it('converts a second date in unix timestamp', function () {
      (0, _chai.expect)((0, _output.outDate)(0x57513668)).to.deep.equal(new Date('2016-06-03T07:48:56.000Z'));
    });
  });

  describe('outHistogram', function () {
    ['bucketBounds', 'counts'].forEach(function (type) {
      it('formats ' + type + ' as number arrays', function () {
        (0, _chai.expect)(
        (0, _output.outHistogram)(_defineProperty({}, type, [0x123, 0x456, 0x789]))).
        to.deep.equal(_defineProperty({},
        type, [new _bignumber2.default(0x123), new _bignumber2.default(0x456), new _bignumber2.default(0x789)]));

      });
    });
  });

  describe('outHwAccountInfo', function () {
    it('returns objects with formatted addresses', function () {
      (0, _chai.expect)((0, _output.outHwAccountInfo)(
      { '0x63cf90d3f0410092fc0fca41846f596223979195': { manufacturer: 'mfg', name: 'type' } })).
      to.deep.equal({
        '0x63Cf90D3f0410092FC0fca41846f596223979195': { manufacturer: 'mfg', name: 'type' } });

    });
  });

  describe('outNodeKind', function () {
    it('formats the input as received', function () {
      var kind = { availability: 'personal', capability: 'full' };

      (0, _chai.expect)((0, _output.outNodeKind)(kind)).to.deep.equal(kind);
    });
  });

  describe('outNumber', function () {
    it('returns a BigNumber equalling the value', function () {
      var bn = (0, _output.outNumber)('0x123456');

      (0, _chai.expect)((0, _types.isBigNumber)(bn)).to.be.true;
      (0, _chai.expect)(bn.eq(0x123456)).to.be.true;
    });

    it('assumes 0 when ivalid input', function () {
      (0, _chai.expect)((0, _output.outNumber)().eq(0)).to.be.true;
    });
  });

  describe('outPeer', function () {
    it('converts all internal numbers to BigNumbers', function () {
      (0, _chai.expect)((0, _output.outPeer)({
        caps: ['par/1'],
        id: '0x01',
        name: 'Parity',
        network: {
          localAddress: '10.0.0.1',
          remoteAddress: '10.0.0.1' },

        protocols: {
          par: {
            difficulty: '0x0f',
            head: '0x02',
            version: 63 } } })).


      to.deep.equal({
        caps: ['par/1'],
        id: '0x01',
        name: 'Parity',
        network: {
          localAddress: '10.0.0.1',
          remoteAddress: '10.0.0.1' },

        protocols: {
          par: {
            difficulty: new _bignumber2.default(15),
            head: '0x02',
            version: 63 } } });



    });

    it('does not output null protocols', function () {
      (0, _chai.expect)((0, _output.outPeer)({
        caps: ['par/1'],
        id: '0x01',
        name: 'Parity',
        network: {
          localAddress: '10.0.0.1',
          remoteAddress: '10.0.0.1' },

        protocols: {
          les: null } })).

      to.deep.equal({
        caps: ['par/1'],
        id: '0x01',
        name: 'Parity',
        network: {
          localAddress: '10.0.0.1',
          remoteAddress: '10.0.0.1' },

        protocols: {} });

    });
  });

  describe('outPeers', function () {
    it('converts all internal numbers to BigNumbers', function () {
      (0, _chai.expect)((0, _output.outPeers)({
        active: 789,
        connected: '456',
        max: 0x7b,
        peers: [
        {
          caps: ['par/1'],
          id: '0x01',
          name: 'Parity',
          network: {
            localAddress: '10.0.0.1',
            remoteAddress: '10.0.0.1' },

          protocols: {
            par: {
              difficulty: '0x0f',
              head: '0x02',
              version: 63 },

            les: null } }] })).



      to.deep.equal({
        active: new _bignumber2.default(789),
        connected: new _bignumber2.default(456),
        max: new _bignumber2.default(123),
        peers: [
        {
          caps: ['par/1'],
          id: '0x01',
          name: 'Parity',
          network: {
            localAddress: '10.0.0.1',
            remoteAddress: '10.0.0.1' },

          protocols: {
            par: {
              difficulty: new _bignumber2.default(15),
              head: '0x02',
              version: 63 } } }] });





    });
  });

  describe('outReceipt', function () {
    ['contractAddress'].forEach(function (input) {
      it('formats ' + input + ' address as address', function () {
        var block = {};

        block[input] = address;
        var formatted = (0, _output.outReceipt)(block)[input];

        (0, _chai.expect)((0, _address.isAddress)(formatted)).to.be.true;
        (0, _chai.expect)(formatted).to.equal(checksum);
      });
    });

    ['blockNumber', 'cumulativeGasUsed', 'cumulativeGasUsed', 'gasUsed', 'transactionIndex'].forEach(function (input) {
      it('formats ' + input + ' number as hexnumber', function () {
        var block = {};

        block[input] = 0x123;
        var formatted = (0, _output.outReceipt)(block)[input];

        (0, _chai.expect)((0, _types.isInstanceOf)(formatted, _bignumber2.default)).to.be.true;
        (0, _chai.expect)(formatted.toString(16)).to.equal('123');
      });
    });

    it('ignores and passes through unknown keys', function () {
      (0, _chai.expect)((0, _output.outReceipt)({ someRandom: 'someRandom' })).to.deep.equal({ someRandom: 'someRandom' });
    });

    it('formats a receipt with all the info converted', function () {
      (0, _chai.expect)(
      (0, _output.outReceipt)({
        contractAddress: address,
        blockNumber: '0x100',
        cumulativeGasUsed: '0x101',
        gasUsed: '0x102',
        transactionIndex: '0x103',
        extraData: 'someExtraStuffInHere' })).

      to.deep.equal({
        contractAddress: checksum,
        blockNumber: new _bignumber2.default('0x100'),
        cumulativeGasUsed: new _bignumber2.default('0x101'),
        gasUsed: new _bignumber2.default('0x102'),
        transactionIndex: new _bignumber2.default('0x103'),
        extraData: 'someExtraStuffInHere' });

    });
  });

  describe('outRecentDapps', function () {
    it('formats the URLs with timestamps', function () {
      (0, _chai.expect)((0, _output.outRecentDapps)({ testing: 0x57513668 })).to.deep.equal({
        testing: new Date('2016-06-03T07:48:56.000Z') });

    });
  });

  describe('outSyncing', function () {
    ['currentBlock', 'highestBlock', 'startingBlock', 'warpChunksAmount', 'warpChunksProcessed'].forEach(function (input) {
      it('formats ' + input + ' numbers as a number', function () {
        (0, _chai.expect)((0, _output.outSyncing)(_defineProperty({}, input, '0x123'))).to.deep.equal(_defineProperty({},
        input, new _bignumber2.default('0x123')));

      });
    });

    it('formats blockGap properly', function () {
      (0, _chai.expect)((0, _output.outSyncing)({ blockGap: [0x123, 0x456] })).to.deep.equal({
        blockGap: [new _bignumber2.default(0x123), new _bignumber2.default(0x456)] });

    });
  });

  describe('outTransaction', function () {
    ['from', 'to'].forEach(function (input) {
      it('formats ' + input + ' address as address', function () {
        var block = {};

        block[input] = address;
        var formatted = (0, _output.outTransaction)(block)[input];

        (0, _chai.expect)((0, _address.isAddress)(formatted)).to.be.true;
        (0, _chai.expect)(formatted).to.equal(checksum);
      });
    });

    ['blockNumber', 'gasPrice', 'gas', 'nonce', 'transactionIndex', 'value'].forEach(function (input) {
      it('formats ' + input + ' number as hexnumber', function () {
        var block = {};

        block[input] = 0x123;
        var formatted = (0, _output.outTransaction)(block)[input];

        (0, _chai.expect)((0, _types.isInstanceOf)(formatted, _bignumber2.default)).to.be.true;
        (0, _chai.expect)(formatted.toString(16)).to.equal('123');
      });
    });

    it('passes condition as null when null', function () {
      (0, _chai.expect)((0, _output.outTransaction)({ condition: null })).to.deep.equal({ condition: null });
    });

    it('ignores and passes through unknown keys', function () {
      (0, _chai.expect)((0, _output.outTransaction)({ someRandom: 'someRandom' })).to.deep.equal({ someRandom: 'someRandom' });
    });

    it('formats a transaction with all the info converted', function () {
      (0, _chai.expect)(
      (0, _output.outTransaction)({
        from: address,
        to: address,
        blockNumber: '0x100',
        gasPrice: '0x101',
        gas: '0x102',
        nonce: '0x103',
        transactionIndex: '0x104',
        value: '0x105',
        extraData: 'someExtraStuffInHere' })).

      to.deep.equal({
        from: checksum,
        to: checksum,
        blockNumber: new _bignumber2.default('0x100'),
        gasPrice: new _bignumber2.default('0x101'),
        gas: new _bignumber2.default('0x102'),
        nonce: new _bignumber2.default('0x103'),
        transactionIndex: new _bignumber2.default('0x104'),
        value: new _bignumber2.default('0x105'),
        extraData: 'someExtraStuffInHere' });

    });
  });

  describe('outTrace', function () {
    it('ignores and passes through unknown keys', function () {
      (0, _chai.expect)((0, _output.outTrace)({ someRandom: 'someRandom' })).to.deep.equal({ someRandom: 'someRandom' });
    });

    it('formats a trace with all the info converted', function () {
      var formatted = (0, _output.outTrace)({
        type: 'call',
        action: {
          from: address,
          to: address,
          value: '0x06',
          gas: '0x07',
          input: '0x1234',
          callType: 'call' },

        result: {
          gasUsed: '0x08',
          output: '0x5678' },

        traceAddress: ['0x2'],
        subtraces: 3,
        transactionPosition: '0xb',
        transactionHash: '0x000000000000000000000000000000000000000000000000000000000000000c',
        blockNumber: '0x0d',
        blockHash: '0x000000000000000000000000000000000000000000000000000000000000000e' });


      (0, _chai.expect)((0, _types.isBigNumber)(formatted.action.gas)).to.be.true;
      (0, _chai.expect)(formatted.action.gas.toNumber()).to.equal(7);
      (0, _chai.expect)((0, _types.isBigNumber)(formatted.action.value)).to.be.true;
      (0, _chai.expect)(formatted.action.value.toNumber()).to.equal(6);

      (0, _chai.expect)(formatted.action.from).to.equal(checksum);
      (0, _chai.expect)(formatted.action.to).to.equal(checksum);

      (0, _chai.expect)((0, _types.isBigNumber)(formatted.blockNumber)).to.be.true;
      (0, _chai.expect)(formatted.blockNumber.toNumber()).to.equal(13);
      (0, _chai.expect)((0, _types.isBigNumber)(formatted.transactionPosition)).to.be.true;
      (0, _chai.expect)(formatted.transactionPosition.toNumber()).to.equal(11);
    });
  });

  describe('outVaultMeta', function () {
    it('returns an exmpt object on null', function () {
      (0, _chai.expect)((0, _output.outVaultMeta)(null)).to.deep.equal({});
    });

    it('returns the original value if not string', function () {
      (0, _chai.expect)((0, _output.outVaultMeta)({ test: 123 })).to.deep.equal({ test: 123 });
    });

    it('returns an object from JSON string', function () {
      (0, _chai.expect)((0, _output.outVaultMeta)('{"test":123}')).to.deep.equal({ test: 123 });
    });

    it('returns an empty object on invalid JSON', function () {
      (0, _chai.expect)((0, _output.outVaultMeta)('{"test"}')).to.deep.equal({});
    });
  });
});