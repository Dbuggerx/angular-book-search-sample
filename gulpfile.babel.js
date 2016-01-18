/*jshint node:true */
'use strict';

// Specify paths & globbing patterns for tasks.
global.paths = {
  // HTML sources.
  'html': './src/templates/**/*.html',
  //Index page
  'index': './src/index.html',
  // JS sources.
  'js': './src/js/**/*.js',
  // SASS sources.
  'sass': './src/scss/**/*.scss',
  //Main SASS file
  'sassMain': './src/scss/main.scss',
  // Image sources.
  'img': './src/img/*',
  // Sources folder.
  'src': './src',
  // Compiled CSS folder.
  'css': './src/css',
  // Distribution folder.
  'dist': './dist',
  // Documentation folder for SASS
  'sassdocs': './docs/sass'
};

import gulp from 'gulp';
import requireDir from 'require-dir';
requireDir('./gulp', { recurse: false });

// Default task; start local server & watch for changes.
gulp.task('default', ['serve']);
