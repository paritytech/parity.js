'use strict';Object.defineProperty(exports, "__esModule", { value: true });exports.








padAddress = padAddress;exports.





padBool = padBool;exports.



padU32 = padU32;exports.






















padBytes = padBytes;exports.





padFixedBytes = padFixedBytes;exports.







padString = padString;var _bignumber = require('bignumber.js');var _bignumber2 = _interopRequireDefault(_bignumber);var _utf = require('utf8');var _utf2 = _interopRequireDefault(_utf);var _types = require('./types');function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var ZERO_64 = '0000000000000000000000000000000000000000000000000000000000000000';function padAddress(_input) {var input = _input.substr(0, 2) === '0x' ? _input.substr(2) : _input;return ('' + ZERO_64 + input).slice(-64);}function padBool(input) {return ('' + ZERO_64 + (input ? '1' : '0')).slice(-64);}function padU32(input) {var bn = new _bignumber2.default(input);if (bn.lessThan(0)) {bn = new _bignumber2.default('ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff', 16).plus(bn).plus(1);}return ('' + ZERO_64 + bn.toString(16)).slice(-64);}function stringToBytes(input) {if ((0, _types.isArray)(input)) {return input;} else if (input.substr(0, 2) === '0x') {var matches = input.substr(2).toLowerCase().match(/.{1,2}/g) || [];return matches.map(function (value) {return parseInt(value, 16);});} else {return input.split('').map(function (char) {return char.charCodeAt(0);});}}function padBytes(_input) {var input = stringToBytes(_input);return '' + padU32(input.length) + padFixedBytes(input);}function padFixedBytes(_input) {var input = stringToBytes(_input);var sinput = input.map(function (code) {return ('0' + code.toString(16)).slice(-2);}).join('');var max = Math.floor((sinput.length + 63) / 64) * 64;return ('' + sinput + ZERO_64).substr(0, max);}function padString(input) {
  var array = _utf2.default.encode(input).
  split('').
  map(function (char) {return char.charCodeAt(0);});

  return padBytes(array);
}