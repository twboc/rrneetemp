const path = require('path')

module.exports = {
  target: 'node',
  mode: 'development',
  entry: './track/src/index.ts',
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
    path: path.resolve(__dirname, '../dist/track'),
  }
  ,
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],    
  },
}