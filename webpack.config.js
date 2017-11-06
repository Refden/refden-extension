const path = require('path');

module.exports = {
  entry: './app/app.js',
  output: {
    path:  path.resolve(__dirname, 'app/dist'),
    filename: 'bundle.js'
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
