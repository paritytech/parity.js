'use strict';Object.defineProperty(exports, "__esModule", { value: true });var _createClass = function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};}();var _pad = require('../util/pad');function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}

var TYPES = ['raw', 'prefixed', 'fixedArray', 'array'];var

Mediate = function () {
  function Mediate(type, value) {_classCallCheck(this, Mediate);
    Mediate.validateType(type);

    this._type = type;
    this._value = value;
  }_createClass(Mediate, [{ key: 'initLength', value: function initLength()

    {
      switch (this._type) {
        case 'raw':
          return this._value.length / 2;

        case 'array':
        case 'prefixed':
          return 32;

        case 'fixedArray':
          return this._value.
          reduce(function (total, mediate) {
            return total + mediate.initLength();
          }, 0);

        default:
          return null;}

    } }, { key: 'closingLength', value: function closingLength()

    {
      switch (this._type) {
        case 'raw':
          return 0;

        case 'prefixed':
          return this._value.length / 2;

        case 'array':
          return this._value.
          reduce(function (total, mediate) {
            return total + mediate.initLength();
          }, 32);

        case 'fixedArray':
          return this._value.
          reduce(function (total, mediate) {
            return total + mediate.initLength() + mediate.closingLength();
          }, 0);

        default:
          return null;}

    } }, { key: 'init', value: function init(

    suffixOffset) {var _this = this;
      switch (this._type) {
        case 'raw':
          return this._value;

        case 'fixedArray':
          return this._value.
          map(function (mediate, idx) {return mediate.init(Mediate.offsetFor(_this._value, idx)).toString(16);}).
          join('');

        case 'prefixed':
        case 'array':
          return (0, _pad.padU32)(suffixOffset);

        default:
          return null;}

    } }, { key: 'closing', value: function closing(

    offset) {var _this2 = this;
      switch (this._type) {
        case 'raw':
          return '';

        case 'prefixed':
          return this._value;

        case 'fixedArray':
          return this._value.
          map(function (mediate, idx) {return mediate.closing(Mediate.offsetFor(_this2._value, idx)).toString(16);}).
          join('');

        case 'array':
          var prefix = (0, _pad.padU32)(this._value.length);
          var inits = this._value.
          map(function (mediate, idx) {return mediate.init(offset + Mediate.offsetFor(_this2._value, idx) + 32).toString(16);}).
          join('');
          var closings = this._value.
          map(function (mediate, idx) {return mediate.closing(offset + Mediate.offsetFor(_this2._value, idx)).toString(16);}).
          join('');

          return '' + prefix + inits + closings;

        default:
          return null;}

    } }, { key: 'type', get: function get()

    {
      return this._type;
    } }, { key: 'value', get: function get()

    {
      return this._value;
    } }], [{ key: 'offsetFor', value: function offsetFor(

    mediates, position) {
      if (position < 0 || position >= mediates.length) {
        throw new Error('Invalid position ' + position + ' specified for Mediate.offsetFor');
      }

      var initLength = mediates.
      reduce(function (total, mediate) {
        return total + mediate.initLength();
      }, 0);

      return mediates.
      slice(0, position).
      reduce(function (total, mediate) {
        return total + mediate.closingLength();
      }, initLength);
    } }, { key: 'validateType', value: function validateType(

    type) {
      if (TYPES.filter(function (_type) {return type === _type;}).length) {
        return true;
      }

      throw new Error('Invalid type ' + type + ' received for Mediate.validateType');
    } }]);return Mediate;}();exports.default = Mediate;module.exports = exports['default'];