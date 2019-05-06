const path = require('path');

module.exports = {
  entry: __dirname + '/src/index.js',
  output: {
    path: __dirname + '/dist',
    filename: 'bundle.js'
  },
  performance: {
    hints: false
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: [
          /node_modules/,
          /lib/,
          /dist/
        ],
        use: [
          'babel-loader'
        ]
      },
      {
        test: /\.css$/,
        use: [
          'css-loader',
          'style-loader'
        ]
      }
    ]
  }
};