import { Logging } from '../../subscriptions';
import JsonRpcBase from '../jsonRpcBase';
import TransportError from '../error';

/* global fetch */
export default class Http extends JsonRpcBase {
  constructor (url, connectTimeout = 1000) {
    super();

    this._connected = true;
    this._url = url;
    this._connectTimeout = connectTimeout;

    this._pollConnection();
  }

  _encodeOptions (method, params) {
    const json = this.encode(method, params);

    this.log(json);

    return {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Content-Length': json.length
      },
      body: json
    };
  }

  _execute (method, params) {
    const request = this._encodeOptions(method, params);

    return fetch(this._url, request)
      .catch((error) => {
        this._setDisconnected();
        throw error;
      })
      .then((response) => {
        this._setConnected();

        if (response.status !== 200) {
          this._setDisconnected();
          this.error(JSON.stringify({ status: response.status, statusText: response.statusText }));
          console.error(`${method}(${JSON.stringify(params)}): ${response.status}: ${response.statusText}`);

          throw new Error(`${response.status}: ${response.statusText}`);
        }

        return response.json();
      })
      .then((response) => {
        Logging.send(method, params, { request, response });

        if (response.error) {
          this.error(JSON.stringify(response));
          console.error(`${method}(${JSON.stringify(params)}): ${response.error.code}: ${response.error.message}`);

          const error = new TransportError(method, response.error.code, response.error.message);

          throw error;
        }

        this.log(JSON.stringify(response));
        return response.result;
      });
  }

  _pollConnection = () => {
    if (this._connectTimeout <= 0) {
      return;
    }

    const nextTimeout = () => setTimeout(this._pollConnection, this._connectTimeout);

    this
      .execute('net_listening')
      .then(nextTimeout)
      .catch(nextTimeout);
  }
}
