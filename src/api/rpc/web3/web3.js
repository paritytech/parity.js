import { inHex } from '../../format/input';

export default class Web3 {
  constructor (provider) {
    this._provider = provider;
  }

  clientVersion () {
    return this._provider
      .send('web3_clientVersion');
  }

  sha3 (hexStr) {
    return this._provider
      .send('web3_sha3', inHex(hexStr));
  }
}
