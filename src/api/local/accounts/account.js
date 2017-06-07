import { createKeyObject, decryptPrivateKey } from '../ethkey';

export default class Account {
  constructor (persist, data) {
    const {
      keyObject,
      meta = {},
      name = ''
    } = data;

    this._persist = persist;
    this._keyObject = keyObject;
    this._name = name;
    this._meta = meta;
  }

  isValidPassword (password) {
    return decryptPrivateKey(this._keyObject, password)
      .then((privateKey) => {
        if (!privateKey) {
          return false;
        }

        return true;
      });
  }

  get address () {
    return `0x${this._keyObject.address.toLowerCase()}`;
  }

  get name () {
    return this._name;
  }

  set name (name) {
    this._name = name;

    this._persist();
  }

  get meta () {
    return JSON.stringify(this._meta);
  }

  set meta (meta) {
    this._meta = JSON.parse(meta);

    this._persist();
  }

  get uuid () {
    return this._keyObject.id;
  }

  decryptPrivateKey (password) {
    return decryptPrivateKey(this._keyObject, password);
  }

  changePassword (key, password) {
    return createKeyObject(key, password).then((keyObject) => {
      this._keyObject = keyObject;

      this._persist();
    });
  }

  static fromPrivateKey (persist, key, password) {
    return createKeyObject(key, password).then((keyObject) => {
      const account = new Account(persist, { keyObject });

      return account;
    });
  }

  toJSON () {
    return {
      keyObject: this._keyObject,
      name: this._name,
      meta: this._meta
    };
  }
}
