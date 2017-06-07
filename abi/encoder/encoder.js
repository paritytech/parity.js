'use strict';Object.defineProperty(exports, "__esModule", { value: true });var _createClass = function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};}();var _pad = require('../util/pad');
var _mediate = require('./mediate');var _mediate2 = _interopRequireDefault(_mediate);
var _token = require('../token');var _token2 = _interopRequireDefault(_token);
var _types = require('../util/types');function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}var

Encoder = function () {function Encoder() {_classCallCheck(this, Encoder);}_createClass(Encoder, null, [{ key: 'encode', value: function encode(
    tokens) {
      if (!(0, _types.isArray)(tokens)) {
        throw new Error('tokens should be array of Token');
      }

      var mediates = tokens.map(function (token, index) {return Encoder.encodeToken(token, index);});
      var inits = mediates.
      map(function (mediate, idx) {return mediate.init(_mediate2.default.offsetFor(mediates, idx));}).
      join('');
      var closings = mediates.
      map(function (mediate, idx) {return mediate.closing(_mediate2.default.offsetFor(mediates, idx));}).
      join('');

      return '' + inits + closings;
    } }, { key: 'encodeToken', value: function encodeToken(

    token) {var index = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      if (!(0, _types.isInstanceOf)(token, _token2.default)) {
        throw new Error('token should be instanceof Token');
      }

      try {
        switch (token.type) {
          case 'address':
            return new _mediate2.default('raw', (0, _pad.padAddress)(token.value));

          case 'int':
          case 'uint':
            return new _mediate2.default('raw', (0, _pad.padU32)(token.value));

          case 'bool':
            return new _mediate2.default('raw', (0, _pad.padBool)(token.value));

          case 'fixedBytes':
            return new _mediate2.default('raw', (0, _pad.padFixedBytes)(token.value));

          case 'bytes':
            return new _mediate2.default('prefixed', (0, _pad.padBytes)(token.value));

          case 'string':
            return new _mediate2.default('prefixed', (0, _pad.padString)(token.value));

          case 'fixedArray':
          case 'array':
            return new _mediate2.default(token.type, token.value.map(function (token) {return Encoder.encodeToken(token);}));

          default:
            throw new Error('Invalid token type ' + token.type + ' in encodeToken');}

      } catch (e) {
        throw new Error('Cannot encode token #' + index + ' [' + token.type + ': ' + token.value + ']. ' + e.message);
      }
    } }]);return Encoder;}();exports.default = Encoder;module.exports = exports['default'];