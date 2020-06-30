import Controller from '@ember/controller';
import { task } from 'ember-concurrency'
import { createWorker } from 'ember-artisans';

export default class DemoController extends Controller {
  testWorker = createWorker('/ember-artisans/assets/workers/test-worker.js');

  @(task(function* () {
    if (this.useWorker) {
      // Run computations on worker thread
      return this.testWorker.calculatePrimes();
    }
    // Run computations on main thread
    return this.calculatePrimes();
  }).restartable())
  generateNoise;
  
  calculatePrimes(iterations = 500, multiplier = 1000000000) {
    const primes = [];
    for (var i = 0; i < iterations; i++) {
      const candidate = i * (multiplier * Math.random());
      let isPrime = true;
      for (let c = 2; c <= Math.sqrt(candidate); ++c) {
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
}