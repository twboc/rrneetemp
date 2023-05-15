const paths = require('./paths')

module.exports = {
  entry: [paths.app + '/index.tsx'],
  devtool: 'inline-source-map',
  output: {
    path: paths.build,
    filename: '[name].bundle.js',
    publicPath: '/',
  },
}
