'use strict';var _slicedToArray = function () {function sliceIterator(arr, i) {var _arr = [];var _n = true;var _d = false;var _e = undefined;try {for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {_arr.push(_s.value);if (i && _arr.length === i) break;}} catch (err) {_d = true;_e = err;} finally {try {if (!_n && _i["return"]) _i["return"]();} finally {if (_d) throw _e;}}return _arr;}return function (arr, i) {if (Array.isArray(arr)) {return arr;} else if (Symbol.iterator in Object(arr)) {return sliceIterator(arr, i);} else {throw new TypeError("Invalid attempt to destructure non-iterable instance");}};}();var _ethapi = require('../../../../test/e2e/ethapi');
var _types = require('../../../../test/types');

describe('ethapi.web3', function () {
  var ethapi = (0, _ethapi.createHttpApi)();

  describe('clientVersion', function () {
    it('returns the client version', function () {
      return ethapi.web3.clientVersion().then(function (version) {var _version$split =
        version.split('/'),_version$split2 = _slicedToArray(_version$split, 1),client = _version$split2[0];

        expect(client === 'Parity' || client === 'Geth').to.be.ok;
      });
    });
  });

  describe('sha3', function () {
    it('returns a keccak256 sha', function () {
      var sha = '0xa7916fac4f538170f7cd12c148552e2cba9fcd72329a2dd5b07a6fa906488ddf';
      var hexStr = 'baz()'.split('').map(function (char) {return char.charCodeAt(0).toString(16);}).join('');

      return ethapi.web3.sha3('0x' + hexStr).then(function (hash) {
        expect((0, _types.isHexNumber)(hash)).to.be.true;
        expect(hash).to.equal(sha);
      });
    });
  });
});