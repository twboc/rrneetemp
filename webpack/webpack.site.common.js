const paths = require('./paths')

module.exports = {
  entry: [paths.site + '/index.tsx'],
  devtool: 'inline-source-map',
  output: {
    path: paths.build,
    filename: '[name].bundle.js',
    publicPath: '/',
  },
}
