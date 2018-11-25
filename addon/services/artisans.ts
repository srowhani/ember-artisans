import Service from '@ember/service'

import { createWorkerPool } from 'ember-artisans/index'
import { WorkerProxyStrategy, JSONRPCResponse, Artisan } from 'ember-artisans/types';

export default class Artisans extends Service {
  private _pools: { [workerName: string]: Artisan[] & WorkerProxyStrategy<Promise<JSONRPCResponse>> }
  constructor (...args: any[]) {
    super(...args);
    this._pools = {};
  }

  poolFor (workerName: string, poolSize: number = 4) {
    const { _pools } = this

    if (!_pools[workerName]) {
      _pools[workerName] = createWorkerPool(workerName, poolSize)
    }

    return _pools[workerName]
  }

  willDestroy (...args: any[]) {
    Object.entries(this._pools).forEach(
      ([_, workerPool]) => {
        workerPool.forEach(
          worker => worker.terminate()
        )
      }
    )
    return this._super(...args)
  }
}

declare module '@ember/service' {
  interface Registry {
    'artisans': Artisans;
  }
}
