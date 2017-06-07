'use strict';Object.defineProperty(exports, "__esModule", { value: true });exports.isArray = isArray;exports.



isString = isString;exports.



isInstanceOf = isInstanceOf;function isArray(test) {return Object.prototype.toString.call(test) === '[object Array]';}function isString(test) {return Object.prototype.toString.call(test) === '[object String]';}function isInstanceOf(test, clazz) {
  return test instanceof clazz;
}