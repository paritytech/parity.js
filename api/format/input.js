'use strict';Object.defineProperty(exports, "__esModule", { value: true });var _extends = Object.assign || function (target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i];for (var key in source) {if (Object.prototype.hasOwnProperty.call(source, key)) {target[key] = source[key];}}}return target;};exports.




inAddress = inAddress;exports.




inAddresses = inAddresses;exports.



inBlockNumber = inBlockNumber;exports.













inData = inData;exports.









inHash = inHash;exports.



inTopics = inTopics;exports.

















inFilter = inFilter;exports.

































inHex = inHex;exports.



inNumber10 = inNumber10;exports.







inNumber16 = inNumber16;exports.











inOptionsCondition = inOptionsCondition;exports.











inOptions = inOptions;exports.










































inTraceFilter = inTraceFilter;exports.























inTraceType = inTraceType;exports.











inDeriveHash = inDeriveHash;exports.









inDeriveIndex = inDeriveIndex;var _bignumber = require('bignumber.js');var _bignumber2 = _interopRequireDefault(_bignumber);var _types = require('../util/types');var _format = require('../util/format');function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function inAddress(address) {// TODO: address validation if we have upper-lower addresses
  return inHex(address);}function inAddresses(addresses) {return (addresses || []).map(inAddress);}function inBlockNumber(blockNumber) {if ((0, _types.isString)(blockNumber)) {switch (blockNumber) {case 'earliest':case 'latest':case 'pending':default:return blockNumber;}}return inNumber16(blockNumber);}function inData(data) {if (data && data.length && !(0, _types.isHex)(data)) {data = data.split('').map(function (chr) {return ('0' + chr.charCodeAt(0).toString(16)).slice(-2);}).join('');}return inHex(data);}function inHash(hash) {return inHex(hash);}function inTopics(_topics) {var topics = (_topics || []).filter(function (topic) {return topic === null || topic;}).map(function (topic) {if (topic === null) {return null;}if (Array.isArray(topic)) {return inTopics(topic);}return (0, _format.padLeft)(topic, 32);});return topics;}function inFilter(options) {if (options) {Object.keys(options).forEach(function (key) {switch (key) {case 'address':if ((0, _types.isArray)(options[key])) {options[key] = options[key].map(inAddress);} else {options[key] = inAddress(options[key]);}break;case 'fromBlock':case 'toBlock':options[key] = inBlockNumber(options[key]);break;case 'limit':options[key] = inNumber10(options[key]);break;case 'topics':options[key] = inTopics(options[key]);break;default:break;}});}return options;}function inHex(str) {return (0, _format.toHex)(str);}function inNumber10(number) {if ((0, _types.isInstanceOf)(number, _bignumber2.default)) {return number.toNumber();}return new _bignumber2.default(number || 0).toNumber();}function inNumber16(number) {var bn = (0, _types.isInstanceOf)(number, _bignumber2.default) ? number : new _bignumber2.default(number || 0);if (!bn.isInteger()) {throw new Error('[format/input::inNumber16] the given number is not an integer: ' + bn.toFormat());}return inHex(bn.toString(16));}function inOptionsCondition(condition) {if (condition) {if (condition.block) {condition.block = condition.block ? inNumber10(condition.block) : null;} else if (condition.time) {condition.time = inNumber10(Math.floor(condition.time.getTime() / 1000));}}return condition;}function inOptions() {var _options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};var options = _extends({}, _options);Object.keys(options).forEach(function (key) {switch (key) {case 'to': // Don't encode the `to` option if it's empty
        // (eg. contract deployments)
        if (options[key]) {options.to = inAddress(options[key]);}break;case 'from':options[key] = inAddress(options[key]);break;case 'condition':options[key] = inOptionsCondition(options[key]);break;case 'gas':case 'gasPrice':options[key] = inNumber16(new _bignumber2.default(options[key]).round());break;case 'value':case 'nonce':options[key] = inNumber16(options[key]);break;case 'data':options[key] = inData(options[key]);break;default:break;}});return options;}function inTraceFilter(filterObject) {if (filterObject) {Object.keys(filterObject).forEach(function (key) {switch (key) {case 'fromAddress':case 'toAddress':filterObject[key] = [].concat(filterObject[key]).map(function (address) {return inAddress(address);});break;case 'toBlock':case 'fromBlock':filterObject[key] = inBlockNumber(filterObject[key]);break;default:break;}});}return filterObject;}function inTraceType(whatTrace) {if ((0, _types.isString)(whatTrace)) {return [whatTrace];}return whatTrace;}function inDeriveType(derive) {return derive && derive.type === 'hard' ? 'hard' : 'soft';}function inDeriveHash(derive) {var hash = derive && derive.hash ? derive.hash : derive;var type = inDeriveType(derive);return { hash: inHex(hash), type: type };}function inDeriveIndex(derive) {if (!derive) {return [];}

  if (!(0, _types.isArray)(derive)) {
    derive = [derive];
  }

  return derive.map(function (item) {
    var index = inNumber10(item && item.index ? item.index : item);

    return {
      index: index,
      type: inDeriveType(item) };

  });
}