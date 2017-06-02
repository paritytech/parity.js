 

import BigNumber from 'bignumber.js';
import utf8 from 'utf8';

import { isArray } from './types';

const ZERO_64 = '0000000000000000000000000000000000000000000000000000000000000000';

export function padAddress (_input) {
  const input = _input.substr(0, 2) === '0x' ? _input.substr(2) : _input;

  return `${ZERO_64}${input}`.slice(-64);
}

export function padBool (input) {
  return `${ZERO_64}${input ? '1' : '0'}`.slice(-64);
}

export function padU32 (input) {
  let bn = new BigNumber(input);

  if (bn.lessThan(0)) {
    bn = new BigNumber('ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff', 16)
      .plus(bn).plus(1);
  }

  return `${ZERO_64}${bn.toString(16)}`.slice(-64);
}

function stringToBytes (input) {
  if (isArray(input)) {
    return input;
  } else if (input.substr(0, 2) === '0x') {
    const matches = input.substr(2).toLowerCase().match(/.{1,2}/g) || [];

    return matches.map((value) => parseInt(value, 16));
  } else {
    return input.split('').map((char) => char.charCodeAt(0));
  }
}

export function padBytes (_input) {
  const input = stringToBytes(_input);

  return `${padU32(input.length)}${padFixedBytes(input)}`;
}

export function padFixedBytes (_input) {
  const input = stringToBytes(_input);
  const sinput = input.map((code) => `0${code.toString(16)}`.slice(-2)).join('');
  const max = Math.floor((sinput.length + 63) / 64) * 64;

  return `${sinput}${ZERO_64}`.substr(0, max);
}

export function padString (input) {
  const array = utf8.encode(input)
    .split('')
    .map((char) => char.charCodeAt(0));

  return padBytes(array);
}
