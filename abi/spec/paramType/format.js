'use strict';Object.defineProperty(exports, "__esModule", { value: true });exports.

toParamType = toParamType;exports.




































fromParamType = fromParamType;var _ = require('./');var _2 = _interopRequireDefault(_);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function toParamType(type, indexed) {if (type[type.length - 1] === ']') {var last = type.lastIndexOf('[');var length = type.substr(last + 1, type.length - last - 2);var subtype = toParamType(type.substr(0, last));if (length.length === 0) {return new _2.default('array', subtype, 0, indexed);}return new _2.default('fixedArray', subtype, parseInt(length, 10), indexed);}switch (type) {case 'address':case 'bool':case 'bytes':case 'string':return new _2.default(type, null, 0, indexed);case 'int':case 'uint':return new _2.default(type, null, 256, indexed);default:if (type.indexOf('uint') === 0) {return new _2.default('uint', null, parseInt(type.substr(4), 10), indexed);} else if (type.indexOf('int') === 0) {return new _2.default('int', null, parseInt(type.substr(3), 10), indexed);} else if (type.indexOf('bytes') === 0) {return new _2.default('fixedBytes', null, parseInt(type.substr(5), 10), indexed);}throw new Error('Cannot convert ' + type + ' to valid ParamType');}}function fromParamType(paramType) {
  switch (paramType.type) {
    case 'address':
    case 'bool':
    case 'bytes':
    case 'string':
      return paramType.type;

    case 'int':
    case 'uint':
      return '' + paramType.type + paramType.length;

    case 'fixedBytes':
      return 'bytes' + paramType.length;

    case 'fixedArray':
      return fromParamType(paramType.subtype) + '[' + paramType.length + ']';

    case 'array':
      return fromParamType(paramType.subtype) + '[]';

    default:
      throw new Error('Cannot convert from ParamType ' + paramType.type);}

}