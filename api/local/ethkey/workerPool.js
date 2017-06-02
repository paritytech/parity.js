const hasWebWorkers = typeof Worker !== 'undefined';
const KeyWorker = hasWebWorkers ? require('worker-loader!./worker')
                                : require('./worker').KeyWorker;

class WorkerContainer {
  busy = false;
  _worker = new KeyWorker();

  action (action, payload) {
    if (this.busy) {
      throw new Error('Cannot issue an action on a busy worker!');
    }

    this.busy = true;

    return new Promise((resolve, reject) => {
      this._worker.postMessage({ action, payload });
      this._worker.onmessage = ({ data }) => {
        const [err, result] = data;

        this.busy = false;

        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      };
    });
  }
}

class WorkerPool {
  pool = [];

  getWorker () {
    let container = this.pool.find((container) => !container.busy);

    if (container) {
      return container;
    }

    container = new WorkerContainer();

    this.pool.push(container);

    return container;
  }
}

export default new WorkerPool();
