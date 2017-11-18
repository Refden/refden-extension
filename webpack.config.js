const path = require('path');

module.exports = {
  entry: {
    'build/app/bundle': './app/app.js',
    'build/background/bundle': './app/background.js',
    'build/popup/bundle': './app/popup.js',
  },
  output: {
    path:  path.resolve(__dirname, 'app/dist'),
    filename: '[name].js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader'
      }
    ]
  },
  devtool: 'source-map'
};
