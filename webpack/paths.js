const path = require('path')

module.exports = {
  // Source files
  app: path.resolve(__dirname, '../app'),

  // Source files
  site: path.resolve(__dirname, '../site'),

  // Production build files
  build: path.resolve(__dirname, '../dist'),

  // Static files that get copied to build folder
  static: path.resolve(__dirname, '../static'),
}
