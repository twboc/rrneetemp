const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const { merge } = require('webpack-merge')

const paths = require('./paths')
const common = require('./webpack.app.common')

module.exports = merge(common, {
  mode: 'production',
  devtool: false,
  output: {
    path: paths.build + '/app',
    filename: 'js/[name].[contenthash].bundle.js',
    publicPath: '/app/'
  },
  module: {
    rules: [
      {
        test: /\.(sass|scss|css)$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2,
              sourceMap: false,
              modules: false
            }
          },
          'postcss-loader',
          'sass-loader'
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'style/[name].[contenthash].css',
      chunkFilename: '[id].css'
    }),
    new HtmlWebpackPlugin({
      title: 'React React Native Electron Boilerplate',
      favicon: paths.app + '/images/favicon.png',
      template: paths.public + '/index.html',
      filename: '../public/index.html'
    }),
    new HtmlWebpackPlugin({
      title: 'React React Native Electron Boilerplate',
      favicon: paths.app + '/images/favicon.png',
      template: paths.public + '/index.html',
      filename: '../public/electron.html',
      publicPath: '../app/'
    })
  ],
  optimization: {
    minimize: true,
    minimizer: [new CssMinimizerPlugin(), '...'],
    runtimeChunk: {
      name: 'runtime'
    }
  },
  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000
  }
})
