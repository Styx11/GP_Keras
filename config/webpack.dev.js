const merge = require('webpack-merge');
const common = require('../webpack.common');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'eval-source-map',
  devServer: {
    contentBase: './dist',
    proxy: {
      '/poetry': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        pathRewrite: {
          '^/poetry': '/poetry'
        }
      }
    }
  }
});