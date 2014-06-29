/* jshint node: true */
'use strict';

var gulp         = require('gulp'),
    gutil        = require('gulp-util'),
    sass         = require('gulp-sass'),
    minifyCss    = require('gulp-minify-css'),
    connect      = require('gulp-connect'),
    autoPrefixer = require('gulp-autoprefixer');

var isProduction = gutil.env.build === 'production',
    includePaths = [
        './node_modules/font-awesome/scss',
        './bower_components/foundation/scss',
        './bower_components/bourbon/app/assets/stylesheets'
    ];

gulp.task('sass:app', function() {
    gulp.src('./application/ui/scss/app.scss')
        .pipe(sass({
            errLogToConsole : true,
            sourceComments : 'none',
            outputStyle    : 'compressed',
            sourceMap      : 'sass',
            includePaths   : includePaths
        }))
        .pipe(autoPrefixer({
            cascade: true,
            to: 'app.css',
            from: './application/ui/scss'
        }))
        // production only because it breaks source maps
        .pipe(isProduction ? minifyCss({keepSpecialComments : '*'}) : gutil.noop())
        .pipe(gulp.dest('./build/css'))
        .pipe(connect.reload());
});

gulp.task('sass', [ 'sass:app' ]);
