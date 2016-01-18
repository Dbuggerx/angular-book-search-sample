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

const sassOptions = {
  errLogToConsole: true,
  outputStyle: 'expanded'
};

gulp.task('sass', () => {
  return gulp.src(global.paths.sass)
    .pipe(sass(sassOptions).on('error', sass.logError))
    .pipe(rename('app.css'))
    .pipe(gulp.dest(global.paths.css))
    .pipe(postcss([autoprefixer(), postcssImport, postcssAssets({
      basePath: 'src',
      loadPaths: ['img']
    })]))
    .pipe(gulp.dest(global.paths.css));
});

gulp.task('buildsass', () => {
  return gulp.src(global.paths.sass)
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
