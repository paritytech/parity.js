export default class PostMessage {
  id = 0;
  _callbacks = {};

  constructor (token, destination) {
    this._token = token;
    this._destination = destination;

    window.addEventListener('message', this.receiveMessage, false);
  }

  addMiddleware () {
  }

  send = (method, params, callback) => {
    const id = ++this.id;

    this._callbacks[id] = callback;
    this._destination.postMessage({
      id,
      from: this._token,
      method,
      params,
      token: this._token
    }, '*');
  }

  receiveMessage = ({ data: { id, error, from, token, result }, origin, source }) => {
    if (from !== 'shell' || token !== this._token) {
      return;
    }

    this._callbacks[id](error, result);
    this._callbacks[id] = null;
  }
}
