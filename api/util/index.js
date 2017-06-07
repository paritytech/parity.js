import { isAddress as isAddressValid, toChecksumAddress } from '../../abi/util/address';

import { abiDecode, decodeCallData, decodeMethodInput, methodToAbi } from './decode';
import { abiEncode, abiUnencode, abiSignature, encodeMethodCallAbi } from './encode';
import { bytesToHex, hexToAscii, asciiToHex, cleanupValue } from './format';
import { fromWei, toWei } from './wei';
import { sha3 } from './sha3';
import { isArray, isFunction, isHex, isInstanceOf, isString } from './types';
import { createIdentityImg } from './identity';

export default {
  abiDecode,
  abiEncode,
  abiUnencode,
  abiSignature,
  cleanupValue,
  isAddressValid,
  isArray,
  isFunction,
  isHex,
  isInstanceOf,
  isString,
  bytesToHex,
  hexToAscii,
  asciiToHex,
  createIdentityImg,
  decodeCallData,
  decodeMethodInput,
  encodeMethodCallAbi,
  methodToAbi,
  fromWei,
  toChecksumAddress,
  toWei,
  sha3
};
