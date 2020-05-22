import { v4 as uuidV4 } from 'uuid';

module.exports = {
  calculatePrimes(iterations = 500, multiplier = 1000000000) {
    const primes = [];
    for (let i = 0; i < iterations; i++) {
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
  },

  uuid() {
    return uuidV4();
  }
}