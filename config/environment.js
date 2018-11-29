'use strict'

module.exports = function (environment, config) {
  config.version = require('../package.json').version
  return {}
}
