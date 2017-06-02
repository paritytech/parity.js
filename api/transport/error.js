import ExtendableError from 'es6-error';

export const ERROR_CODES = {
  UNSUPPORTED_REQUEST: -32000,
  NO_WORK: -32001,
  NO_AUTHOR: -32002,
  NO_NEW_WORK: -32003,
  NOT_ENOUGH_DATA: -32006,
  UNKNOWN_ERROR: -32009,
  TRANSACTION_ERROR: -32010,
  EXECUTION_ERROR: -32015,
  EXCEPTION_ERROR: -32016,
  ACCOUNT_LOCKED: -32020,
  PASSWORD_INVALID: -32021,
  ACCOUNT_ERROR: -32023,
  SIGNER_DISABLED: -32030,
  DAPPS_DISABLED: -32031,
  NETWORK_DISABLED: -32035,
  REQUEST_REJECTED: -32040,
  REQUEST_REJECTED_LIMIT: -32041,
  REQUEST_NOT_FOUND: -32042,
  COMPILATION_ERROR: -32050,
  ENCRYPTION_ERROR: -32055,
  FETCH_ERROR: -32060,
  INVALID_PARAMS: -32602
};

export default class TransportError extends ExtendableError {
  static requestRejected (method = null) {
    return new TransportError(method, ERROR_CODES.REQUEST_REJECTED, 'Request has been rejected.');
  }

  constructor (method, code, message) {
    const m = `${method}: ${code}: ${message}`;

    super(m);

    this.code = code;
    this.type = Object.keys(ERROR_CODES).find((k) => ERROR_CODES[k] === code) || '';

    this.method = method;
    this.text = message;
  }
}
