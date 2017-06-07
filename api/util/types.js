'use strict';Object.defineProperty(exports, "__esModule", { value: true });exports.



isBigNumber = isBigNumber;exports.



isArray = isArray;exports.



isError = isError;exports.



isFunction = isFunction;exports.



isHex = isHex;exports.


















isObject = isObject;exports.



isString = isString;exports.



isInstanceOf = isInstanceOf;var _bignumber = require('bignumber.js');var _bignumber2 = _interopRequireDefault(_bignumber);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var HEXDIGITS = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f'];function isBigNumber(test) {return isInstanceOf(test, _bignumber2.default);}function isArray(test) {return Object.prototype.toString.call(test) === '[object Array]';}function isError(test) {return Object.prototype.toString.call(test) === '[object Error]';}function isFunction(test) {return Object.prototype.toString.call(test) === '[object Function]';}function isHex(_test) {if (!isString(_test)) {return false;}if (_test.substr(0, 2) === '0x') {return isHex(_test.slice(2));}var test = _test.toLowerCase();var hex = true;for (var idx = 0; hex && idx < test.length; idx++) {hex = HEXDIGITS.includes(test[idx]);}return hex;}function isObject(test) {return Object.prototype.toString.call(test) === '[object Object]';}function isString(test) {return Object.prototype.toString.call(test) === '[object String]';}function isInstanceOf(test, clazz) {
  return test instanceof clazz;
}