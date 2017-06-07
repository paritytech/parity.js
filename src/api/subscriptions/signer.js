import { outTransaction } from '../format/output';

export default class Signer {
  constructor (updateSubscriptions, api, subscriber) {
    this._subscriber = subscriber;
    this._api = api;
    this._updateSubscriptions = updateSubscriptions;
    this._started = false;
  }

  get isStarted () {
    return this._started;
  }

  start () {
    this._started = true;

    return Promise.all([
      this._listRequests(true),
      this._loggingSubscribe()
    ]);
  }

  _listRequests = (doTimeout) => {
    const nextTimeout = (timeout = 1000) => {
      if (doTimeout) {
        setTimeout(() => {
          this._listRequests(true);
        }, timeout);
      }
    };

    if (!this._api.transport.isConnected) {
      nextTimeout(500);
      return;
    }

    return this._api.signer
      .requestsToConfirm()
      .then((requests) => {
        this._updateSubscriptions('signer_requestsToConfirm', null, requests);
        nextTimeout();
      })
      .catch(nextTimeout);
  }

  _postTransaction (data) {
    const request = {
      transaction: outTransaction(data.params[0]),
      requestId: data.json.result.result
    };

    this._updateSubscriptions('parity_postTransaction', null, request);
  }

  _loggingSubscribe () {
    return this._subscriber.subscribe('logging', (error, data) => {
      if (error || !data) {
        return;
      }

      switch (data.method) {
        case 'eth_sendTransaction':
        case 'eth_sendRawTransaction':
          this._listRequests(false);
          return;

        case 'parity_postTransaction':
          this._postTransaction(data);
          this._listRequests(false);
          return;

        default:
          return;
      }
    });
  }
}
