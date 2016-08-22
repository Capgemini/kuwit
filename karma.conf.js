module.exports = function (config) {
  config.set({
    browsers: [ 'Chrome' ],
    // karma only needs to know about the test bundle
    files: [
      'tests.webpack.js'
    ],
    frameworks: [ 'chai', 'mocha' ],
    plugins: [
      'karma-chrome-launcher',
      'karma-chai',
      'karma-mocha',
      'karma-sourcemap-loader',
      'karma-webpack',
      'karma-coverage'
    ],
    // run the bundle through the webpack and sourcemap plugins
    preprocessors: {
      'tests.webpack.js': [ 'webpack', 'sourcemap' ]
    },
    reporters: [ 'dots' , 'coverage' ],
    singleRun: true,
    // webpack config object
    webpack: {
      devtool: 'inline-source-map',
      module: {
        loaders: [
          {
            exclude: /node_modules/,
            loader: 'babel-loader',
            test: /\.jsx?$/
          }
        ],
        preLoaders: [
          {
            test: /\.js?$/,
            loader: 'eslint-loader',
            exclude: /(node_modules|tests\.webpack\.js)/
          }
        ],
        postLoaders: [
          { //delays coverage til after tests are run, fixing transpiled source coverage error
            test: /\.js$/,
            exclude: /(-test\.js$|node_modules)\//,
            loader: 'istanbul-instrumenter'
          }
        ]
      }
    },
    webpackMiddleware: {
      noInfo: true,
    },
    coverageReporter: {
      type: 'html', //produces a html document after code is run
      dir: 'coverage' //path to created html doc
    }
  });
};
