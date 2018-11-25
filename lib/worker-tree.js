'use strict'

const fs = require('fs')
const path = require('path')

const funnel = require('broccoli-funnel')
const mergeTrees = require('broccoli-merge-trees')
const { WatchedDir } = require('broccoli-source')

const { WorkerPlugin } = require('./worker-plugin')

function buildWorkerTree (project, treeGenerator) {
  const projectWorkers = path.join(project.root, 'workers')
  const workerTrees = []

  project.addons.forEach(
    addon => _processAddon(addon, workerTrees, treeGenerator)
  )

  if (fs.existsSync(projectWorkers)) {
    workerTrees.push(
      funnel(
        new WorkerPlugin(new WatchedDir(projectWorkers)),
        { destDir: 'assets/workers' }
      )
    )
  }

  return funnel(
    mergeTrees(
      workerTrees.filter(Boolean),
      {
        overwrite: true
      }
    ),
    {
      include: ['**/*.js']
    }
  )
}

function _processAddon (addon, workerTrees, treeGenerator) {
  const addonWorkerPath = path.join(addon.root, 'workers')
  let addonGeneratedTree = null

  if (fs.existsSync(addonWorkerPath)) {
    addonGeneratedTree = treeGenerator.call(addon, addonWorkerPath)
  }

  if (addonGeneratedTree !== null) {
    workerTrees.push(
      funnel(
        new WorkerPlugin(addonGeneratedTree),
        { destDir: 'assets/workers' }
      )
    )
  }

  addon.addons.forEach(
    _addon => _processAddon(_addon, workerTrees, treeGenerator)
  )
}

module.exports = {
  buildWorkerTree
}
