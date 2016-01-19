/*jshint node:true */
'use strict';

import gulp from 'gulp';
import templateCache from 'gulp-angular-templatecache';
import fs from 'fs';
import path from 'path';
import minifyHtml from 'gulp-htmlmin';
import htmlreplace from 'gulp-html-replace';

gulp.task('templates', done => {
  // create empty module in development
  fs.writeFileSync(path.join(global.paths.src, 'js', 'templates.js'),
    'angular.module("templates", []);'
  );
  done();
});

// Build templates for distribution.
gulp.task('build-templates', () => {
  //Populate the $templateCache
  return gulp.src(global.paths.html)
    .pipe(minifyHtml({
      collapseWhitespace: true,
      removeComments: true
    }))
    .pipe(templateCache({
      standalone: true,
      root: 'templates/',
      module: 'templates'
    }))
    .pipe(gulp.dest(path.join(global.paths.src, 'js')));
});

// Build HTML for distribution.
gulp.task('build-html', () => {
  gulp.src(path.join(global.paths.src, 'index.html'))
    .pipe(htmlreplace({
      'js': 'app.min.js',
      'css': 'app.min.css'
    }))
    .pipe(gulp.dest(global.paths.dist));
});
