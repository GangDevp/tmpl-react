const util = require('./webpack.util');
const plugins = require('./webpack.plugins');

module.exports = {
  context: process.cwd(),
  entry: util.getEntrys(),
  output: {
    publicPath: "",
    path: util.composePath('dist'),
    filename: util.parsePath(`[name]/script/[name].js`),
    chunkFilename: util.parsePath(`[name]/script/[name].js`)
  },
  optimization: {
    splitChunks: {
      chunks: "all",
      minSize: 30000,
      minChunks: 1,
      name: true,
      cacheGroups: {
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
        },
        vendors: {
          name: "vendor",
          test: /[\\/]node_modules[\\/]/,
          priority: -10
        }
      }
    },
    runtimeChunk: {
      name: "runtime"
    }
  },
  performance: {
    hints: false
  },
  plugins: plugins,
  resolve: {
    extensions: ['.js', '.jsx', '.json', '.css', 'scss', 'less'],
    alias: util.addWebpackAlias('utils')
  }
};