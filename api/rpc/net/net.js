import { outNumber } from '../../format/output';

export default class Net {
  constructor (provider) {
    this._provider = provider;
  }

  listening () {
    return this._provider
      .send('net_listening');
  }

  peerCount () {
    return this._provider
      .send('net_peerCount')
      .then(outNumber);
  }

  version () {
    return this._provider
      .send('net_version');
  }
}
