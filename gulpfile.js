/* jshint node: true */
'use strict';

var gulp       = require('gulp'),
    clean      = require('gulp-clean');

// Require all our tasks
require('./gulp-tasks/browserify');
require('./gulp-tasks/concat');
require('./gulp-tasks/connect');
require('./gulp-tasks/media');
require('./gulp-tasks/preprocess');
require('./gulp-tasks/sass');

gulp.task('default', ['build']);

// Alias
gulp.task('browserify', ['browserify:config', 'browserify:app']);

// Task that builds our entire application
gulp.task('build', ['html', 'media', 'concat', 'sass', 'browserify']);

// Development mode (runs a web server and watches)
gulp.task('watch', ['build', 'connect', 'delta']);

// Watch definitions
gulp.task('delta', function() {
    gulp.watch(['./application/ui/scss/**/*.scss'], ['sass']);
    gulp.watch(['./application/**/*.html'], ['html']);
    gulp.watch(['./media/**/*.*'], ['media']);
});

// Clean the build dir
gulp.task('clean', function(cb) {
    gulp.src('./build', {read: false})
        .pipe(clean());
});
