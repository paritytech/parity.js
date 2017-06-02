import { keccak_256 } from 'js-sha3'; // eslint-disable-line camelcase
import { fromParamType } from '../spec/paramType/format';

export function eventSignature (eventName, params) {
  const { strName, name } = parseName(eventName);
  const types = (params || []).map(fromParamType).join(',');
  const id = `${strName}(${types})`;
  const signature = strName ? keccak_256(id) : '';

  return { id, name, signature };
}

export function methodSignature (methodName, params) {
  const { id, name, signature } = eventSignature(methodName, params);

  return { id, name, signature: signature.substr(0, 8) };
}

function parseName (name) {
  const strName = `${name || ''}`;
  const idx = strName.indexOf('(');

  if (idx === -1) {
    return { strName, name };
  }

  const trimmedName = strName.slice(0, idx);

  return {
    strName: trimmedName,
    name: trimmedName
  };
}
