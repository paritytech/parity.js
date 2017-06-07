import { toParamType } from '../paramType/format';

export default class EventParam {
  constructor (name, type, indexed = false) {
    this._name = name;
    this._indexed = indexed;
    this._kind = toParamType(type, indexed);
  }

  get name () {
    return this._name;
  }

  get kind () {
    return this._kind;
  }

  get indexed () {
    return this._indexed;
  }

  static toEventParams (params) {
    return params.map((param) => new EventParam(param.name, param.type, param.indexed));
  }
}
