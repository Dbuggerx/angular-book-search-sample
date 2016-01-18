/*jshint node:true */
'use strict';

import gulp from 'gulp';
import jspm from 'jspm';
import uglify from 'gulp-uglify';
import path from 'path';
import cache from 'gulp-cached';
import jshint from 'gulp-jshint';

gulp.task('buildjs', function () {
  var dist = path.join(global.paths.dist, 'app.min.js');
  // Use JSPM to bundle our app
  return jspm.bundleSFX('src/js/main', dist, {encodeNames: false})
    .then(function () {
      // Also create a fully annotated minified copy
      return gulp.src(dist)
        .pipe(uglify())
        .pipe(gulp.dest(global.paths.dist));
    });
});

// Lint JS.
gulp.task('lintjs', function () {
  return gulp.src(global.paths.js)
    .pipe(cache('lintjs'))
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
    .pipe(jshint.reporter('fail'));
});
