'use strict';Object.defineProperty(exports, "__esModule", { value: true });exports.



_getUnitMultiplier = _getUnitMultiplier;exports.









fromWei = fromWei;exports.



toWei = toWei;var _bignumber = require('bignumber.js');var _bignumber2 = _interopRequireDefault(_bignumber);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var UNITS = ['wei', 'ada', 'babbage', 'shannon', 'szabo', 'finney', 'ether', 'kether', 'mether', 'gether', 'tether'];function _getUnitMultiplier(unit) {var position = UNITS.indexOf(unit.toLowerCase());if (position === -1) {throw new Error('Unknown unit ' + unit + ' passed to wei formatter');}return Math.pow(10, position * 3);}function fromWei(value) {var unit = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'ether';return new _bignumber2.default(value).div(_getUnitMultiplier(unit));}function toWei(value) {var unit = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'ether';
  return new _bignumber2.default(value).mul(_getUnitMultiplier(unit));
}