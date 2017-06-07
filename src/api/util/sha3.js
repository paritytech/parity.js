import { keccak_256 } from 'js-sha3'; // eslint-disable-line

import { hexToBytes } from './format';
import { isHex } from './types';

export function sha3 (value, options) {
  const forceHex = options && options.encoding === 'hex';

  if (forceHex || (!options && isHex(value))) {
    const bytes = hexToBytes(value);

    return sha3(bytes);
  }

  const hash = keccak_256(value);

  return `0x${hash}`;
}

sha3.text = (val) => sha3(val, { encoding: 'raw' });
