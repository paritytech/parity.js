import { inData, inNumber16, inOptions } from '../../format/input';
import { outSignerRequest } from '../../format/output';

export default class Signer {
  constructor (provider) {
    this._provider = provider;
  }

  confirmRequest (requestId, options, password) {
    return this._provider
      .send('signer_confirmRequest', inNumber16(requestId), inOptions(options), password);
  }

  confirmRequestRaw (requestId, data) {
    return this._provider
      .send('signer_confirmRequestRaw', inNumber16(requestId), inData(data));
  }

  confirmRequestWithToken (requestId, options, password) {
    return this._provider
      .send('signer_confirmRequestWithToken', inNumber16(requestId), inOptions(options), password);
  }

  generateAuthorizationToken () {
    return this._provider
      .send('signer_generateAuthorizationToken');
  }

  generateWebProxyAccessToken () {
    return this._provider
      .send('signer_generateWebProxyAccessToken');
  }

  rejectRequest (requestId) {
    return this._provider
      .send('signer_rejectRequest', inNumber16(requestId));
  }

  requestsToConfirm () {
    return this._provider
      .send('signer_requestsToConfirm')
      .then((requests) => (requests || []).map(outSignerRequest));
  }

  signerEnabled () {
    return this._provider
      .send('signer_signerEnabled');
  }
}
