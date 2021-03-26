const webpack = require('webpack')
const path = require('path')

const p = require('../config').path

// dont't use [name].[hash] | [name]-[hash]
// they would cause `SyntaxError: Invalid or unexpected token` while doing dll reference
const vendorName = '[name][hash]'

module.exports = function (mode = 'production') {
    const isDev = mode !== 'production'
    const outputPath = isDev ? p.dllDev : p.dllProd
    const manifestPath = isDev ? p.vendorManifestDev : p.vendorManifest
    return {
        mode,
        entry: {
            vendor: [
                'react',
                'react-dom',
            ]
        },
        output: {
            // same as dllPlugin `name`
            // so that AddAssetHtmlPlugin can use `${vendorManifest.name}.js` to as filepath
            filename: `${vendorName}.js`,
            path: outputPath,
            publicPath: './',
            library: vendorName
        },
        plugins: [
            new webpack.DllPlugin({
                name: vendorName,
                path: manifestPath
            })
        ]
    }

}
