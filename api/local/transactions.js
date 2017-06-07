'use strict';Object.defineProperty(exports, "__esModule", { value: true });var _createClass = function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};}();var _format = require('../util/format');
var _transport = require('../transport');function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}

var AWAITING = Symbol('awaiting');
var LOCKED = Symbol('locked');
var CONFIRMED = Symbol('confirmed');
var REJECTED = Symbol('rejected');var

Transactions = function () {
  function Transactions() {_classCallCheck(this, Transactions);
    this.reset();
  }

  // should only really be needed in the constructor and tests
  _createClass(Transactions, [{ key: 'reset', value: function reset() {
      this._id = 1;
      this._states = {};
    } }, { key: 'nextId', value: function nextId()

    {
      return (0, _format.toHex)(this._id++);
    } }, { key: 'add', value: function add(

    tx) {
      var id = this.nextId();

      this._states[id] = {
        status: AWAITING,
        transaction: tx };


      return id;
    } }, { key: 'get', value: function get(

    id) {
      var state = this._states[id];

      if (!state || state.status !== AWAITING) {
        return null;
      }

      return state.transaction;
    } }, { key: 'lock', value: function lock(

    id) {
      var state = this._states[id];

      if (!state || state.status !== AWAITING) {
        throw new Error('Trying to lock an invalid transaction');
      }

      state.status = LOCKED;
    } }, { key: 'unlock', value: function unlock(

    id) {
      var state = this._states[id];

      if (!state || state.status !== LOCKED) {
        throw new Error('Trying to unlock an invalid transaction');
      }

      state.status = AWAITING;
    } }, { key: 'hash', value: function hash(

    id) {
      var state = this._states[id];

      if (!state) {
        return null;
      }

      switch (state.status) {
        case REJECTED:
          throw _transport.TransportError.requestRejected();
        case CONFIRMED:
          return state.hash;
        default:
          return null;}

    } }, { key: 'confirm', value: function confirm(

    id, hash) {
      var state = this._states[id];
      var status = state ? state.status : null;

      switch (status) {
        case AWAITING:break;
        case LOCKED:break;
        default:throw new Error('Trying to confirm an invalid transaction');}


      state.hash = hash;
      state.status = CONFIRMED;
    } }, { key: 'reject', value: function reject(

    id) {
      var state = this._states[id];

      if (!state) {
        return false;
      }

      state.status = REJECTED;

      return true;
    } }, { key: 'requestsToConfirm', value: function requestsToConfirm()

    {var _this = this;
      var result = [];

      Object.keys(this._states).forEach(function (id) {
        var state = _this._states[id];

        if (state.status === AWAITING) {
          result.push({
            id: id,
            origin: {
              signer: '0x0' },

            payload: {
              sendTransaction: state.transaction } });


        }
      });

      return result;
    } }]);return Transactions;}();exports.default =


new Transactions();module.exports = exports['default'];