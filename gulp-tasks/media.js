'use strict';

var gulp     = require('gulp'),
    connect  = require('gulp-connect');

gulp.task('media', function() {
    gulp.src('./media/**/*.*')
        .pipe(gulp.dest('./build'))
        .pipe(connect.reload());

    gulp.src([
            './node_modules/font-awesome/fonts/fontawesome-webfont.*'
        ])
        .pipe(gulp.dest('./build/fonts'))
        .pipe(connect.reload());

    gulp.src([
            './application/sitemap.xml'
        ])
        .pipe(gulp.dest('./build'))
        .pipe(connect.reload());
});
