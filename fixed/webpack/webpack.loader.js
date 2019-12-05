const autoprefixer = require('autoprefixer');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const util = require('./webpack.util');

/**
 * style loader common options
 */
let styleCommonOpts = [
  {
    loader: require.resolve('css-loader'),
    options: {
      importLoaders: 1,
      modules: true,
      localIdentName: '[path][name]__[local]'
    }
  },
  {
    loader: require.resolve('postcss-loader'),
    options: {
      ident: 'postcss',
      plugins: () => [
        require('postcss-flexbugs-fixes'),
        autoprefixer({
          browsers: [
            '>1%',
            'last 4 versions',
            'Firefox ESR',
            'not ie < 9',
          ],
          flexbox: 'no-2009',
        }),
      ],
    }
  },
  'sass-loader'
];

/**
 * style loader in development environment
 */
let devStyleOpts = ['style-loader'].concat(styleCommonOpts);

/**
 * style loader in production environment
 */
let appCfgPath = util.composePath('config', 'global.json');
let baseUrl = util.readFile(appCfgPath, true)['BASE_URL'];

let proStyleOpts = [
  'css-hot-loader',
  {
    loader: MiniCssExtractPlugin.loader,
    options: {
      publicPath: baseUrl
    }
  }
].concat(styleCommonOpts);

/**
 * webpack all loaders options
 */
const loaderOpts = {
  scriptLoader: {
    test: /\.(js|jsx)$/,
    exclude: /node_modules/,
    use: {
      loader: 'babel-loader'
    }
  },
  imageLoader: {
    test: /\.(png|jpg|gif|svg|ico)$/i,
    use: [
      {
        loader: 'file-loader',
        options: {
          name: '[path][name].[ext]',
          outputPath: function (url, resourcePath, context) {
            return url;
          }
        }
      },
      'image-webpack-loader'
    ]
  },
  fontLoader: {
    test: /\.(eot|woff|woff2|ttf)$/i,
    use: {
      loader: 'url-loader',
      options: {
        name: '[path][name].[ext]',
        limit: 30000,
        outputPath: function (url, resourcePath, context) {
          return url;
        }
      }
    }
  },
  styleLoader: {
    development: {
      test: /\.(scss|css)$/,
      exclude: /node_modules/,
      use: devStyleOpts
    },
    production: {
      test: /\.(scss|css)$/,
      exclude: /node_modules/,
      use: proStyleOpts
    }
  }
};

/**
 * get loaders in development environment or production environment
 */
const getLoaders = mode => {
  let loaders = [];

  /**
   * add script loader
   */
  loaders.push(loaderOpts.scriptLoader);

  /**
   * add style loader
   */
  loaders.push(loaderOpts.styleLoader[mode]);

  /**
   * add image loader
   */
  loaders.push(loaderOpts.imageLoader);

  /**
   * add font loader
   */
  loaders.push(loaderOpts.fontLoader);

  return loaders;
};

module.exports = getLoaders;