/*jshint node:true */
'use strict';

import gulp from 'gulp';
import sass from 'gulp-sass';
import rename from 'gulp-rename';
import postcss from 'gulp-postcss';
import postcssImport from 'postcss-import';
import postcssAssets from 'postcss-assets';
import postcssCopy from 'postcss-copy';
import autoprefixer from 'autoprefixer';
import minifyCss from 'gulp-cssnano';
import sassdoc from 'sassdoc';
import del from 'del';
import path from 'path';

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

gulp.task('sass', () => {
  return gulp.src(global.paths.sassMain)
    .pipe(sass(sassOptions).on('error', sass.logError))
    .pipe(rename('app.css'))
    .pipe(postcss([autoprefixer(), postcssImport, postcssAssets({
      basePath: '.',
      relativeTo: './src/scss/',
      loadPaths: ['jspm_packages/npm/mdi@1.4.57/fonts',
        'jspm_packages/bower/roboto-fontface@0.4.3/fonts', 'img'
      ]
    })]))
    .pipe(gulp.dest(global.paths.css));
});

// Clear the assets dir.
gulp.task('clean-assets', done => {
  del([global.paths.dist + '/assets']).then(() => done());
});

gulp.task('build-css', ['clean-assets', 'sass'], () => {
  return gulp.src(path.join(global.paths.css, 'app.css'))
    .pipe(postcss([postcssCopy({
      src: ['./'],
      dest: global.paths.dist,
      template: 'assets/[name].[ext]',
      keepRelativePath: false
    })], {
      to: path.join(global.paths.dist, 'app.min.css')
    }))
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest(global.paths.dist));
});
