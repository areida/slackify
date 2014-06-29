'use strict';

var gulp       = require('gulp'),
    connect    = require('gulp-connect'),
    fallback   = require('connect-history-api-fallback');

gulp.task('connect', function() {
    connect.server({
        root       : 'build',
        port       : 9001,
        livereload : true,
        middleware : function (connect, options) {
            return [fallback];
        }
    });
});
