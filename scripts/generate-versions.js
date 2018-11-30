#!/usr/bin/env node
const fs = require('fs')
const fetch = require('node-fetch')

;(async () => {
  const repoTags = await fetch('https://api.github.com/repos/srowhani/ember-artisans/tags')
    .then(response => response.json())

  const repoMapping = repoTags.reduce(
    (acc, { name, commit }) => ({
      ...acc,
      [name]: commit
    })
  , {})

  fs.writeFileSync('./tests/dummy/public/versions.json', JSON.stringify(repoMapping, null, 2))
})()

