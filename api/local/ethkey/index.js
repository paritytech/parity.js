'use strict';Object.defineProperty(exports, "__esModule", { value: true });exports.

createKeyObject = createKeyObject;exports.




decryptPrivateKey = decryptPrivateKey;exports.












phraseToAddress = phraseToAddress;exports.




phraseToWallet = phraseToWallet;exports.



verifySecret = verifySecret;var _workerPool = require('./workerPool');var _workerPool2 = _interopRequireDefault(_workerPool);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function createKeyObject(key, password) {return _workerPool2.default.getWorker().action('createKeyObject', { key: key, password: password }).then(function (obj) {return JSON.parse(obj);});}function decryptPrivateKey(keyObject, password) {return _workerPool2.default.getWorker().action('decryptPrivateKey', { keyObject: keyObject, password: password }).then(function (privateKey) {if (privateKey) {return Buffer.from(privateKey);}return null;});}function phraseToAddress(phrase) {return phraseToWallet(phrase).then(function (wallet) {return wallet.address;});}function phraseToWallet(phrase) {return _workerPool2.default.getWorker().action('phraseToWallet', phrase);}function verifySecret(secret) {
  return _workerPool2.default.getWorker().action('verifySecret', secret);
}