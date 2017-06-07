'use strict';Object.defineProperty(exports, "__esModule", { value: true });var _types = require('../types');
var _helpers = require('../helpers');exports.default =

{
  clientVersion: {
    desc: 'Returns the current client version.',
    params: [],
    returns: {
      type: String,
      desc: 'The current client version',
      example: 'Parity//v1.5.0-unstable-9db3f38-20170103/x86_64-linux-gnu/rustc1.14.0' } },



  sha3: {
    desc: 'Returns Keccak-256 (**not** the standardized SHA3-256) of the given data.',
    params: [
    {
      type: String,
      desc: 'The data to convert into a SHA3 hash.',
      example: (0, _helpers.withComment)('0x68656c6c6f20776f726c64', '"hello world"') }],


    returns: {
      type: _types.Data,
      desc: 'The Keccak-256 hash of the given string.',
      example: '0x47173285a8d7341e5e972fc677286384f802f8ef42a5ec5f03bbfa254cb01fad' } } };module.exports = exports['default'];