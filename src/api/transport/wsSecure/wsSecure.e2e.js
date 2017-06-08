import WsSecure from './wsSecure';

const ws = new WsSecure('ws://localhost:8546/');

describe('transport/WsSecure', () => {
  it('connects and makes a call to web3_clientVersion', () => {
    return ws.execute('web3_clientVersion').then((version) => {
      const [client] = version.split('/');

      expect(client === 'Geth' || client === 'Parity').to.be.ok;
    });
  });
});
