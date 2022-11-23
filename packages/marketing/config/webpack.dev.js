const { merge } = require('webpack-merge') // usado para mergear configurações em comum de prod e dev
const HtmlWebpackPlugin = require('html-webpack-plugin') // usado para injeção de html
const commonConfig = require('./webpack.common')
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin')

const devConfig = {
  mode: 'development',
  devServer: {
    port: 8081,
    historyApiFallback: {
      index: 'index.html'
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html'
    }),
    new ModuleFederationPlugin({
      name: 'marketing',
      filename: 'remoteEntry.js',
      exposes: {
        './MarketingApp': './src/bootstrap'
      }
    })
  ]
}

module.exports = merge(commonConfig, devConfig)