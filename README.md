
# <img src='https://raw.githubusercontent.com/srowhani/files/master/leader.png' width=100 height=100/> ember-artisans 

[![NPM Version](https://badge.fury.io/js/ember-artisans.svg?style=flat)](https://npmjs.org/package/ember-artisans)
[![Build Status](https://travis-ci.org/srowhani/ember-artisans.svg?branch=master)](https://travis-ci.org/srowhani/ember-artisans/)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)

Artisans is a tool that makes using web workers in your application a lot more accessible. It offers an easy to use, Promise based API, that lets you break up your business logic to run on other threads, so that client side logic doesn't bog down your application's user experience.

Here's an example of how it might look in your application!

```js
// app/controllers/application.js
import Controller from '@ember/controller'
import { readOnly } from '@ember/object/computed';
import { task } from 'ember-concurrency';
import { createWorker } from 'ember-artisans';

export default class ApplicationController extends Controller {
  worker = createWorker('/assets/workers/heavy-lifting.js');

  @(task(function* () {
    return this.worker.liftHeavy()?.result;
  }))
  heavyLiftingTask;

  @readOnly('heavyLiftingTask.last.value')
  heavyLifting;

  /**
   * @override
   * https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers#Terminating_a_worker
   */
  willDestroy() {
    super.willDestroy(...arguments);

    this.worker.terminate();
  }
}
```

```js
// workers/heavy-lifting.js
export default class HeavyLiftingWorker {
  liftHeavy () {
    return fetch('...')
      .then(response => heavyComputations(response))
  }
}
```

That's it! In the above example we're instantiating a worker using the `createWorker` utility. This returns a proxied [Web Worker](https://developer.mozilla.org/en-US/docs/Web/API/Worker), that allows for any method you invoke will be delegated to it's corresponding worker.


## Getting Started 

### Installation 🎉
The first step is installing `ember-artisans`. This will provide you with the templates for generating your workers, as well as the necessary build steps along the way.

```sh
yarn add -D ember-artisans
```

### Creating workers 🛠

Once this has completed, you'll be able to start writing your workers! Running `ember g artisan <name>` will create your web worker for you in the root of your project inside `<root>/workers`
All changes made to the files in this directory will be automatically picked up by the live reload server, and updated inside your app!

Here's some example input, and the corresponding output:

`ember g artisan foo-bar`

```js
/**
 * Add your worker description here.
 */
export default class FooBarWorker {
  // Add your worker methods here.

  /**
   * @returns Promise<void>
   */
  async fooBar() {
    
  }
}
```

## API 👩‍💻

There are a couple ways to pull the worker in, and make use of them. I'll walk over each of the available methods of interacting with your workers.

### `createWorker`

```js
import { createWorker } from 'ember-artisans';

createWorker(
  workerPath: string,
  options = {
    timeout: 5000,
  },
) => Proxy<Worker>
```

Specifying a worker path is done by providing the url that the workers are built at. By default - workers are place inside of `dist/assets/workers/<name>.js` This means that you would consume them by referencing their public location.

```js
const 🐹 = createWorker('/assets/workers/tomster.js')
```

### `createWorkerPool`

```js

import { createWorkerPool } from 'ember-artisans';

export function createWorkerPool(
  workerPath: string,
  poolSize: number,
)
```

`createWorkerPool` will work the same as `createWorker`, except that when a method is invoked on a worker pool, it will instead look for the first non-busy worker to delegate your task to.

Using it would look something like this:

```js
// app/controllers/foo.js
import { createWorkerPool } from 'ember-artisans';

const taskPool = createWorkerPool('/assets/workers/task-pool.js', 5);
await taskPool.doSomething();
...
```

```js
// workers/worker-pool.js
export default class TaskPoolWorker {
  async doSomething () {
    return await something();
  }
}
```

### `service('artisans')`

This addon also provides a service that lets you instantiate a worker pool to be shared across different parts
of your application.

```js
// app/controllers/foo.js
import Controller from '@ember/controller';

import { inject as service } from '@ember/service';
import { task } from 'ember-concurrency';

export default class FooController extends Controller {
  @service('artisans')
  artisanService;

  @(task(function* () {
    const workerPool = this.artisanService.poolFor('/assets/workers/pool.js', 2);
    return workerPool.doSomething();
  }))
  poolTask;
}
```

## Handling Responses

Methods on your Worker will return as such, on successful completion.

```js
import { createWorker } from 'ember-artisans';

const tomsterWorker = createWorker('/assets/workers/tomster.js');

const {
  result, // optional, present if the worker ran successfully!
  error, // optional, present if there was an error encountered by the worker, or in the event of a timeout
  id,   // identifier corresponding to the request instance, used internally to map postMessage to responses
} = await tomsterWorker.runOnWheel();
```

## Notes 📓

### Worker Syntax

Currently worker's can be specified as the default export (ESM), or as the module.export (CJS). That means that each of the following is an acceptable way of declaring your workers.

```js
// esm
export default class FoobarWorker {
  async foo() {
    const response = await bar();
    return baz(response);
  }
  ...
}
```

```js
// cjs
module.exports = {
  async foo() {
    const response = await bar();
    return baz(response);
  }
}
```

### ESM Imports in Workers ✨

You're able to import any of your node_modules/ into your worker, as long as they're able to run in browser context!

Here's a sample worker using the [uuid](https://www.npmjs.com/package/uuid) package on npm.

```js
import { v4 as uuidV4 } from 'uuid';

export default class UUIDWorker {
  generateUuid() {
    return uuidV4();
  }
}
```

### Naming Worker Methods

To preserve the native methods present on a worker, avoid naming your Artisan worker methods the same as the native [Worker](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers) methods.
