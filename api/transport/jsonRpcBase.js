import EventEmitter from 'eventemitter3';
import { Logging } from '../subscriptions';

export default class JsonRpcBase extends EventEmitter {
  constructor () {
    super();

    this._id = 1;
    this._debug = false;
    this._connected = false;
    this._middlewareList = Promise.resolve([]);
  }

  encode (method, params) {
    const json = JSON.stringify({
      jsonrpc: '2.0',
      method: method,
      params: params,
      id: this._id++
    });

    return json;
  }

  addMiddleware (Middleware) {
    this._middlewareList = Promise
      .all([
        Middleware,
        this._middlewareList
      ])
      .then(([Middleware, middlewareList]) => {
        // Do nothing if `handlerPromise` resolves to a null-y value.
        if (Middleware == null) {
          return middlewareList;
        }

        // don't mutate the original array
        return middlewareList.concat([new Middleware(this)]);
      });
  }

  _wrapSuccessResult (result) {
    return {
      id: this._id,
      jsonrpc: '2.0',
      result
    };
  }

  _wrapErrorResult (error) {
    return {
      id: this._id,
      jsonrpc: '2.0',
      error: {
        code: error.code,
        message: error.text
      }
    };
  }

  execute (method, params) {
    return this._middlewareList.then((middlewareList) => {
      for (const middleware of middlewareList) {
        const res = middleware.handle(method, params);

        if (res != null) {
          return Promise
            .resolve(res)
            .then((res) => {
              const result = this._wrapSuccessResult(res);
              const json = this.encode(method, params);

              Logging.send(method, params, { json, result });

              return res;
            });
        }
      }

      return this._execute(method, params);
    });
  }

  _execute () {
    throw new Error('Missing implementation of JsonRpcBase#_execute');
  }

  _setConnected () {
    if (!this._connected) {
      this._connected = true;
      this.emit('open');
    }
  }

  _setDisconnected () {
    if (this._connected) {
      this._connected = false;
      this.emit('close');
    }
  }

  get id () {
    return this._id;
  }

  get isDebug () {
    return this._debug;
  }

  get isConnected () {
    return this._connected;
  }

  setDebug (flag) {
    this._debug = flag;
  }

  error (error) {
    if (this.isDebug) {
      console.error(error);
    }
  }

  log (log) {
    if (this.isDebug) {
      console.log(log);
    }
  }
}
