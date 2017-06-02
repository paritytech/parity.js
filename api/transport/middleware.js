export default class Middleware {
  constructor (transport) {
    this._transport = transport;
    this._handlers = {};
  }

  register (method, handler) {
    this._handlers[method] = handler;
  }

  handle (method, params) {
    const handler = this._handlers[method];

    if (handler != null) {
      return handler(params);
    }

    return null;
  }

  rpcRequest (method, params) {
    return this._transport._execute(method, params);
  }
}
