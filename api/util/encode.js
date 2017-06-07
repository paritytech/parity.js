'use strict';Object.defineProperty(exports, "__esModule", { value: true });exports.






encodeMethodCallAbi = encodeMethodCallAbi;exports.







abiEncode = abiEncode;exports.











abiUnencode = abiUnencode;exports.






















abiSignature = abiSignature;var _abi = require('../../abi');var _abi2 = _interopRequireDefault(_abi);var _function = require('../../abi/spec/function');var _function2 = _interopRequireDefault(_function);var _decode = require('./decode');var _format = require('./format');var _sha = require('./sha3');function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function encodeMethodCallAbi() {var methodAbi = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};var values = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];var func = new _function2.default(methodAbi);var tokens = _abi2.default.encodeTokens(func.inputParamTypes(), values);var call = func.encodeCall(tokens);return '0x' + call;}function abiEncode(methodName, inputTypes, data) {var result = encodeMethodCallAbi({ name: methodName || '', type: 'function', inputs: inputTypes.map(function (type) {return { type: type };}) }, data);return result;}function abiUnencode(abi, data) {var callsig = data.substr(2, 8);var op = abi.find(function (field) {return field.type === 'function' && abiSignature(field.name, field.inputs.map(function (input) {return input.type;})).substr(2, 8) === callsig;});if (!op) {console.warn('Unknown function ID: ' + callsig);return null;}var argsByIndex = (0, _decode.abiDecode)(op.inputs.map(function (field) {return field.type;}), '0x' + data.substr(10)).map(function (value, index) {return (0, _format.cleanupValue)(value, op.inputs[index].type);});var argsByName = op.inputs.reduce(function (result, field, index) {result[field.name] = argsByIndex[index];return result;}, {});return [op.name, argsByName, argsByIndex];}function abiSignature(name, inputs) {
  return (0, _sha.sha3)(name + '(' + inputs.join() + ')');
}