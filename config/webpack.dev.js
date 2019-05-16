// Since webpack proxy server does not always go on well with NAT-DDNS，
// so we have a proxy server ourselves to make the request

const merge = require('webpack-merge');
const common = require('../webpack.common');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'eval-source-map',
  devServer: {
    contentBase: './dist',
    proxy: {
      '/poetry': {
        target: 'http://localhost:4040',
        changeOrigin: true,
        pathRewrite: {
          '^/poetry': '/poetry'
        }
      }
    },
    host: 'localhost',
    port: 8000,
  }
});