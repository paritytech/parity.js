'use strict';var _slicedToArray = function () {function sliceIterator(arr, i) {var _arr = [];var _n = true;var _d = false;var _e = undefined;try {for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {_arr.push(_s.value);if (i && _arr.length === i) break;}} catch (err) {_d = true;_e = err;} finally {try {if (!_n && _i["return"]) _i["return"]();} finally {if (_d) throw _e;}}return _arr;}return function (arr, i) {if (Array.isArray(arr)) {return arr;} else if (Symbol.iterator in Object(arr)) {return sliceIterator(arr, i);} else {throw new TypeError("Invalid attempt to destructure non-iterable instance");}};}();var _http = require('./http');var _http2 = _interopRequireDefault(_http);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

var http = new _http2.default('http://localhost:8545');

describe('transport/Http', function () {
  it('connects and makes a call to web3_clientVersion', function () {
    return http.execute('web3_clientVersion').then(function (version) {var _version$split =
      version.split('/'),_version$split2 = _slicedToArray(_version$split, 1),client = _version$split2[0];

      expect(client === 'Geth' || client === 'Parity').to.be.ok;
    });
  });
});