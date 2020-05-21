const mergeTrees = require('broccoli-merge-trees')
const rollup = require('broccoli-rollup');
const { buildWorkerTree } = require('./lib/worker-tree')
const fs = require('fs');
const { default: resolve } = require('@rollup/plugin-node-resolve');
const commonjs = require('@rollup/plugin-commonjs');
const boundRollup = (workerPath) => {
  const workerList = fs.readdirSync(workerPath);
  
  return rollup(workerPath, {
    rollup: {
      input: workerList,
      output: [
        {
          dir: `assets/workers`,
          format: 'esm',
        },
      ],
      plugins: [
        resolve({
          extensions: ['.js', '.ts'],
          browser: true,
          preferBuiltIns: false 
        }),
        commonjs({
          include: [/node_modules/],
        }),
      ],
    }
  })
}

module.exports = {
  name: require('./package').name,

  treeForPublic (tree) {
    const joinedTrees = [
      buildWorkerTree(
        this.project,
        boundRollup
      ),
      tree
    ].filter(Boolean)

    return mergeTrees(joinedTrees, { overwrite: true })
  }
}
