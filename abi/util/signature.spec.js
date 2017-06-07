'use strict';var _chai = require('chai');
var _signature = require('./signature');

describe('abi/util/signature', function () {
  describe('eventSignature', function () {
    it('encodes signature baz() correctly', function () {
      (0, _chai.expect)((0, _signature.eventSignature)('baz', [])).to.deep.equal({
        id: 'baz()',
        name: 'baz',
        signature: 'a7916fac4f538170f7cd12c148552e2cba9fcd72329a2dd5b07a6fa906488ddf' });

    });

    it('encodes signature baz(uint32) correctly', function () {
      (0, _chai.expect)((0, _signature.eventSignature)('baz', [{ type: 'uint', length: 32 }])).to.deep.equal({
        id: 'baz(uint32)',
        name: 'baz',
        signature: '7d68785e8fc871be024b75964bd86d093511d4bc2dc7cf7bea32c48a0efaecb1' });

    });

    it('encodes signature baz(uint32, bool) correctly', function () {
      (0, _chai.expect)((0, _signature.eventSignature)('baz', [{ type: 'uint', length: 32 }, { type: 'bool' }])).to.deep.equal({
        id: 'baz(uint32,bool)',
        name: 'baz',
        signature: 'cdcd77c0992ec5bbfc459984220f8c45084cc24d9b6efed1fae540db8de801d2' });

    });

    it('encodes no-name signature correctly as ()', function () {
      (0, _chai.expect)((0, _signature.eventSignature)(undefined, [])).to.deep.equal({
        id: '()',
        name: undefined,
        signature: '' });

    });

    it('encodes no-params signature correctly as ()', function () {
      (0, _chai.expect)((0, _signature.eventSignature)(undefined, undefined)).to.deep.equal({
        id: '()',
        name: undefined,
        signature: '' });

    });
  });

  describe('methodSignature', function () {
    it('encodes signature baz() correctly', function () {
      (0, _chai.expect)((0, _signature.methodSignature)('baz', [])).to.deep.equal({
        id: 'baz()',
        name: 'baz',
        signature: 'a7916fac' });

    });

    it('encodes signature baz(uint32) correctly', function () {
      (0, _chai.expect)((0, _signature.methodSignature)('baz', [{ type: 'uint', length: 32 }])).to.deep.equal({
        id: 'baz(uint32)',
        name: 'baz',
        signature: '7d68785e' });

    });

    it('encodes signature baz(uint32, bool) correctly', function () {
      (0, _chai.expect)((0, _signature.methodSignature)('baz', [{ type: 'uint', length: 32 }, { type: 'bool' }])).to.deep.equal({
        id: 'baz(uint32,bool)',
        name: 'baz',
        signature: 'cdcd77c0' });

    });

    it('encodes signature in name correctly', function () {
      (0, _chai.expect)((0, _signature.methodSignature)('baz(uint32,bool)', [{ type: 'uint', length: 32 }, { type: 'bool' }])).to.deep.equal({
        id: 'baz(uint32,bool)',
        name: 'baz',
        signature: 'cdcd77c0' });

    });

    it('encodes no-name signature correctly as ()', function () {
      (0, _chai.expect)((0, _signature.methodSignature)(undefined, [])).to.deep.equal({
        id: '()',
        name: undefined,
        signature: '' });

    });

    it('encodes no-params signature correctly as ()', function () {
      (0, _chai.expect)((0, _signature.methodSignature)(undefined, undefined)).to.deep.equal({
        id: '()',
        name: undefined,
        signature: '' });

    });
  });
});