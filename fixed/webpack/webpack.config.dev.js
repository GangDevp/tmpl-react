const merge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.config.base');
const util = require('./webpack.util');
const getLoaders = require('./webpack.loader');

const mode = 'development';
util.rewriteBaseConfig(mode);
let loaders = getLoaders(mode);

module.exports = merge(baseWebpackConfig, {
  devtool: "source-map",
  devServer: {
    contentBase: util.composePath('.'),
    historyApiFallback: true,
    host: 'localhost',
    port: 8080,
    hot: true,
    inline: true,
    compress: true,
    overlay: true,
    stats: "errors-only",
    open: false
  },
  mode: mode,
  module: {
    rules: loaders
  }
});