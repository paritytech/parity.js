import { isHex } from './types';

import Func from '../../abi/spec/function';
import { fromParamType, toParamType } from '../../abi/spec/paramType/format';

export function decodeCallData (data) {
  if (!isHex(data)) {
    throw new Error('Input to decodeCallData should be a hex value');
  }

  if (data.substr(0, 2) === '0x') {
    return decodeCallData(data.slice(2));
  }

  if (data.length < 8) {
    throw new Error('Input to decodeCallData should be method signature + data');
  }

  const signature = data.substr(0, 8);
  const paramdata = data.substr(8);

  return {
    signature: `0x${signature}`,
    paramdata: `0x${paramdata}`
  };
}

export function decodeMethodInput (methodAbi, paramdata) {
  if (!methodAbi) {
    throw new Error('decodeMethodInput should receive valid method-specific ABI');
  }

  if (paramdata && paramdata.length) {
    if (!isHex(paramdata)) {
      throw new Error('Input to decodeMethodInput should be a hex value');
    }

    if (paramdata.substr(0, 2) === '0x') {
      return decodeMethodInput(methodAbi, paramdata.slice(2));
    }
  }

  return new Func(methodAbi).decodeInput(paramdata).map((decoded) => decoded.value);
}

// takes a method in form name(...,types) and returns the inferred abi definition
export function methodToAbi (method) {
  const length = method.length;
  const typesStart = method.indexOf('(');
  const typesEnd = method.indexOf(')');

  if (typesStart === -1) {
    throw new Error(`Missing start ( in call to decodeMethod with ${method}`);
  } else if (typesEnd === -1) {
    throw new Error(`Missing end ) in call to decodeMethod with ${method}`);
  } else if (typesEnd < typesStart) {
    throw new Error(`End ) is before start ( in call to decodeMethod with ${method}`);
  } else if (typesEnd !== length - 1) {
    throw new Error(`Extra characters after end ) in call to decodeMethod with ${method}`);
  }

  const name = method.substr(0, typesStart);
  const types = method.substr(typesStart + 1, length - (typesStart + 1) - 1).split(',');
  const inputs = types.filter((_type) => _type.length).map((_type) => {
    const type = fromParamType(toParamType(_type));

    return { type };
  });

  return { type: 'function', name, inputs };
}

export function abiDecode (inputTypes, data) {
  return decodeMethodInput({
    inputs: inputTypes.map((type) => {
      return { type };
    })
  }, data);
}
