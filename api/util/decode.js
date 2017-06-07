'use strict';Object.defineProperty(exports, "__esModule", { value: true });exports.




decodeCallData = decodeCallData;exports.





















decodeMethodInput = decodeMethodInput;exports.


















methodToAbi = methodToAbi;exports.

























abiDecode = abiDecode;var _types = require('./types');var _function = require('../../abi/spec/function');var _function2 = _interopRequireDefault(_function);var _format = require('../../abi/spec/paramType/format');function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function decodeCallData(data) {if (!(0, _types.isHex)(data)) {throw new Error('Input to decodeCallData should be a hex value');}if (data.substr(0, 2) === '0x') {return decodeCallData(data.slice(2));}if (data.length < 8) {throw new Error('Input to decodeCallData should be method signature + data');}var signature = data.substr(0, 8);var paramdata = data.substr(8);return { signature: '0x' + signature, paramdata: '0x' + paramdata };}function decodeMethodInput(methodAbi, paramdata) {if (!methodAbi) {throw new Error('decodeMethodInput should receive valid method-specific ABI');}if (paramdata && paramdata.length) {if (!(0, _types.isHex)(paramdata)) {throw new Error('Input to decodeMethodInput should be a hex value');}if (paramdata.substr(0, 2) === '0x') {return decodeMethodInput(methodAbi, paramdata.slice(2));}}return new _function2.default(methodAbi).decodeInput(paramdata).map(function (decoded) {return decoded.value;});} // takes a method in form name(...,types) and returns the inferred abi definition
function methodToAbi(method) {var length = method.length;var typesStart = method.indexOf('(');var typesEnd = method.indexOf(')');if (typesStart === -1) {throw new Error('Missing start ( in call to decodeMethod with ' + method);} else if (typesEnd === -1) {throw new Error('Missing end ) in call to decodeMethod with ' + method);} else if (typesEnd < typesStart) {throw new Error('End ) is before start ( in call to decodeMethod with ' + method);} else if (typesEnd !== length - 1) {throw new Error('Extra characters after end ) in call to decodeMethod with ' + method);}var name = method.substr(0, typesStart);var types = method.substr(typesStart + 1, length - (typesStart + 1) - 1).split(',');var inputs = types.filter(function (_type) {return _type.length;}).map(function (_type) {var type = (0, _format.fromParamType)((0, _format.toParamType)(_type));return { type: type };});return { type: 'function', name: name, inputs: inputs };}function abiDecode(inputTypes, data) {return decodeMethodInput({
    inputs: inputTypes.map(function (type) {
      return { type: type };
    }) },
  data);
}