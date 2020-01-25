const path = require('path')
const shell = require('shelljs')

const config = require('../config')
const p = config.path

shell.cd(p.root)

// clean
shell.rm('-rf', p.distProd)

// dll
shell.exec('node ./scripts/dll prod')

// build
// https://github.com/gaearon/react-hot-loader/issues/1112#issuecomment-443351904
// react-hot-loader babel plugin would add some "not pure" code to every file, thus make it completely unshakable.
// Setup NODE_ENV to let babel do the right job
shell.exec('BABEL_ENV=production NODE_ENV=production npx cross-env webpack --config webpack/webpack.config.prod.js')

// copy extras
const extraSrc = path.resolve(p.src, 'extras')
const extraDist = path.resolve(p.distProd, 'extras')
shell.cp('-r', extraSrc, extraDist)
