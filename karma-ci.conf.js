module.exports = function (config) {
  config.set({
    browsers: [ 'PhantomJS' ],
    // karma only needs to know about the test bundle
    files: [
      'tests-ci.webpack.js'
    ],
    frameworks: [ 'chai', 'mocha' ],
    plugins: [
      'karma-phantomjs-launcher',
      'karma-chai',
      'karma-mocha',
      'karma-sourcemap-loader',
      'karma-webpack',
      'karma-coverage',
      'karma-junit-reporter'
    ],
    // run the bundle through the webpack and sourcemap plugins
    preprocessors: {
      'tests-ci.webpack.js': [ 'webpack', 'sourcemap' ]
    },
    reporters: [ 'dots', 'junit', 'coverage' ],
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
      reporters: [
        { type: 'html', subdir: 'report-html' },
        { type: 'lcov', subdir: 'report-lcov' },
      ],
      dir: 'coverage'
    },
    junitReporter: {
      outputDir: 'reports',
      outputFile: 'junit/TESTS-xunit.xml'
    }
  });
};
