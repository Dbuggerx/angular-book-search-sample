/*jshint node:true */
'use strict';

import gulp from 'gulp';
import browserSync from 'browser-sync';
import util from 'gulp-util';
import path from 'path';

let bs = browserSync.create();

function logChanges(event) {
  util.log(
    util.colors.green('File ' + event.type + ': ') +
    util.colors.magenta(path.basename(event.path))
  );
}

gulp.task('reload', function (done) {
  bs.reload();
  done();
});

gulp.task('serve', () => {
  bs.init({
    port: process.env.PORT || 3000,
    open: true,
    server: {
      baseDir: [global.paths.src, './']
    },
  });

  gulp.watch([global.paths.js], ['lintjs', 'reload']).on('change', logChanges);
  gulp.watch([global.paths.sass], ['sass', 'reload']).on('change', logChanges);
  gulp.watch([global.paths.html, global.paths.index], ['reload']).on('change', logChanges);
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
