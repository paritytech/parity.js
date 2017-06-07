'use strict';Object.defineProperty(exports, "__esModule", { value: true });var _types = require('../types');
var _helpers = require('../helpers');exports.default =

{
  listening: {
    desc: 'Returns `true` if client is actively listening for network connections.',
    params: [],
    returns: {
      type: Boolean,
      desc: '`true` when listening, otherwise `false`.',
      example: true } },



  peerCount: {
    desc: 'Returns number of peers currenly connected to the client.',
    params: [],
    returns: {
      type: _types.Quantity,
      desc: 'Integer of the number of connected peers',
      format: 'utils.toDecimal',
      example: (0, _helpers.fromDecimal)(2) } },



  version: {
    desc: 'Returns the current network protocol version.',
    params: [],
    returns: {
      type: String,
      desc: 'The current network protocol version',
      example: '8995' } } };module.exports = exports['default'];