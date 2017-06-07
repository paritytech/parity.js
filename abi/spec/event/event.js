'use strict';Object.defineProperty(exports, "__esModule", { value: true });var _createClass = function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};}();var _decoder = require('../../decoder/decoder');var _decoder2 = _interopRequireDefault(_decoder);
var _decodedLog = require('./decodedLog');var _decodedLog2 = _interopRequireDefault(_decodedLog);
var _decodedLogParam = require('./decodedLogParam');var _decodedLogParam2 = _interopRequireDefault(_decodedLogParam);
var _eventParam = require('./eventParam');var _eventParam2 = _interopRequireDefault(_eventParam);
var _sliceAs = require('../../util/sliceAs');
var _signature = require('../../util/signature');function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}var

Event = function () {
  function Event(abi) {_classCallCheck(this, Event);
    this._inputs = _eventParam2.default.toEventParams(abi.inputs || []);
    this._anonymous = !!abi.anonymous;var _eventSignature =

    (0, _signature.eventSignature)(abi.name, this.inputParamTypes()),id = _eventSignature.id,name = _eventSignature.name,signature = _eventSignature.signature;

    this._id = id;
    this._name = name;
    this._signature = signature;
  }_createClass(Event, [{ key: 'inputParamTypes', value: function inputParamTypes()





















    {
      return this._inputs.map(function (input) {return input.kind;});
    } }, { key: 'inputParamNames', value: function inputParamNames()

    {
      return this._inputs.map(function (input) {return input.name;});
    } }, { key: 'indexedParams', value: function indexedParams(

    indexed) {
      return this._inputs.filter(function (input) {return input.indexed === indexed;});
    } }, { key: 'decodeLog', value: function decodeLog(

    topics, data) {
      var topicParams = this.indexedParams(true);
      var dataParams = this.indexedParams(false);

      var address = void 0;
      var toSkip = void 0;

      if (!this.anonymous) {
        address = (0, _sliceAs.asAddress)(topics[0]);
        toSkip = 1;
      } else {
        toSkip = 0;
      }

      var topicTypes = topicParams.map(function (param) {return param.kind;});
      var flatTopics = topics.
      filter(function (topic, idx) {return idx >= toSkip;}).
      map(function (topic) {
        return topic.substr(0, 2) === '0x' ?
        topic.substr(2) :
        topic;
      }).join('');
      var topicTokens = _decoder2.default.decode(topicTypes, flatTopics);

      if (topicTokens.length !== topics.length - toSkip) {
        throw new Error('Invalid topic data');
      }

      var dataTypes = dataParams.map(function (param) {return param.kind;});
      var dataTokens = _decoder2.default.decode(dataTypes, data);

      var namedTokens = {};

      topicParams.forEach(function (param, idx) {
        namedTokens[param.name || idx] = topicTokens[idx];
      });
      dataParams.forEach(function (param, idx) {
        namedTokens[param.name || idx] = dataTokens[idx];
      });

      var inputParamTypes = this.inputParamTypes();
      var decodedParams = this.inputParamNames().
      map(function (name, idx) {return new _decodedLogParam2.default(name, inputParamTypes[idx], namedTokens[name || idx]);});

      return new _decodedLog2.default(decodedParams, address);
    } }, { key: 'name', get: function get() {return this._name;} }, { key: 'id', get: function get() {return this._id;} }, { key: 'inputs', get: function get() {return this._inputs;} }, { key: 'anonymous', get: function get() {return this._anonymous;} }, { key: 'signature', get: function get() {return this._signature;} }]);return Event;}();exports.default = Event;module.exports = exports['default'];