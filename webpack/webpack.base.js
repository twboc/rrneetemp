const paths = require('./paths')

module.exports = {
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: ['babel-loader'],
      },
      {
        test: /\.(ts|tsx)?$/,
        exclude: /node_modules/,
        loader: 'ts-loader',
      },
      {
        test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
        type: 'asset/inline',
      },
      { 
        test: /\.png$/,
        use: 'url-loader?mimetype=image/png'
      },
      { 
        test: /\.jpg$/,
        use: 'url-loader?mimetype=image/jpg'
      },
    ],
  },
  resolve: {
    modules: [paths.app, 'node_modules'],
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json', '.jpg'],
  },
}
