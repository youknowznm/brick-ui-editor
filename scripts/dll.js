const path = require('path')
const shell = require('shelljs')

const config = require('../config')
const p = config.path

const mode = {
    dev: 'dev',
    prod: 'prod'
}[process.argv[2]] || 'prod'

shell.cd(p.root)

if (mode === 'dev') {
    shell.rm('-rf', p.dllDev)
}

shell.exec(`npx webpack --config webpack/dll.webpack.config.${mode}.js`)
