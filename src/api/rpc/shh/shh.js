export default class Personal {
  constructor (provider) {
    this._provider = provider;
  }

  addToGroup (identity) {
    return this._provider
      .send('shh_addToGroup', identity);
  }

  getFilterChanges (filterId) {
    return this._provider
      .send('shh_getFilterChanges', filterId);
  }

  getMessages (filterId) {
    return this._provider
      .send('shh_getMessages', filterId);
  }

  hasIdentity (identity) {
    return this._provider
      .send('shh_hasIdentity', identity);
  }

  newFilter (options) {
    return this._provider
      .send('shh_newFilter', options);
  }

  newGroup () {
    return this._provider
      .send('shh_newGroup');
  }

  newIdentity () {
    return this._provider
      .send('shh_newIdentity');
  }

  post (options) {
    return this._provider
      .send('shh_post', options);
  }

  uninstallFilter (filterId) {
    return this._provider
      .send('shh_uninstallFilter', filterId);
  }

  version () {
    return this._provider
      .send('shh_version');
  }
}
