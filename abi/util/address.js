'use strict';Object.defineProperty(exports, "__esModule", { value: true });exports.

isChecksumValid = isChecksumValid;exports.

















isAddress = isAddress;exports.













toChecksumAddress = toChecksumAddress;var _jsSha = require('js-sha3'); // eslint-disable-line camelcase
function isChecksumValid(_address) {var address = _address.replace('0x', '');var hash = (0, _jsSha.keccak_256)(address.toLowerCase());for (var n = 0; n < 40; n++) {var char = address[n];var isLower = char !== char.toUpperCase();var isUpper = char !== char.toLowerCase();var hashval = parseInt(hash[n], 16);if (hashval > 7 && isLower || hashval <= 7 && isUpper) {return false;}}return true;}function isAddress(address) {if (address && address.length === 42) {if (!/^(0x)?[0-9a-f]{40}$/i.test(address)) {return false;} else if (/^(0x)?[0-9a-f]{40}$/.test(address) || /^(0x)?[0-9A-F]{40}$/.test(address)) {return true;}return isChecksumValid(address);}return false;}function toChecksumAddress(_address) {var address = (_address || '').toLowerCase();

  if (!isAddress(address)) {
    return '';
  }

  var hash = (0, _jsSha.keccak_256)(address.slice(-40));
  var result = '0x';

  for (var n = 0; n < 40; n++) {
    result = '' + result + (parseInt(hash[n], 16) > 7 ? address[n + 2].toUpperCase() : address[n + 2]);
  }

  return result;
}