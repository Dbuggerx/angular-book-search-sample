/*jshint node:true */
'use strict';

import gulp from 'gulp';
import jspm from 'jspm';
import uglify from 'gulp-uglify';
import path from 'path';
import cache from 'gulp-cached';
import jshint from 'gulp-jshint';
import ngAnnotate from 'gulp-ng-annotate';
import del from 'del';
import babel from 'gulp-babel';
import jsdoc from 'gulp-jsdoc3';

gulp.task('del-jsdoc', () => {
  return del([global.paths.jsdocs + '/**']);
});

// Create documentation
gulp.task('jsdoc', cb => {
  gulp.src(global.paths.js, {
      read: false
    })
    .pipe(jsdoc({
      "tags": {
        "allowUnknownTags": true,
        "dictionaries": ["jsdoc"]
      },
      "source": {
        "includePattern": ".+\\.js(doc)?$",
        "excludePattern": "(^|\\/|\\\\)_"
      },
      "opts": {
        "destination": global.paths.jsdocs
      },
      "plugins": [],
      "templates": {
        "cleverLinks": true,
        "monospaceLinks": false
      }
    }, cb));
});

gulp.task('build-js', ['build-templates'], function () {
  var dist = path.join(global.paths.dist, 'app.min.js');
  // Use JSPM to bundle our app
  return jspm.bundleSFX('src/js/main', dist, {
      encodeNames: false
    })
    .then(function () {
      // Also create a fully annotated minified copy
      return gulp.src(dist)
        .pipe(ngAnnotate())
        .pipe(uglify())
        .pipe(gulp.dest(global.paths.dist));
    });
});

// Lint JS.
gulp.task('lint-js', function () {
  return gulp.src(global.paths.js)
    .pipe(cache('lintjs'))
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
    .pipe(jshint.reporter('fail'));
});
