var path = require('path');

module.exports = {
  mode: 'development',
  entry: './src/client/index.js',
  output: {
    /*eslint-disable no-undef*/
    path: path.resolve(__dirname, 'dist'),
    filename: './dist/bundle.js'
  },
  module: {
    rules: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' }
    ]
  },
  devServer: {
    port: 3000,
    open: true
  }
}