const mergeTrees = require('broccoli-merge-trees');
const rollup = require('broccoli-rollup');
const { buildWorkerTrees } = require('./lib/worker-tree');
const fs = require('fs');
const path = require('path');
const { default: nodeResolve } = require('@rollup/plugin-node-resolve');
const commonjs = require('@rollup/plugin-commonjs');

const treeFactory = (workerPath) => {
  const workerList = fs.readdirSync(workerPath);

  return workerList.map((workerName) =>
    rollup(workerPath, {
      rollup: {
        input: workerName,
        output: [
          {
            name: workerName,
            dir: `assets/workers`,
            format: 'umd',
          },
        ],
        plugins: [
          nodeResolve({
            extensions: ['.js'],
            browser: true,
            preferBuiltIns: false,
          }),
          commonjs({
            include: [/node_modules/],
          }),
        ],
      },
    }),
  );
};

module.exports = {
  name: require('./package').name,

  treeForPublic(tree) {
    const workerPath = path.join(this.project.root, 'workers');
    const joinedTrees = [
      ...buildWorkerTrees(workerPath, treeFactory),
      tree,
    ].filter(Boolean);

    return mergeTrees(joinedTrees, { overwrite: true });
  },
};
