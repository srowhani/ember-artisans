<img src='https://raw.githubusercontent.com/srowhani/files/master/leader.png' width=250 height=250/>

# ember-artisans

Artisans is a tool that makes using web workers in your application a lot more accessible. With use of tools like [ember-concurrency](http://ember-concurrency.com/docs/introduction/), side-loading expensive computations can be written in a synchronous and readable manner.

```js
import { task } from 'ember-concurrency';
import { createWorker } from 'ember-artisans';

export default Controller.extend({
  init (...args) {
    this._super(...args);
    this.myWorker = createWorker('/path/to/worker.js')
  },
  taskWithExpensiveOperation: task(function * () {
    const workerResult = yield this.myWorker.doSomething()
    ...
  }).on('init')
})
```

## Installation

`yarn add ember-artisans`

## Usage

### Creating your workers
To get started, you'll have to run the generator. This package provides templates for creating your very own artisan.

Running `ember g artisan <name>` will create a web worker for you in the root of your package inside `./workers`
All changes made to the files in this directory will be automatically be picked up by the live reload server, and updated inside your app!

### Consuming in your application

There are several methods that are offered that allow you to communicate with your artisans.

#### Method 1 - `createWorker / createWorkerPool`

`import { createWorker, createWorkerPool } from 'ember-artisans'

Both createWorker, and createWorkerPool return a proxy that allows you to communicate directly with your workers.

##### createWorker
```
createWorker(
  workerPath: string,
  options = {
    timeout: 5000,
  },
) => Proxy<Worker>
```

Specifying a worker path is done by providing the url that the workers are built at. By default - workers are place inside of `dist/assets/workers/<name>.js`

Referencing a worker inside your application would look something like this:

`createWorker('/assets/workers/<name>.js')`

You can reference any of the methods in the worker file by name.

###### Example

```
// main.js
const mathWorker = createWorker('/assets/workers/m_worker.js')
const { result } = await mathWorker.add(1, 2)
console.log(result) // = 3

// m_worker.js

const timeout = ms => new Promise(resolve => setTimeout(resolve, ms))

module.exports = {
  add(a, b) {
    return a + b
  },
  async waitThenAdd(a, b) {
    await timeout(500)
    return a + b
  }
}
```

The worker itself can have functions be asynchronous. So if for example you were working with an asynchronous API like IndexedDB, it's completely accessible.

##### createWorkerPool

Create worker pool has the same interface as createWorker. Each worker when running a task is put in a state of isRunning. This lets the worker pool know who to hand the next task off to.

```ts
export function createWorkerPool(
  workerPath: string,
  poolSize: number,
): Artisan[] & WorkerProxyStrategy<Promise<JSONRPCResponse>>
```

###### Example

```
// main.js
const mathWorker = createWorkerPool('/assets/workers/m_worker.js', 2)
const { id, result } = await mathWorker.add(1, 2)
console.log(id, result) // = <transport_id>, <3>

// m_worker.js

const timeout = ms => new Promise(resolve => setTimeout(resolve, ms))

module.exports = {
  add(a, b) {
    return a + b
  },
  async waitThenAdd(a, b) {
    await timeout(500)
    return a + b
  }
}
```

Each message returned from a worker or a pool will be in JSONRPC compliant format, meaning you'll receive an error object if something goes wrong inside your worker. For more information on the format of the messages sent and received, see implementation details below.


### Implementation

Ember Artisans uses [proxies](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy) to give you a simplified approach to communicating with your workers. The method, and parameters that are referenced on the worker, are formatted into a message that is sent to the worker instance via `postMessage`. 

#### Message Format

```ts
export interface JSONRPCTransport {
  jsonrpc: string;
  id: string;
}

export interface JSONRPCRequest extends JSONRPCTransport {
  method: string;
  params: any[];
}

export interface JSONRPCResponse extends JSONRPCTransport {
  result?: any;
  error?: {
    message: string;
  };
}
```

Every transport message will include an id, composed of the ID of the worker itself, along with a unique number corresponding to the transport. Each worker will keep track of this ID when sending back a response to ensure the consumer receives what they had requested.

## Running Tests

* `yarn test`

## Building

* `yarn build`

For more information on using ember-cli, visit [https://ember-cli.com/](https://ember-cli.com/).

### Deploying

This project uses semantic release for up-versioning and releases to Github and npm. Please follow angular convention commits, so that the commit analyzer can determine how to up-version the package.
