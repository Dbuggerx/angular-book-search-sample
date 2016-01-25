/*jshint node:true */
'use strict';

import gulp from 'gulp';
import browserSync from 'browser-sync';
import util from 'gulp-util';
import path from 'path';
import runSeq from 'run-sequence';

let bs = browserSync.create();

function onChange(event) {
  util.log(
    util.colors.green('File ' + event.type + ': ') +
    util.colors.magenta(path.basename(event.path))
  );
}

gulp.task('reload', function (done) {
  bs.reload();
  done();
});

gulp.task('serve', ['sass', 'templates'], () => {
  bs.init({
    port: process.env.PORT || 3000,
    open: true,
    server: {
      baseDir: [global.paths.src, './']
    },
  });

  gulp.watch([global.paths.js], ['lintjs', 'reload']).on('change', onChange);
  gulp.watch([global.paths.html], ['templates', 'reload']).on('change', onChange);
  gulp.watch([global.paths.sass], ['sass']).on('change', onChange);
  gulp.watch([path.join(global.paths.css, 'app.css')], ['reload']).on('change', onChange);
  gulp.watch([global.paths.html, global.paths.index], ['']).on('change', onChange);
});

gulp.task('serve:dist', ['build'], () => {
  bs.init({
    port: process.env.PORT || 3000,
    open: true,
    server: {
      baseDir: global.paths.dist
    },
  });
});

gulp.task('serve:jsdoc', ['jsdoc'], () => {
  bs.init({
    port: process.env.PORT || 3000,
    open: true,
    server: {
      baseDir: global.paths.jsdocs
    },
  });
});

gulp.task('serve:sassdoc', ['sassdoc'], () => {
  bs.init({
    port: process.env.PORT || 3000,
    open: true,
    server: {
      baseDir: global.paths.sassdocs
    },
  });
});
