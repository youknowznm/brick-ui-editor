const path = require('path')
const webpack = require('webpack')
const dayjs = require('dayjs')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const envConfig = require('./env-config')
const babelConfig = require('../babel.config')
const {p, entries, localIdentName} = require('../config')

const postcssLoader = {
    loader: 'postcss-loader',
    options: {
        ident: 'postcss',
        plugins(/* loader */) {
            return [
                require('autoprefixer')(),
                require('cssnano')({
                    preset: 'default'
                })
            ]
        }
    }
}

const cssModuleLoader = {
    loader: 'css-loader',
    options: {
        sourceMap: true,
        modules: {
            localIdentName
        }
    }
}

const sassLoader = {
    loader: 'sass-loader',
    options: {
        implementation: require('sass'),
        sourceMap: true
    }
}

const now = dayjs().format('YYYYMMDDHHmm')

module.exports = function (mode = 'production') {
    const isDev = mode !== 'production'
    const vendorManifest = isDev
        ? require(p.vendorManifestDev)
        : require(p.vendorManifest)

    const entry = {}
    const entryHtmlList = []

    const styleLoader = isDev ? 'style-loader' : MiniCssExtractPlugin.loader

    entries.forEach(entryName => {
        entry[entryName] = [
            // @todo: to-remove 但好像比不需要
            // for lazy code splitting
            // https://babeljs.io/docs/en/babel-plugin-syntax-dynamic-import#working-with-webpack-and-babel-preset-env
            // "core-js/modules/es.promise",
            // "core-js/modules/es.array.iterator",
            path.join(p.entries, `${entryName}/index.tsx`)
        ]
        entryHtmlList.push(
            new HtmlWebpackPlugin({
                chunks: [entryName],
                filename: `${entryName}.html`,
                template: path.resolve(p.entries, 'index.html'),
                templateParameters: {
                    ENTRY_NAME: entryName,
                    BUILD_TIME: now,
                    // @todo: 或可算词库的 MD5 作为版本
                    I18N_VERSION: now,
                    ...envConfig
                }
            })
        )
    })

    return {
        mode,
        entry,
        devtool: isDev ? 'cheap-module-eval-source-map' : 'cheap-module-source-map',
        output: {
            filename: '[name].[hash:6].js',
            chunkFilename: '[name].[hash:6].js',
            path: isDev ? p.distDev : p.distProd,
            publicPath: './'
        },
        resolve: {
            extensions: ['.tsx', '.ts', '.js', '.jsx'],
            // modules: ['node_modules', p.src],
            alias: {
                'src': p.src,
                'react-dom': '@hot-loader/react-dom'
            }
        },
        optimization: {
            splitChunks: {
                name: 'common',
                chunks: 'all',
            },
            runtimeChunk: true,

            // **do not** set sideEffects as false which would make tree-shaking disabled
            // https://webpack.js.org/configuration/optimization/#optimizationsideeffects
            // sideEffects: true,

            // may set false for debug
            // minimize: false,

            // for mini-css-extract-plugin
            // While webpack 5 is likely to come with a CSS minimizer built-in, with webpack 4 you need to bring your own
            // https://github.com/webpack-contrib/mini-css-extract-plugin#minimizing-for-production
            minimizer: [
                new UglifyJsPlugin({
                    // 过滤掉以".min.js"结尾的文件，我们认为这个后缀本身就是已经压缩好的代码，没必要进行二次压缩
                    exclude: /\.min\.js$/,
                    cache: true,
                    parallel: true,
                    sourceMap: false // set to true if you want JS source maps
                }),
                new OptimizeCSSAssetsPlugin()
            ]
        },
        module: {
            rules: [
                {
                    test: /\.(t|j)sx?$/,
                    use: [
                        {
                            loader: 'babel-loader',
                            options: babelConfig
                        },
                    ],
                    exclude: /node_modules(?!\/@befe)/
                },
                {
                    test: /\.css$/,
                    exclude: [
                        /\.mod(ule)?\.css/
                    ],
                    use: [
                        // 'style-loader',
                        styleLoader,
                        'css-loader',
                        postcssLoader,
                    ]
                },
                {
                    test: /\.mod(ule)?\.css$/,
                    use: [
                        styleLoader,
                        cssModuleLoader,
                        postcssLoader,
                    ]
                },
                {
                    test: /\.s[ac]ss$/,
                    exclude: [
                        /\.mod(ule)?\.s[ac]ss/
                    ],
                    use: [
                        styleLoader,
                        'css-loader',
                        postcssLoader,
                        'resolve-url-loader',
                        sassLoader
                    ]
                },
                {
                    test: /\.mod(ule)?\.s[ac]ss$/,
                    use: [
                        styleLoader,
                        cssModuleLoader,
                        postcssLoader,
                        'resolve-url-loader',
                        sassLoader
                    ]
                },
                {
                    test: /\.(jpe?g|bmp|png|gif)$/,
                    loader: 'url-loader',
                    options: {
                        limit: 10240
                    }
                },
                {
                    test: [/\.(woff2?|ttf|svg|eot)$/],
                    loader: 'file-loader'
                }
            ]
        },
        plugins: [
            ...entryHtmlList,
            new BundleAnalyzerPlugin({
                reportFilename: 'bundle-analyzer-report.html',
                analyzerMode: 'static',
                openAnalyzer: false
            }),
            new webpack.DllReferencePlugin({
                manifest: isDev
                    ? require(p.vendorManifestDev)
                    : require(p.vendorManifest), // eslint-disable-line
            }),
            isDev ? null : new MiniCssExtractPlugin({
                // Options similar to the same options in webpackOptions.output
                // both options are optional
                filename: '[name].[hash:6].css',
                chunkFilename: '[name].[hash:6].css',
            }),
            new AddAssetHtmlPlugin({
                filepath: path.resolve(isDev ? p.dllDev : p.dllProd, `${vendorManifest.name}.js`),
                includeSourcemap: true,
                publicPath: './dll',
                outputPath: 'dll'
            })
        ].filter(Boolean)
    }
}
