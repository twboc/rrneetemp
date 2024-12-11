const path = require('path')

const nodeExternals = require('webpack-node-externals')

module.exports = {
  target: 'node',
  mode: 'development',
  entry: './src/index.ts',
  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, '../dist'),
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
  },
  externals: [nodeExternals()],
}
