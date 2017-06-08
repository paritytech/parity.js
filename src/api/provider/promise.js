export default class PromiseProvider {
  constructor (provider) {
    this.provider = provider;
  }

  send = (method, ...params) => {
    if (!this.provider.send) {
      // old-style transport interface for backwards compatibility
      return this.provider.execute(method, params);
    }

    return new Promise((resolve, reject) => {
      this.provider.send(method, params, (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      });
    });
  }
}
