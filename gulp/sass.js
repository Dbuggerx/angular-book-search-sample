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

gulp.task('sass', (done) => {
  gulp.src(global.paths.sassMain)
    .pipe(sass(sassOptions).on('error', sass.logError))
    .pipe(rename('app.css'))
    .pipe(postcss([autoprefixer(), postcssImport, postcssAssets({
      basePath: 'src',
      loadPaths: ['../jspm_packages/npm/mdi@1.4.57/fonts',
        '../jspm_packages/bower/roboto-fontface@0.4.3/fonts', 'img'
      ]
    })]))
    .pipe(gulp.dest(global.paths.css))
    .on('end', done);
});

gulp.task('build-sass', (done) => {
  gulp.src(['jspm_packages/npm/mdi@1.4.57/fonts/**', '../jspm_packages/bower/roboto-fontface@0.4.3/fonts/**'])
    .pipe(gulp.dest(path.join(global.paths.dist, 'fonts')))
    .on('end', () => {
      gulp.src(global.paths.sassMain)
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
      done();
    });
});
