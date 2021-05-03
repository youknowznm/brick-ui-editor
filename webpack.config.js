const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const TerserPlugin = require('terser-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')

module.exports = (env, argv) => {
  const {mode} = argv
  const isDev = mode !== 'production'

  const styleLoader = isDev ? 'style-loader' : MiniCssExtractPlugin.loader

  const postcssLoader = {
    loader: 'postcss-loader',
    options: {
      postcssOptions: {
        ident: 'postcss',
        plugins: [
          require('autoprefixer')(),
          require('cssnano')({
            preset: 'default',
          }),
        ],
      },
    },
  }

  return {
    mode,
    entry: './src/main.js',
    output: {
      clean: true,
      filename: '[name].[contenthash].js',
      path: path.resolve(__dirname, 'dist'),
    },
    devServer: {
      contentBase: './dist',
    },
    devtool: isDev && 'eval-cheap-module-source-map',
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
          test: /\.css$/,
          use: [
            styleLoader,
            'css-loader',
          ],
        },
        {
          test: /\.s[ac]ss$/,
          use: [
            styleLoader,
            'css-loader',
            'resolve-url-loader',
            {
              loader: 'sass-loader',
              options: {
                implementation: require('sass'),
                sourceMap: true,
              },
            },
          ],
        },
        {
          test: /\.(jpe?g|bmp|png|gif|svg)$/,
          loader: 'url-loader',
          options: {
            limit: 10240,
          },
        }
      ]
    },
    optimization: {
      minimizer: [
        new TerserPlugin({
          parallel: true,
        }),
        new CssMinimizerPlugin(),
      ],
      runtimeChunk: 'single',
      splitChunks: {
        name: 'common',
        chunks: 'all',
      },
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, './src/index.html'),
        favicon: './src/identicon.png',
      }),
      !isDev && new BundleAnalyzerPlugin({
        analyzerMode: 'static',
        openAnalyzer: false,
      }),
      !isDev && new MiniCssExtractPlugin({
        filename: '[name].[contenthash].css',
        chunkFilename: '[name].[contenthash].css',
      })
    ].filter(Boolean),
    resolve: {
      extensions: ['.js', '.jsx', '.ts', '.tsx']
    }
  }
};

