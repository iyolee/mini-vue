const path = require('path')
const webpack = require('webpack')
const CleanWebpackPlugin = require('clean-webpack-plugin')

const SRC_PATH = path.resolve(__dirname, 'src/core')
const ASSETS_BUILD_PATH = path.resolve(__dirname, 'dist/')

const config = {
  context: SRC_PATH,
  entry: './index.js',
  output: {
    path: ASSETS_BUILD_PATH,
    filename: process.env.NODE_ENV === 'production' ? 'vue.min.js' : 'vue.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: ['babel-loader?cacheDirectory'],
        exclude: path.resolve(__dirname, 'node_modules')
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin([ASSETS_BUILD_PATH], { verbose: false })
  ]
}

module.exports = config
