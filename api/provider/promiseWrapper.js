"use strict";Object.defineProperty(exports, "__esModule", { value: true });function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}var PromiseWrapper =
function PromiseWrapper(provider) {var _this = this;_classCallCheck(this, PromiseWrapper);this.



  send = function (method) {for (var _len = arguments.length, params = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {params[_key - 1] = arguments[_key];}
    if (!_this.provider.send) {
      // old-style transport interface for backwards compatibility
      return _this.provider.execute(method, params);
    }

    return new Promise(function (resolve, reject) {
      _this.provider.send(method, params, function (error, result) {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      });
    });
  };this.provider = provider;};exports.default = PromiseWrapper;module.exports = exports["default"];