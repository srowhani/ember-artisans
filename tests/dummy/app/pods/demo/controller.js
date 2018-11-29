import Controller from '@ember/controller';
import { inject } from '@ember/service'
import { task } from 'ember-concurrency'
import { createWorker } from 'ember-artisans';

const timeout = ms => new Promise(resolve => setTimeout(resolve, ms))

export default Controller.extend({
  init () {
    this.testWorker = createWorker('/ember-artisans/assets/workers/test-worker.js')
  },

  generateNoise: task(function * () {
    const target = this.useWorker
      ? this.testWorker
      : this
    yield target.calculatePrimes()
  }).restartable(),


  calculatePrimes(iterations = 500, multiplier = 1000000000) {
    var primes = [];
    for (var i = 0; i < iterations; i++) {
      var candidate = i * (multiplier * Math.random());
      var isPrime = true;
      for (var c = 2; c <= Math.sqrt(candidate); ++c) {
        if (candidate % c === 0) {
            // not prime
            isPrime = false;
            break;
         }
      }
      if (isPrime) {
        primes.push(candidate);
      }
    }
    return primes;
  }
})