const path = require('path')
const fs = require('fs-extra')
const shell = require('shelljs')
const express = require('express')
// const proxy = require('http-proxy-middleware')
const commander = require('commander')
const bird = require('birdv3')

const {p, port} = require('../config')

const app = express()

commander
    .option('-p, --port <type>', 'port')
    .option('-b, --use-bird', '')
    .parse(process.argv)

if (!fs.existsSync(p.distProd) || !fs.existsSync(p.vendorManifest)) {
    shell.exec('npm run build')
}

app.use('/', express.static(p.distProd))
app.all('*', bird(path.resolve(__dirname, 'bird/birdfile')))


app.use('*', express.static(path.join(p.distProd, 'extras/404.html')))


const listeningPort = commander.port || port.prod
app.listen(listeningPort, () => {
    console.log(`dev-server app listening on port ${listeningPort}!\n`)
})
