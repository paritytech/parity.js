'use strict';Object.defineProperty(exports, "__esModule", { value: true });exports.




sha3 = sha3;var _jsSha = require('js-sha3');var _format = require('./format');var _types = require('./types'); // eslint-disable-line
function sha3(value, options) {var forceHex = options && options.encoding === 'hex';

  if (forceHex || !options && (0, _types.isHex)(value)) {
    var bytes = (0, _format.hexToBytes)(value);

    return sha3(bytes);
  }

  var hash = (0, _jsSha.keccak_256)(value);

  return '0x' + hash;
}

sha3.text = function (val) {return sha3(val, { encoding: 'raw' });};