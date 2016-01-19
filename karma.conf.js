// Karma configuration

module.exports = function (config) {
  'use strict';

  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',

    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jspm', 'jasmine'],

    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome'],

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['spec'],
    specReporter: {
      maxLogLines: 5, // limit number of lines logged per test
      suppressErrorSummary: true, // do not print error summary
      suppressFailed: false, // do not print information about failed tests
      suppressPassed: false, // do not print information about passed tests
      suppressSkipped: true // do not print information about skipped tests
    },

    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: true,

    // enable / disable colors in the output (reporters and logs)
    colors: true,

    // list of files / patterns to load in the browser
    files: ['node_modules/babel-polyfill/dist/polyfill.js'],

    jspm: {
      useBundles: true,
      config: './config.js',
      loadFiles: ['./tests/unit/**/*.spec.js'],
      serveFiles: [
        './src/js/**/*.js',
        './src/**/*.html',
        './src/**/*.css'
      ],
      packages: 'jspm_packages'
    },

    proxies: {
      '/js/': '/base/src/js',
      '/tests/': '/base/tests/',
      '/jspm_packages/': '/base/jspm_packages/'
    },

    // list of files to exclude
    exclude: [],

    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO

  });
};
