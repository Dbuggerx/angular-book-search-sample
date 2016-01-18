/*jshint node:true */
'use strict';

import gulp from 'gulp';
import sass from 'gulp-sass';
import rename from 'gulp-rename';
import postcss from 'gulp-postcss';
import postcssImport from 'postcss-import';
import postcssAssets from 'postcss-assets';
import autoprefixer from 'autoprefixer';
import minifyCss from 'gulp-cssnano';
import sassdoc from 'sassdoc';
import del from 'del';

const sassDocOptions = {
  dest: global.paths.sassdocs
};

gulp.task('sassdoc', () => {
  del([global.paths.sassdocs + '/**']).then(() => {
    gulp.src(global.paths.sass)
      .pipe(sassdoc(sassDocOptions));
  });
});

const sassOptions = {
  errLogToConsole: true,
  outputStyle: 'expanded'
};

gulp.task('sass', (done) => {
  gulp.src(global.paths.sassMain)
    .pipe(sass(sassOptions).on('error', sass.logError))
    .pipe(rename('app.css'))
    .pipe(postcss([autoprefixer(), postcssImport, postcssAssets({
      basePath: 'src',
      loadPaths: ['img']
    })]))
    .pipe(gulp.dest(global.paths.css))
    .on('end', done);
});

gulp.task('buildSass', () => {
  return gulp.src(global.paths.sassMain)
    .pipe(sass(sassOptions).on('error', sass.logError))
    .pipe(rename('app.css'))
    .pipe(postcss([autoprefixer(), postcssImport, postcssAssets({
      basePath: global.paths.dist,
      loadPaths: ['fonts', 'img']
    })]))
    .pipe(minifyCss())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest(global.paths.dist));
});
