import { range } from 'lodash';

export function bytesToHex (bytes) {
  return '0x' + Buffer.from(bytes).toString('hex');
}

export function cleanupValue (value, type) {
  // TODO: make work with arbitrary depth arrays
  if (value instanceof Array && type.match(/bytes[0-9]+/)) {
    // figure out if it's an ASCII string hiding in there:
    let ascii = '';

    for (let index = 0, ended = false; index < value.length && ascii !== null; ++index) {
      const val = value[index];

      if (val === 0) {
        ended = true;
      } else {
        ascii += String.fromCharCode(val);
      }

      if ((ended && val !== 0) || (!ended && (val < 32 || val >= 128))) {
        ascii = null;
      }
    }

    value = ascii === null
      ? bytesToHex(value)
      : ascii;
  }

  if (type.substr(0, 4) === 'uint' && +type.substr(4) <= 48) {
    value = +value;
  }

  return value;
}

export function hexToBytes (hex) {
  const raw = toHex(hex).slice(2);
  const bytes = [];

  for (let i = 0; i < raw.length; i += 2) {
    bytes.push(parseInt(raw.substr(i, 2), 16));
  }

  return bytes;
}

export function hexToAscii (hex) {
  const bytes = hexToBytes(hex);
  const str = bytes.map((byte) => String.fromCharCode(byte)).join('');

  return str;
}

export function bytesToAscii (bytes) {
  return bytes.map((b) => String.fromCharCode(b % 512)).join('');
}

export function asciiToHex (string) {
  return '0x' + string.split('').map((s) => s.charCodeAt(0).toString(16)).join('');
}

export function padRight (input, length) {
  const value = toHex(input).substr(2, length * 2);

  return '0x' + value + range(length * 2 - value.length).map(() => '0').join('');
}

export function padLeft (input, length) {
  const value = toHex(input).substr(2, length * 2);

  return '0x' + range(length * 2 - value.length).map(() => '0').join('') + value;
}

export function toHex (str) {
  if (str && str.toString) {
    str = str.toString(16);
  }

  if (str && str.substr(0, 2) === '0x') {
    return str.toLowerCase();
  }

  return `0x${(str || '').toLowerCase()}`;
}
