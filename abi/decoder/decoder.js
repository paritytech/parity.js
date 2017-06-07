'use strict';Object.defineProperty(exports, "__esModule", { value: true });var _createClass = function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};}();

var _utf = require('utf8');var _utf2 = _interopRequireDefault(_utf);

var _token = require('../token');var _token2 = _interopRequireDefault(_token);
var _bytesTaken = require('./bytesTaken');var _bytesTaken2 = _interopRequireDefault(_bytesTaken);
var _decodeResult = require('./decodeResult');var _decodeResult2 = _interopRequireDefault(_decodeResult);
var _paramType = require('../spec/paramType');var _paramType2 = _interopRequireDefault(_paramType);
var _slice = require('../util/slice');
var _sliceAs = require('../util/sliceAs');
var _types = require('../util/types');function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}

var NULL = '0000000000000000000000000000000000000000000000000000000000000000';var

Decoder = function () {function Decoder() {_classCallCheck(this, Decoder);}_createClass(Decoder, null, [{ key: 'decode', value: function decode(
    params, data) {
      if (!(0, _types.isArray)(params)) {
        throw new Error('Parameters should be array of ParamType');
      }

      var slices = (0, _slice.sliceData)(data);
      var offset = 0;

      return params.map(function (param) {
        var result = Decoder.decodeParam(param, slices, offset);

        offset = result.newOffset;
        return result.token;
      });
    } }, { key: 'peek', value: function peek(

    slices, position) {
      if (!slices || !slices[position]) {
        return NULL;
      }

      return slices[position];
    } }, { key: 'takeBytes', value: function takeBytes(

    slices, position, length) {
      var slicesLength = Math.floor((length + 31) / 32);
      var bytesStr = '';

      for (var idx = 0; idx < slicesLength; idx++) {
        bytesStr = '' + bytesStr + Decoder.peek(slices, position + idx);
      }

      var bytes = (bytesStr.substr(0, length * 2).match(/.{1,2}/g) || []).map(function (code) {return parseInt(code, 16);});

      return new _bytesTaken2.default(bytes, position + slicesLength);
    } }, { key: 'decodeParam', value: function decodeParam(

    param, slices, offset) {
      if (!(0, _types.isInstanceOf)(param, _paramType2.default)) {
        throw new Error('param should be instanceof ParamType');
      }

      var tokens = [];
      var taken = void 0;
      var lengthOffset = void 0;
      var length = void 0;
      var newOffset = void 0;

      switch (param.type) {
        case 'address':
          return new _decodeResult2.default(new _token2.default(param.type, (0, _sliceAs.asAddress)(Decoder.peek(slices, offset))), offset + 1);

        case 'bool':
          return new _decodeResult2.default(new _token2.default(param.type, (0, _sliceAs.asBool)(Decoder.peek(slices, offset))), offset + 1);

        case 'int':
          return new _decodeResult2.default(new _token2.default(param.type, (0, _sliceAs.asI32)(Decoder.peek(slices, offset))), offset + 1);

        case 'uint':
          return new _decodeResult2.default(new _token2.default(param.type, (0, _sliceAs.asU32)(Decoder.peek(slices, offset))), offset + 1);

        case 'fixedBytes':
          taken = Decoder.takeBytes(slices, offset, param.length);

          return new _decodeResult2.default(new _token2.default(param.type, taken.bytes), taken.newOffset);

        case 'bytes':
          lengthOffset = (0, _sliceAs.asU32)(Decoder.peek(slices, offset)).div(32).toNumber();
          length = (0, _sliceAs.asU32)(Decoder.peek(slices, lengthOffset)).toNumber();
          taken = Decoder.takeBytes(slices, lengthOffset + 1, length);

          return new _decodeResult2.default(new _token2.default(param.type, taken.bytes), offset + 1);

        case 'string':
          if (param.indexed) {
            taken = Decoder.takeBytes(slices, offset, 32);

            return new _decodeResult2.default(new _token2.default('fixedBytes', taken.bytes), offset + 1);
          }

          lengthOffset = (0, _sliceAs.asU32)(Decoder.peek(slices, offset)).div(32).toNumber();
          length = (0, _sliceAs.asU32)(Decoder.peek(slices, lengthOffset)).toNumber();
          taken = Decoder.takeBytes(slices, lengthOffset + 1, length);

          var str = taken.bytes.map(function (code) {return String.fromCharCode(code);}).join('');

          var decoded = void 0;

          try {
            decoded = _utf2.default.decode(str);
          } catch (error) {
            decoded = str;
          }

          return new _decodeResult2.default(new _token2.default(param.type, decoded), offset + 1);

        case 'array':
          lengthOffset = (0, _sliceAs.asU32)(Decoder.peek(slices, offset)).div(32).toNumber();
          length = (0, _sliceAs.asU32)(Decoder.peek(slices, lengthOffset)).toNumber();
          newOffset = lengthOffset + 1;

          for (var idx = 0; idx < length; idx++) {
            var result = Decoder.decodeParam(param.subtype, slices, newOffset);

            newOffset = result.newOffset;
            tokens.push(result.token);
          }

          return new _decodeResult2.default(new _token2.default(param.type, tokens), offset + 1);

        case 'fixedArray':
          newOffset = offset;

          for (var _idx = 0; _idx < param.length; _idx++) {
            var _result = Decoder.decodeParam(param.subtype, slices, newOffset);

            newOffset = _result.newOffset;
            tokens.push(_result.token);
          }

          return new _decodeResult2.default(new _token2.default(param.type, tokens), newOffset);

        default:
          throw new Error('Invalid param type ' + param.type + ' in decodeParam');}

    } }]);return Decoder;}();exports.default = Decoder;module.exports = exports['default'];