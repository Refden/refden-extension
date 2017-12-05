const path = require('path');
const WebpackNotifierPlugin = require('webpack-notifier');

module.exports = {
  entry: {
    'build/app/bundle': './app/app.js',
    'build/background/bundle': './app/background.js',
    'build/popup/bundle': './app/popup.js',
    'build/views/reference-form/bundle': './app/views/reference-form.js',
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
  devtool: 'source-map',
  plugins: [
    new WebpackNotifierPlugin(),
  ],
};
