//const karma_webpack = require('karma-webpack');
const webpack = require('webpack');
const webpackConfig = require('./webpack.config');
webpackConfig.externals = {};
webpackConfig.externals['react/lib/ExecutionEnvironment'] = true;
webpackConfig.externals['react/lib/ReactContext'] = true;
webpackConfig.externals['react/addons'] = true;

module.exports = function (config) {
  config.set({
    browsers: ['PhantomJS'],
    frameworks: ['mocha'],
    reporters: ['mocha'],
    files: [
      'src/**/*.test.js',
    ],
    preprocessors: {
      'src/**/*.test.js': ['webpack'],
    },

    webpack: webpackConfig,
    webpackServer: {
      noInfo: true,
    },
  });
};
