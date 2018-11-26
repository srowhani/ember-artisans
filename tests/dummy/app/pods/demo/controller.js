import Controller from '@ember/controller';
import { inject } from '@ember/service'
import Artisans from 'ember-artisans/services/artisans'
import { task } from 'ember-concurrency'

export default Controller.extend({
  artisans: inject(),

  init () {
    this.asyncTask.perform()
  },

  asyncTask: task(function * () {
    const workerPool = this.artisans.poolFor('/ember-artisans/assets/workers/test-worker.js')
    return workerPool.doSomething(1, 3)
  }).restartable()
})