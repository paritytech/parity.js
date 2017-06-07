'use strict';Object.defineProperty(exports, "__esModule", { value: true });exports.

sliceData = sliceData;var _pad = require('./pad');function sliceData(_data) {
  if (!_data || !_data.length) {
    return [];
  }

  var data = _data.substr(0, 2) === '0x' ? _data.substr(2) : _data;

  if (!data.length) {
    data = (0, _pad.padAddress)('');
  }

  return data.match(/.{1,64}/g);
}