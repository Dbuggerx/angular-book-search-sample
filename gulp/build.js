/*jshint node:true */
'use strict';

import gulp from 'gulp';
import runSeq from 'run-sequence';
import del from 'del';
import path from 'path';
import htmlreplace from 'gulp-html-replace';

// Empty the build dir.
gulp.task('clean', done => {
  del([global.paths.dist + '/*']).then(() => done());
});

// One build task to rule them all!
gulp.task('build', done => {
  runSeq('clean', ['buildsass', 'buildhtml', 'buildjs'], done);
});

gulp.task('buildhtml', () => {
  gulp.src(path.join(global.paths.src, 'index.html'))
    .pipe(htmlreplace({
      'js': 'app.min.js',
      'css': 'app.min.css'
    }))
    .pipe(gulp.dest(global.paths.dist));
});
