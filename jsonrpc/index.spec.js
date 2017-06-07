'use strict';var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {return typeof obj;} : function (obj) {return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;};var _chai = require('chai');
var _ = require('./');var _2 = _interopRequireDefault(_);
var _types = require('./types');var customTypes = _interopRequireWildcard(_types);function _interopRequireWildcard(obj) {if (obj && obj.__esModule) {return obj;} else {var newObj = {};if (obj != null) {for (var key in obj) {if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];}}newObj.default = obj;return newObj;}}function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

var allowedTypes = [Array, Boolean, Object, String].concat(Object.values(customTypes));

function verifyType(obj) {
  if (typeof obj !== 'string') {
    (0, _chai.expect)(obj).to.satisfy(function () {return allowedTypes.includes(obj.type);});
  }
}

describe('jsonrpc/interfaces', function () {
  Object.keys(_2.default).forEach(function (group) {
    describe(group, function () {
      Object.keys(_2.default[group]).forEach(function (name) {
        var method = _2.default[group][name];

        describe(name, function () {
          it('has the correct interface', function () {
            (0, _chai.expect)(method.desc).to.be.a('string');
            (0, _chai.expect)(method.params).to.be.an('array');
            (0, _chai.expect)(method.returns).to.satisfy(function (returns) {
              return typeof returns === 'string' || (typeof returns === 'undefined' ? 'undefined' : _typeof(returns)) === 'object';
            });

            method.params.forEach(verifyType);
            verifyType(method.returns);
          });
        });
      });
    });
  });
});