import TYPES from './types';

export default class ParamType {
  constructor (type, subtype = null, length = 0, indexed = false) {
    ParamType.validateType(type);

    this._type = type;
    this._subtype = subtype;
    this._length = length;
    this._indexed = indexed;
  }

  get type () {
    return this._type;
  }

  get subtype () {
    return this._subtype;
  }

  get length () {
    return this._length;
  }

  get indexed () {
    return this._indexed;
  }

  static validateType (type) {
    if (TYPES.filter((_type) => type === _type).length) {
      return true;
    }

    throw new Error(`Invalid type ${type} received for ParamType`);
  }
}
