'use strict';

const fs = require('fs');
const path = require('path');

const { WorkerPlugin } = require('./worker-plugin');

module.exports = {
  buildWorkerTrees(workerPath, treeGenerator) {
    if (fs.existsSync(workerPath)) {
      return treeGenerator(workerPath).map(
        (generatedTree) => new WorkerPlugin(generatedTree),
      );
    }

    return [];
  },
};
