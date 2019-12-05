const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const util = require('./webpack.util');

const baseCfg = util.baseCfg();
const apps = baseCfg.webpack.projectName;
const plugins = [];

plugins.push(new webpack.HotModuleReplacementPlugin());
plugins.push(new CleanWebpackPlugin(['dist'], {
  root: process.cwd()
}));

/**
 * generator HTML tempalte for each app
 */
apps.map(app => {
  let filename = app !== 'app-main' ? `${app}.html` : 'index.html';

  plugins.push(new HtmlWebpackPlugin({
    template: util.composePath(app, 'index.html'),
    filename: filename,
    inject: true,
    hash: false,
    chunkSortMode: 'dependency',
    chunks: ['runtime', 'vendor', `${app}`],
    minify: {
      removeComments: true,
      collapseWhitespace: true
    }
  }));
});

module.exports = plugins;