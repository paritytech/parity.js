'use strict';Object.defineProperty(exports, "__esModule", { value: true });var _createClass = function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};}();exports.


























withPreamble = withPreamble;exports.









withComment = withComment;exports.
















fromDecimal = fromDecimal;function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}var Dummy = exports.Dummy = function () {function Dummy(value) {_classCallCheck(this, Dummy);this.value = value;}_createClass(Dummy, [{ key: 'toString', value: function toString() {return this.value;} }, { key: 'toJSON', value: function toJSON() {return '##' + this.value + '##';} }], [{ key: 'fixJSON', value: function fixJSON(json) {return json.replace(/"##([^#]+)##"/g, '$1');} }, { key: 'isDummy', value: function isDummy(obj) {return obj instanceof Dummy;} }, { key: 'stringifyJSON', value: function stringifyJSON(any) {return Dummy.fixJSON(JSON.stringify(any));} }]);return Dummy;}(); // Enrich the API spec by additional markdown-formatted preamble
function withPreamble(preamble, spec) {Object.defineProperty(spec, '_preamble', { value: preamble.trim(), enumerable: false });return spec;} // Enrich any example value with a comment to print in the docs
function withComment(example, comment) {var constructor = example == null ? null : example.constructor;if (constructor === Object || constructor === Array) {Object.defineProperty(example, '_comment', { value: comment, enumerable: false });return example;} // Convert primitives
  return new PrimitiveWithComment(example, comment);} // Turn a decimal number into a hexadecimal string with comment to it's original value
function fromDecimal(decimal) {return withComment('0x' + decimal.toString(16), decimal.toString());} // Internal helper
var PrimitiveWithComment = function () {
  function PrimitiveWithComment(primitive, comment) {_classCallCheck(this, PrimitiveWithComment);
    this._value = primitive;
    this._comment = comment;
  }_createClass(PrimitiveWithComment, [{ key: 'toJSON', value: function toJSON()

    {
      return this._value;
    } }]);return PrimitiveWithComment;}();