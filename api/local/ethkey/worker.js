'use strict';var _createClass = function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};}();var _secp256k = require('secp256k1');var _secp256k2 = _interopRequireDefault(_secp256k);
var _jsSha = require('js-sha3');

var _format = require('../../util/format');function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}} // eslint-disable-line

var isWorker = typeof self !== 'undefined'; // eslint-disable-line

// Stay compatible between environments
if (!isWorker) {
  var scope = typeof global === 'undefined' ? window : global;

  scope.self = scope;
}

// keythereum should never be used outside of the browser
var keythereum = require('keythereum');

if (isWorker) {
  keythereum = self.keythereum; // eslint-disable-line
}

function route(_ref) {var action = _ref.action,payload = _ref.payload;
  if (action in actions) {
    return actions[action](payload);
  }

  return null;
}

var actions = {
  phraseToWallet: function phraseToWallet(phrase) {
    var secret = _jsSha.keccak_256.array(phrase);

    for (var i = 0; i < 16384; i++) {
      secret = _jsSha.keccak_256.array(secret);
    }

    while (true) {
      secret = _jsSha.keccak_256.array(secret);

      var secretBuf = Buffer.from(secret);

      if (_secp256k2.default.privateKeyVerify(secretBuf)) {
        // No compression, slice out last 64 bytes
        var publicBuf = _secp256k2.default.publicKeyCreate(secretBuf, false).slice(-64);
        var address = _jsSha.keccak_256.array(publicBuf).slice(12);

        if (address[0] !== 0) {
          continue;
        }

        var wallet = {
          secret: (0, _format.bytesToHex)(secretBuf),
          public: (0, _format.bytesToHex)(publicBuf),
          address: (0, _format.bytesToHex)(address) };


        return wallet;
      }
    }
  },

  verifySecret: function verifySecret(secret) {
    var key = Buffer.from(secret.slice(2), 'hex');

    return _secp256k2.default.privateKeyVerify(key);
  },

  createKeyObject: function createKeyObject(_ref2) {var key = _ref2.key,password = _ref2.password;
    key = Buffer.from(key);
    password = Buffer.from(password);

    var iv = keythereum.crypto.randomBytes(16);
    var salt = keythereum.crypto.randomBytes(32);
    var keyObject = keythereum.dump(password, key, salt, iv);

    return JSON.stringify(keyObject);
  },

  decryptPrivateKey: function decryptPrivateKey(_ref3) {var keyObject = _ref3.keyObject,password = _ref3.password;
    password = Buffer.from(password);

    try {
      var key = keythereum.recover(password, keyObject);

      // Convert to array to safely send from the worker
      return Array.from(key);
    } catch (e) {
      return null;
    }
  } };


self.onmessage = function (_ref4) {var data = _ref4.data; // eslint-disable-line
  try {
    var result = route(data);

    postMessage([null, result]);
  } catch (err) {
    postMessage([err, null]);
  }
};

// Emulate a web worker in Node.js
var KeyWorker = function () {function KeyWorker() {_classCallCheck(this, KeyWorker);}_createClass(KeyWorker, [{ key: 'postMessage', value: function postMessage(
    data) {var _this = this;
      // Force async
      setTimeout(function () {
        try {
          var result = route(data);

          _this.onmessage({ data: [null, result] });
        } catch (err) {
          _this.onmessage({ data: [err, null] });
        }
      }, 0);
    } }, { key: 'onmessage', value: function onmessage(

    event) {
      // no-op to be overriden
    } }]);return KeyWorker;}();


if (exports != null) {
  exports.KeyWorker = KeyWorker;
}