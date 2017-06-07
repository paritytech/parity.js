'use strict';Object.defineProperty(exports, "__esModule", { value: true });exports.


eventSignature = eventSignature;exports.








methodSignature = methodSignature;var _jsSha = require('js-sha3');var _format = require('../spec/paramType/format');function eventSignature(eventName, params) {var _parseName = parseName(eventName),strName = _parseName.strName,name = _parseName.name;var types = (params || []).map(_format.fromParamType).join(',');var id = strName + '(' + types + ')';var signature = strName ? (0, _jsSha.keccak_256)(id) : '';return { id: id, name: name, signature: signature };} // eslint-disable-line camelcase
function methodSignature(methodName, params) {var _eventSignature = eventSignature(methodName, params),id = _eventSignature.id,name = _eventSignature.name,signature = _eventSignature.signature;

  return { id: id, name: name, signature: signature.substr(0, 8) };
}

function parseName(name) {
  var strName = '' + (name || '');
  var idx = strName.indexOf('(');

  if (idx === -1) {
    return { strName: strName, name: name };
  }

  var trimmedName = strName.slice(0, idx);

  return {
    strName: trimmedName,
    name: trimmedName };

}