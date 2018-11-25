const mergeTrees = require('broccoli-merge-trees')

const { buildWorkerTree } = require('./lib/worker-tree')

module.exports = {
  name: require('./package').name,

  treeForPublic (tree) {
    const joinedTrees = [
      buildWorkerTree(
        this.project,
        this.treeGenerator
      ),
      tree
    ].filter(Boolean)

    return mergeTrees(joinedTrees, { overwrite: true })
  }
}
