var path = require('path');
var webpack = require('webpack');
var _ = require('lodash');
var config = _.cloneDeep(require('./webpack.config'));

config.plugins.push(new webpack.optimize.OccurenceOrderPlugin());
config.plugins.push(new webpack.optimize.DedupePlugin());
config.plugins.push(new webpack.optimize.UglifyJsPlugin({
  compress: {
    warnings: false
  }
}));

delete config['devServer'];
delete config['devtool'];

module.exports = config;
