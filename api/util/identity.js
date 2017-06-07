'use strict';Object.defineProperty(exports, "__esModule", { value: true });exports.




createIdentityImg = createIdentityImg;var _blockies = require('blockies');var _blockies2 = _interopRequireDefault(_blockies);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };} // jsdom doesn't have all the browser features, blockies fail
var TEST_ENV = process.env.NODE_ENV === 'test';function createIdentityImg(address) {var scale = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 8;return TEST_ENV ?
  'test-createIdentityImg' :
  (0, _blockies2.default)({
    seed: (address || '').toLowerCase(),
    size: 8,
    scale: scale }).
  toDataURL();
}