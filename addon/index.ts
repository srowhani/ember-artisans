import {
  Artisan,
  JSONRPCResponse,
  WorkerProxyStrategy,
} from 'ember-artisans/types';
import { v4 as uuid } from 'uuid';

let WORKER_ID = 0;

export const timeout = (ms: number) =>
  new Promise(resolve => setTimeout(resolve, ms));

export function createWorker(
  workerPath: string,
  options = {
    timeout: 5000,
  },
) {
  const resolutionMap: {
    [transportId: string]: (value?: {} | PromiseLike<{}> | undefined) => void;
  } = {};

  const workerId = `worker_${WORKER_ID++}`;
  const workerInstance = new Worker(workerPath);

  const artisanInstance: Artisan = Object.assign(workerInstance, {
    id: workerId,
    isRunning: false,
  });

  artisanInstance.onmessage = ({ data }) => {
    const { id } = data;

    const dataResolver = resolutionMap[id];

    if (dataResolver) {
      dataResolver(data);
    }
  };

  return new Proxy(artisanInstance, {
    get(target, method, receiver) {
      if (workerInstance.hasOwnProperty(method)) {
        return Reflect.get(target, method, receiver);
      }

      return async function taskWrapper(
        ...params: any[]
      ): Promise<JSONRPCResponse> {
        const transportId = `${workerId}-${uuid()}`;

        artisanInstance.isRunning = true;

        const workerTimeout = timeout(options.timeout).then(() => ({
          jsonrpc: '2.0',
          id: transportId,
          error: {
            message: `TimeoutError: Timed out after ${options.timeout} ms`,
          },
        }));

        const workerResolve = new Promise<JSONRPCResponse>(resolve => {
          resolutionMap[transportId] = resolve;
        });

        workerInstance.postMessage({
          jsonrpc: '2.0',
          id: transportId,
          method,
          params,
        });

        const resolvedAction = await Promise.race<JSONRPCResponse>([
          workerTimeout,
          workerResolve,
        ]);

        delete resolutionMap[transportId];

        artisanInstance.isRunning = false;
        return resolvedAction;
      };
    },
  });
}

function getBestCandidate(pool: Artisan[]): Artisan {
  return pool.find(({ isRunning }) => !isRunning) || pool[0];
}

export function createWorkerPool(
  workerPath: string,
  poolSize: number,
): Artisan[] & WorkerProxyStrategy<Promise<JSONRPCResponse>> {
  const availableWorkers = new Array(poolSize)
    .fill(null)
    .map(() => createWorker(workerPath));

  return new Proxy(availableWorkers, {
    get(workerPool, method: string) {
      return function taskPoolWrapper(
        ...params: any[]
      ): Promise<JSONRPCResponse> {
        const candidateWorker = getBestCandidate(workerPool);
        return candidateWorker[method](...params);
      };
    },
  }) as any;
}
