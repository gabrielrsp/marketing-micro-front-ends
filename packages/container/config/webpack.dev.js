const { merge } = require('webpack-merge') // usado para mergear configurações em comum de prod e dev
const HtmlWebpackPlugin = require('html-webpack-plugin') // usado para injeção de html
const commonConfig = require('./webpack.common')

const devConfig = {
  mode: 'development',
  devServer: {
    port: 8080,
    historyApiFallback: {
      index: 'index.html'
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html'
    })
  ]
}

module.exports = merge(commonConfig, devConfig)