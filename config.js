const path = require('path')
const fs = require('fs')

const p = {
    root: path.normalize(__dirname)
}
p.dist = path.resolve(p.root, 'dist')
p.src = path.resolve(p.root, 'src')
p.servers = path.resolve(p.root, 'servers')

p.distProd = path.join(p.dist, 'prod')
p.distDev = path.join(p.dist, 'dev')
p.dllDev = path.join(p.distDev, 'dll')
p.dllProd = path.join(p.distProd, 'dll')
p.vendorManifest = path.join(p.dllProd, 'manifest.json')
p.vendorManifestDev = path.join(p.dllDev, 'manifest.json')

p.entries = path.join(p.src, 'entries')
p.bird = path.join(p.servers, 'bird')

const entries = fs.readdirSync(p.entries).filter(app => fs.statSync(path.resolve(p.entries, app)).isDirectory())

module.exports = {
    p,
    path: p,
    entries,
    port: {
        webpackDev: 3080,
        dev: 8020,
        prod: 8030
    },
    localIdentName: '[path]__[local]__[hash:base64:5]'
}
