const exports = {}, module = {};
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = global || self, (global['test-worker'] = global['test-worker'] || {}, global['test-worker'].js = factory()));
}(this, (function () { 'use strict';

  // Unique ID creation requires a high quality random # generator. In the browser we therefore
  // require the crypto API and do not support built-in fallback to lower quality random number
  // generators (like Math.random()).
  // getRandomValues needs to be invoked in a context where "this" is a Crypto implementation. Also,
  // find the complete implementation of crypto (msCrypto) on IE11.
  var getRandomValues = typeof crypto !== 'undefined' && crypto.getRandomValues && crypto.getRandomValues.bind(crypto) || typeof msCrypto !== 'undefined' && typeof msCrypto.getRandomValues === 'function' && msCrypto.getRandomValues.bind(msCrypto);
  var rnds8 = new Uint8Array(16);
  function rng() {
    if (!getRandomValues) {
      throw new Error('crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported');
    }

    return getRandomValues(rnds8);
  }

  /**
   * Convert array of 16 byte values to UUID string format of the form:
   * XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
   */
  var byteToHex = [];

  for (var i = 0; i < 256; ++i) {
    byteToHex.push((i + 0x100).toString(16).substr(1));
  }

  function bytesToUuid(buf, offset) {
    var i = offset || 0;
    var bth = byteToHex; // Note: Be careful editing this code!  It's been tuned for performance
    // and works in ways you may not expect. See https://github.com/uuidjs/uuid/pull/434

    return (bth[buf[i + 0]] + bth[buf[i + 1]] + bth[buf[i + 2]] + bth[buf[i + 3]] + '-' + bth[buf[i + 4]] + bth[buf[i + 5]] + '-' + bth[buf[i + 6]] + bth[buf[i + 7]] + '-' + bth[buf[i + 8]] + bth[buf[i + 9]] + '-' + bth[buf[i + 10]] + bth[buf[i + 11]] + bth[buf[i + 12]] + bth[buf[i + 13]] + bth[buf[i + 14]] + bth[buf[i + 15]]).toLowerCase();
  }

  function v4(options, buf, offset) {
    if (typeof options === 'string') {
      buf = options === 'binary' ? new Uint8Array(16) : null;
      options = null;
    }

    options = options || {};
    var rnds = options.random || (options.rng || rng)(); // Per 4.4, set bits for version and `clock_seq_hi_and_reserved`

    rnds[6] = rnds[6] & 0x0f | 0x40;
    rnds[8] = rnds[8] & 0x3f | 0x80; // Copy bytes to buffer, if provided

    if (buf) {
      var start = offset || 0;

      for (var i = 0; i < 16; ++i) {
        buf[start + i] = rnds[i];
      }

      return buf;
    }

    return bytesToUuid(rnds);
  }

  class Worker {
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
    }

    uuid() {
      return v4();
    }
  }

  return Worker;

})));

const moduleInstance = typeof module.exports === 'function'
  ? new module.exports()
  : module.exports;

self.addEventListener('message', async ({ data: { id, method, params } }) => {
  try {
    const result = await moduleInstance[method](...params)
    self.postMessage({
      id,
      result
    })
  } catch (e) {
    self.postMessage({
      id,
      error: {
        message: e.message,
        data: e.stack
      }
    })
  }
});