const path = require('path')
const nodeExternals = require('webpack-node-externals')

module.exports = {
  entry: {
    server: './server/index.ts'
  },
  output: {
    path: path.join(__dirname, '../dist/server/'),
    publicPath: '/',
    filename: '[name].js'
  },
  target: 'node',
  module: {
    rules: [
      {
        test: /\.(ts|tsx)?$/,
        exclude: /node_modules/,
        loader: 'ts-loader'
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.html$/,
        use: [{ loader: 'html-loader' }]
      }
    ]
  },
  externals: [nodeExternals()]
}
