const path = require('path');
var webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const styleLintPlugin = require('stylelint-webpack-plugin');
const srcPath = path.join(__dirname, 'src');
const distPath = path.join(__dirname, 'www');

process.env.NODE_ENV = process.env.NODE_ENV || 'local';

module.exports = {

  // The base directory for resolving `entry` (must be absolute path)
  context: srcPath,
  entry: {
    index: 'index.js'
  },
  output: {
    path: distPath,
    publicPath: '',
    filename: 'bundle.js'
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
          NODE_ENV: JSON.stringify(process.env.NODE_ENV)
        }
    }),
    // Render an index.html for the app
    new HtmlWebpackPlugin({
      inject: 'body',
      template: 'src/index.html'
    }),
    new styleLintPlugin({
      configFile: '.stylelintrc',
      failOnError: false
    })
  ],

  // Enable loading modules relatively to root (without the ../../ prefix).
  resolve: {
    root: [srcPath]
  },

  eslint: {
    configFile: '.eslintrc',
    emitWarnings: true
  },

  module: {
    noParse: /node_modules\/json-schema\/lib\/validate\.js/,
    preLoaders: [
      {
        test: /\.js?$/,
        loader: 'eslint',
        exclude: /node_modules/
      },
    ],
    loaders: [
      {
        test: /.js?$/,
        loader: 'babel',
        exclude: /node_modules/
      },
      { test: /\.css$/,
        loaders: ['style', 'css', 'postcss']
      },
      { test: /\.scss$/,
        loaders: ['style?sourceMap', 'css', 'postcss', 'sass?sourceMap']
      },
      { test: /\.(svg|png|jpg|gif)$/,
        loader: 'url?limit=10000'
      },
      { test: /\.(ttf|eot|otf|woff|woff2)$/,
        loader: 'url?limit=10000'
      },
      { test: /\.json$/,
        loader: 'json-loader'
      }
    ]
  },

  // Settings for webpack-dev-server
  // `--hot` and `--progress` must be set using CLI
  devServer: {
    contentBase: './src',
    colors: true,
    noInfo: true,
    inline: true,
    historyApiFallback: true
  },
  devtool: '#inline-source-map'
};
