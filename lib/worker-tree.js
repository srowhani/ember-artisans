'use strict'

const fs = require('fs');
const path = require('path');

const { WorkerPlugin } = require('./worker-plugin')

module.exports = {
  buildWorkerTree ({ root }, treeGenerator) {
    const projectWorkers = path.join(root, 'workers');
  
    if (fs.existsSync(projectWorkers)) {
      return new WorkerPlugin(treeGenerator(projectWorkers));
    }
  }
}
