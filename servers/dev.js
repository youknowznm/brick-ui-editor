const fs = require('fs-extra')
const path = require('path')
const shell = require('shelljs')
const webpack = require('webpack')
const WebpackDevDevServer = require('webpack-dev-server')
const bird = require('birdv3')

const {p, port} = require('../config')

if (!fs.existsSync(p.vendorManifestDev)) {
    shell.exec('npm run dll:dev')
}

const webpackConfig = require('../webpack/webpack.config.dev.js')

const compiler = webpack(webpackConfig)

const devServer = new WebpackDevDevServer(compiler, {
    publicPath: '/',
    contentBase: p.src,
    hot: true,
    after: function (app, server, compiler) {
        app.all('*', bird(path.resolve(__dirname, 'bird/birdfile')))
    },
    historyApiFallback: true,
})

devServer.listen(port.dev, () => {
    console.log(`dev-server app listening on port ${port.dev}!\n`)
})
