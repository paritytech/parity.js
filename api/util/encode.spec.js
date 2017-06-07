'use strict';var _chai = require('chai');
var _encode = require('./encode');

var ABI = {
  type: 'function',
  name: 'valid',
  inputs: [
  { type: 'uint256' },
  { type: 'bool' }] };



var RESULT = [
'f87fa141',
'0000000000000000000000000000000000000000000000000000000000000123',
'0000000000000000000000000000000000000000000000000000000000000001'].
join('');
var VARIABLE = [
'5a6fbce0',
'c5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470',
'0000000000000000000000000000000000000000000000000000000000000040',
'000000000000000000000000000000000000000000000000000000000000000f',
'687474703a2f2f666f6f2e6261722f0000000000000000000000000000000000'].
join('');

describe('api/util/encode', function () {
  describe('encodeMethodCallAbi', function () {
    it('encodes calls with the correct result', function () {
      (0, _chai.expect)((0, _encode.encodeMethodCallAbi)(ABI, [0x123, true])).to.equal('0x' + RESULT);
    });
  });

  describe('abiEncode', function () {
    it('encodes calls with the correct result', function () {
      (0, _chai.expect)((0, _encode.abiEncode)('valid', ['uint256', 'bool'], [0x123, true])).to.equal('0x' + RESULT);
    });

    it('encodes variable values', function () {
      (0, _chai.expect)(
      (0, _encode.abiEncode)(
      'hintUrl', ['bytes32', 'string'], ['0xc5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470', 'http://foo.bar/'])).

      to.equal('0x' + VARIABLE);
    });

    it('encodes only the data with null name', function () {
      (0, _chai.expect)(
      (0, _encode.abiEncode)(null, ['uint256', 'bool'], [0x123, true])).
      to.equal('0x' + RESULT.substr(8));
    });
  });

  describe('abiUnencode', function () {
    it('decodes data correctly from abi', function () {
      (0, _chai.expect)(
      (0, _encode.abiUnencode)([{
        name: 'test',
        type: 'function',
        inputs: [
        { type: 'uint', name: 'arga' }] }],

      '0x1acb6f7700000000000000000000000000000038')).
      to.deep.equal(['test', { arga: 56 }, [56]]);
    });
  });

  // Same example as in abi/util/signature.spec.js
  describe('abiSignature', function () {
    it('encodes baz(uint32,bool) correctly', function () {
      (0, _chai.expect)(
      (0, _encode.abiSignature)('baz', ['uint32', 'bool'])).
      to.equal('0xcdcd77c0992ec5bbfc459984220f8c45084cc24d9b6efed1fae540db8de801d2');
    });
  });
});