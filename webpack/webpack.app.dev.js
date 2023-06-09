const {merge} = require('webpack-merge')
const common = require('./webpack.app.common')
const base = require('./webpack.base')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const paths = require('./paths')

module.exports = merge(common, base, {
  mode: 'development',
  devServer: {
    historyApiFallback: true,
    open: true,
    compress: true,
    hot: true,
    port: 8080,
  },
  module: {
    rules: [
      {
        test: /\.(sass|scss|css)$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {sourceMap: true, importLoaders: 1, modules: false},
          },
          {loader: 'postcss-loader', options: {sourceMap: true}},
          {loader: 'sass-loader', options: {sourceMap: true}},
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'React React Native Electron Boilerplate',
      favicon: paths.app + '/images/favicon.png',
      template: paths.static + '/index.html',
      filename: '../dist/index.html',
    }),
  ],
})
