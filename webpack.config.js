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
    rules: [
      {
        test: /\.css$/,
        use: [ 'style-loader', 'css-loader' ]
      },
      {
        test: /\.js$/,
        loader: 'babel-loader'
      },
    ],
  },
  plugins: [
    new WebpackNotifierPlugin(),
  ],
};
