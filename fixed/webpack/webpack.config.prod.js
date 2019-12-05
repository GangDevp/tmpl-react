const merge = require('webpack-merge');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');

const baseWebpackConfig = require('./webpack.config.base');
const util = require('./webpack.util');
const getLoaders = require('./webpack.loader');

const mode = 'production';
util.rewriteBaseConfig(mode);
const baseCfg = util.baseCfg();
const apps = baseCfg.webpack.projectName;
let loaders = getLoaders(mode);
let plugins = baseWebpackConfig.plugins;

/**
 * minify and chunk style file for each app
 */
plugins.push(new MiniCssExtractPlugin({
  filename: `./[name]/style/[name].css`
}));

/**
 * copy static resource for each app
 */
apps.map(app => {
  plugins.push(new CopyWebpackPlugin([{
    from: `${util.composePath(app, 'static')}`,
    to: `./${app}/static/`
  }])
  );
});

module.exports = merge(baseWebpackConfig, {
  devtool: "none",
  mode: mode,
  module: {
    rules: loaders
  },
  plugins: plugins
});