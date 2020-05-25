let WORKER_ID = 0;
let TRANSPORT_ID = 0;

export const timeout = (ms) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export function createWorker(
  workerPath,
  options = {
    timeout: 5000,
  },
) {
  const resolutionMap = {};

  const workerId = `worker_${WORKER_ID++}`;
  const workerInstance = new Worker(workerPath);

  const artisanInstance = Object.assign(workerInstance, {
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

      return async function taskWrapper(...params) {
        const transportId = `${workerId}-${TRANSPORT_ID++}`;

        artisanInstance.isRunning = true;

        const workerTimeout = timeout(options.timeout).then(() => ({
          id: transportId,
          error: {
            message: `TimeoutError: Timed out after ${options.timeout} ms`,
          },
        }));

        const workerResolve = new Promise((resolve) => {
          resolutionMap[transportId] = resolve;
        });

        workerInstance.postMessage({
          id: transportId,
          method,
          params,
        });

        const resolvedAction = await Promise.race([
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

function getBestCandidate(pool) {
  return pool.find(({ isRunning }) => !isRunning) || pool[0];
}

export function createWorkerPool(workerPath, poolSize) {
  const availableWorkers = new Array(poolSize)
    .fill(null)
    .map(() => createWorker(workerPath));

  return new Proxy(availableWorkers, {
    get(workerPool, method) {
      return function taskPoolWrapper(...params) {
        const candidateWorker = getBestCandidate(workerPool);
        return candidateWorker[method](...params);
      };
    },
  });
}
