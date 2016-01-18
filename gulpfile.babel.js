/*jshint node:true */
'use strict';

// Specify paths & globbing patterns for tasks.
global.paths = {
  // HTML sources.
  'html': './src/templates/**/*.html',
  //index
  'index': './src/index.html',
  // JS sources.
  'js': './src/js/**/*.js',
  // SASS sources.
  'sass': './src/scss/**/*.scss',
  // Image sources.
  'img': './src/img/*',
  // Sources folder.
  'src': './src',
  // Compiled CSS folder.
  'css': './src/css',
  // Distribution folder.
  'dist': './dist'
};

import gulp from 'gulp';
import requireDir from 'require-dir';
requireDir('./gulp', { recurse: false });

// Default task; start local server & watch for changes.
gulp.task('default', ['serve']);
