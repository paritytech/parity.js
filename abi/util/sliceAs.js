'use strict';Object.defineProperty(exports, "__esModule", { value: true });exports.



asU32 = asU32;exports.





asI32 = asI32;exports.









asAddress = asAddress;exports.





asBool = asBool;var _bignumber = require('bignumber.js');var _bignumber2 = _interopRequireDefault(_bignumber);var _address = require('./address');function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function asU32(slice) {// TODO: validation
  return new _bignumber2.default(slice, 16);}function asI32(slice) {if (new _bignumber2.default(slice.substr(0, 1), 16).toString(2)[0] === '1') {return new _bignumber2.default(slice, 16).minus(new _bignumber2.default('ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff', 16)).minus(1);}return new _bignumber2.default(slice, 16);}function asAddress(slice) {// TODO: address validation?
  return (0, _address.toChecksumAddress)('0x' + slice.slice(-40));}function asBool(slice) {// TODO: everything else should be 0
  return new _bignumber2.default(slice[63]).eq(1);
}