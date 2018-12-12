
# ember-artisans <img src='https://raw.githubusercontent.com/srowhani/files/master/leader.png' width=100 height=100/> 

Artisans is a tool that makes using web workers in your application a lot more accessible. With use of tools like [ember-concurrency](http://ember-concurrency.com/docs/introduction/), side-loading expensive computations can be written in a synchronous and readable manner.

```js
import { task } from 'ember-concurrency';
import { createWorker } from 'ember-artisans';

export default Controller.extend({
  myWorker: computed(function () {
    return createWorker('./path/to/my/worker.js')
  }),
  taskWithExpensiveOperation: task(function * () {
    const { result } = yield this.myWorker.work()
    this.set('result', result) // that's it!
    ...
  }).on('init')
})
```

Every result comes back with an `id` (of the worker that accomplished the task), and a `result` - being the result of the method you had called!

## Installation

No heavy installation is required, all you'll have to do to add it to your project is just run

```sh
yarn add ember-artisans
 ```

## Getting Started!

#### Creating your workers

Before doing anything, the first thing you'll have to do is actually create your workers. For convenience, there's a blueprint provided that helps you do just that.

Running `ember g artisan <name>` will create a web worker for you in the root of your package inside `<root>/workers`
All changes made to the files in this directory will be automatically picked up by the live reload server, and updated inside your app!

The result of running the generator will look something like this:

```js
// workers/foo.js
module.exports = {
  async foo () {
    return 'bar'
  }
}
```

That's it! 

**Note**

Within a worker, you are not able to import any library directly (you can through importScripts), or access the DOM.

#### Usage

There are a couple ways to pull the worker in, and make use of them. I'll walk over each available method of interacting with each worker.

```js
import { createWorker, createWorkerPool } from 'ember-artisans'
```

Both `createWorker`, and `createWorkerPool` return a proxy that allows you to communicate directly with your workers.

##### createWorker
```js
createWorker(
  workerPath: string,
  options = {
    timeout: 5000,
  },
) => Proxy<Worker>
```

Specifying a worker path is done by providing the url that the workers are built at. By default - workers are place inside of `dist/assets/workers/<name>.js`


###### Example

```js
// main.js
import { createWorker } from 'ember-artisans'

const mathWorker = createWorker('/assets/workers/m_worker.js')
const { result } = await mathWorker.add(1, 2)
console.log(result) // = 3

// workers/m_worker.js

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

Each method inside your worker file can also be asynchronous!

##### createWorkerPool

Create worker pool has the same interface as createWorker. Each worker when running a task is put in a state of isRunning. This lets the worker pool know who to hand the next task off to.

```ts
export function createWorkerPool(
  workerPath: string,
  poolSize: number,
): Artisan[] & WorkerProxyStrategy<Promise<JSONRPCResponse>>
```

###### Example

```js
// main.js
import { createWorkerPool } from 'ember-artisans'

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


### Deploying

This project uses semantic release for up-versioning and releases to Github and npm. Please follow angular convention commits, so that the commit analyzer can determine how to up-version the package.
