'use strict';Object.defineProperty(exports, "__esModule", { value: true });exports.

bytesToHex = bytesToHex;exports.



cleanupValue = cleanupValue;exports.































hexToBytes = hexToBytes;exports.










hexToAscii = hexToAscii;exports.






bytesToAscii = bytesToAscii;exports.



asciiToHex = asciiToHex;exports.



padRight = padRight;exports.





padLeft = padLeft;exports.





toHex = toHex;var _lodash = require('lodash');function bytesToHex(bytes) {return '0x' + Buffer.from(bytes).toString('hex');}function cleanupValue(value, type) {// TODO: make work with arbitrary depth arrays
  if (value instanceof Array && type.match(/bytes[0-9]+/)) {// figure out if it's an ASCII string hiding in there:
    var ascii = '';for (var index = 0, ended = false; index < value.length && ascii !== null; ++index) {var val = value[index];if (val === 0) {ended = true;} else {ascii += String.fromCharCode(val);}if (ended && val !== 0 || !ended && (val < 32 || val >= 128)) {ascii = null;}}value = ascii === null ? bytesToHex(value) : ascii;}if (type.substr(0, 4) === 'uint' && +type.substr(4) <= 48) {value = +value;}return value;}function hexToBytes(hex) {var raw = toHex(hex).slice(2);var bytes = [];for (var i = 0; i < raw.length; i += 2) {bytes.push(parseInt(raw.substr(i, 2), 16));}return bytes;}function hexToAscii(hex) {var bytes = hexToBytes(hex);var str = bytes.map(function (byte) {return String.fromCharCode(byte);}).join('');return str;}function bytesToAscii(bytes) {return bytes.map(function (b) {return String.fromCharCode(b % 512);}).join('');}function asciiToHex(string) {return '0x' + string.split('').map(function (s) {return s.charCodeAt(0).toString(16);}).join('');}function padRight(input, length) {var value = toHex(input).substr(2, length * 2);return '0x' + value + (0, _lodash.range)(length * 2 - value.length).map(function () {return '0';}).join('');}function padLeft(input, length) {var value = toHex(input).substr(2, length * 2);return '0x' + (0, _lodash.range)(length * 2 - value.length).map(function () {return '0';}).join('') + value;}function toHex(str) {if (str && str.toString) {str = str.toString(16);
  }

  if (str && str.substr(0, 2) === '0x') {
    return str.toLowerCase();
  }

  return '0x' + (str || '').toLowerCase();
}