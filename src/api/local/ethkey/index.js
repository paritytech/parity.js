import workerPool from './workerPool';

export function createKeyObject (key, password) {
  return workerPool.getWorker().action('createKeyObject', { key, password })
    .then((obj) => JSON.parse(obj));
}

export function decryptPrivateKey (keyObject, password) {
  return workerPool
    .getWorker()
    .action('decryptPrivateKey', { keyObject, password })
    .then((privateKey) => {
      if (privateKey) {
        return Buffer.from(privateKey);
      }

      return null;
    });
}

export function phraseToAddress (phrase) {
  return phraseToWallet(phrase)
    .then((wallet) => wallet.address);
}

export function phraseToWallet (phrase) {
  return workerPool.getWorker().action('phraseToWallet', phrase);
}

export function verifySecret (secret) {
  return workerPool.getWorker().action('verifySecret', secret);
}
