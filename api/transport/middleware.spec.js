'use strict';var _slicedToArray = function () {function sliceIterator(arr, i) {var _arr = [];var _n = true;var _d = false;var _e = undefined;try {for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {_arr.push(_s.value);if (i && _arr.length === i) break;}} catch (err) {_d = true;_e = err;} finally {try {if (!_n && _i["return"]) _i["return"]();} finally {if (_d) throw _e;}}return _arr;}return function (arr, i) {if (Array.isArray(arr)) {return arr;} else if (Symbol.iterator in Object(arr)) {return sliceIterator(arr, i);} else {throw new TypeError("Invalid attempt to destructure non-iterable instance");}};}();var _createClass = function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};}();var _chai = require('chai');
var _middleware = require('./middleware');var _middleware2 = _interopRequireDefault(_middleware);
var _jsonRpcBase = require('./jsonRpcBase');var _jsonRpcBase2 = _interopRequireDefault(_jsonRpcBase);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self, call) {if (!self) {throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call && (typeof call === "object" || typeof call === "function") ? call : self;}function _inherits(subClass, superClass) {if (typeof superClass !== "function" && superClass !== null) {throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;}

var MOCKED = 'mocked!';var

MockTransport = function (_JsonRpcBase) {_inherits(MockTransport, _JsonRpcBase);function MockTransport() {_classCallCheck(this, MockTransport);return _possibleConstructorReturn(this, (MockTransport.__proto__ || Object.getPrototypeOf(MockTransport)).apply(this, arguments));}_createClass(MockTransport, [{ key: '_execute', value: function _execute()
    {
      return Promise.resolve(MOCKED);
    } }]);return MockTransport;}(_jsonRpcBase2.default);var


MockMiddleware = function (_Middleware) {_inherits(MockMiddleware, _Middleware);
  function MockMiddleware(transport) {_classCallCheck(this, MockMiddleware);var _this2 = _possibleConstructorReturn(this, (MockMiddleware.__proto__ || Object.getPrototypeOf(MockMiddleware)).call(this,
    transport));

    _this2.register('mock_rpc', function (_ref) {var _ref2 = _slicedToArray(_ref, 1),num = _ref2[0];return num;});
    _this2.register('mock_null', function () {return null;});return _this2;
  }return MockMiddleware;}(_middleware2.default);


describe('api/transport/Middleware', function () {
  var transport = void 0;

  beforeEach(function () {
    transport = new MockTransport();
    transport.addMiddleware(MockMiddleware);
  });

  it('Routes requests to middleware', function () {
    return transport.execute('mock_rpc', [100]).then(function (num) {
      (0, _chai.expect)(num).to.be.equal(100);
    });
  });

  it('Passes non-mocked requests through', function () {
    return transport.execute('not_moced', [200]).then(function (result) {
      (0, _chai.expect)(result).to.be.equal(MOCKED);
    });
  });

  it('Passes mocked requests through, if middleware returns null', function () {
    return transport.execute('mock_null', [300]).then(function (result) {
      (0, _chai.expect)(result).to.be.equal(MOCKED);
    });
  });
});