import Service from '@ember/service';

import { createWorkerPool } from 'ember-artisans/index';

export default class Artisans extends Service {
  _pools = [];

  poolFor(workerName, poolSize) {
    const { _pools } = this;

    if (!_pools[workerName]) {
      _pools[workerName] = createWorkerPool(workerName, poolSize);
    }

    return _pools[workerName];
  }

  /**
   * @override
   */
  willDestroy() {
    Object.values(this._pools).forEach((workerPool) =>
      workerPool.forEach((worker) => worker.terminate()),
    );
    return super.willDestroy(...arguments);
  }
}
