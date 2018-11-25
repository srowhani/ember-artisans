const Filter = require('broccoli-filter')

function WorkerPlugin (inputNode, options = {}) {
  Filter.call(this, inputNode, {
    annotation: 'WorkerPlugin'
  })
  this.options = options
}

WorkerPlugin.prototype = Object.create(Filter.prototype)
WorkerPlugin.prototype.constructor = WorkerPlugin

WorkerPlugin.prototype.processString = function (content) {
  return `
const module = {};
    
${content}

self.addEventListener('message', async ({ data: { id, method, params } }) => {
  try {
    const result = await module.exports[method](...params)
    self.postMessage({
      jsonrpc: '2.0',
      id,
      result
    })
  } catch (e) {
    self.postMessage({
      jsonrpc: '2.0',
      id,
      error: {
        message: e.message,
        data: e.stack
      }
    })
  }
  
})`
}

module.exports = {
  WorkerPlugin
}
