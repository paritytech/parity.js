import { inAddress, inNumber10, inOptions } from '../../format/input';
import { outAddress } from '../../format/output';

export default class Personal {
  constructor (provider) {
    this._provider = provider;
  }

  listAccounts () {
    return this._provider
      .send('personal_listAccounts')
      .then((accounts) => (accounts || []).map(outAddress));
  }

  newAccount (password) {
    return this._provider
      .send('personal_newAccount', password)
      .then(outAddress);
  }

  sendTransaction (options, password) {
    return this._provider
      .send('personal_sendTransaction', inOptions(options), password);
  }

  unlockAccount (account, password, duration = 1) {
    return this._provider
      .send('personal_unlockAccount', inAddress(account), password, inNumber10(duration));
  }
}
