'use strict';Object.defineProperty(exports, "__esModule", { value: true });exports.ERROR_CODES = undefined;var _createClass = function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};}();var _es6Error = require('es6-error');var _es6Error2 = _interopRequireDefault(_es6Error);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self, call) {if (!self) {throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call && (typeof call === "object" || typeof call === "function") ? call : self;}function _inherits(subClass, superClass) {if (typeof superClass !== "function" && superClass !== null) {throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;}

var ERROR_CODES = exports.ERROR_CODES = {
  UNSUPPORTED_REQUEST: -32000,
  NO_WORK: -32001,
  NO_AUTHOR: -32002,
  NO_NEW_WORK: -32003,
  NOT_ENOUGH_DATA: -32006,
  UNKNOWN_ERROR: -32009,
  TRANSACTION_ERROR: -32010,
  EXECUTION_ERROR: -32015,
  EXCEPTION_ERROR: -32016,
  ACCOUNT_LOCKED: -32020,
  PASSWORD_INVALID: -32021,
  ACCOUNT_ERROR: -32023,
  SIGNER_DISABLED: -32030,
  DAPPS_DISABLED: -32031,
  NETWORK_DISABLED: -32035,
  REQUEST_REJECTED: -32040,
  REQUEST_REJECTED_LIMIT: -32041,
  REQUEST_NOT_FOUND: -32042,
  COMPILATION_ERROR: -32050,
  ENCRYPTION_ERROR: -32055,
  FETCH_ERROR: -32060,
  INVALID_PARAMS: -32602 };var


TransportError = function (_ExtendableError) {_inherits(TransportError, _ExtendableError);_createClass(TransportError, null, [{ key: 'requestRejected', value: function requestRejected()
    {var method = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
      return new TransportError(method, ERROR_CODES.REQUEST_REJECTED, 'Request has been rejected.');
    } }]);

  function TransportError(method, code, message) {_classCallCheck(this, TransportError);
    var m = method + ': ' + code + ': ' + message;var _this = _possibleConstructorReturn(this, (TransportError.__proto__ || Object.getPrototypeOf(TransportError)).call(this,

    m));

    _this.code = code;
    _this.type = Object.keys(ERROR_CODES).find(function (k) {return ERROR_CODES[k] === code;}) || '';

    _this.method = method;
    _this.text = message;return _this;
  }return TransportError;}(_es6Error2.default);exports.default = TransportError;