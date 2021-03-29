const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: './src/index.js',
    // context: path.resolve(__dirname, 'src'),
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist'),
        clean: true
    },
    devServer: {
        contentBase: './dist',
    },
    module: {
        rules: [
            {
                test: /\.(t|j)sx?$/,
                use: [
                    {
                        loader: 'babel-loader',
                    },
                ],
                exclude: /node_modules/,
            },
            {
                test: /\.s[ac]ss$/,
                // 各组件包是 sideEffects free 的
                // 而 “any imported file is subject to tree shaking”
                // 所以像 `import '@befe/brick-comp-button/demos/style.scss'` 会被 dropped
                // see https://webpack.js.org/guides/tree-shaking/
                // sideEffects: true,
                use: [
                    'style-loader',
                    'css-loader',
                    // postcssLoader,
                    'resolve-url-loader',
                    'sass-loader',
                ],
            },

        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            // filename: 'index.html',
            template: 'src/index.html'
        })

    ],
    resolve: {
        // alias: {
        //     src: path.resolve(__dirname, 'src')
        // },
        extensions: ['.js', '.jsx', '.ts', '.tsx']
    }
};

