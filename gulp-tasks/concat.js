'use strict';

var gulp    = require('gulp'),
    concat  = require('gulp-concat'),
    connect = require('gulp-connect');

gulp.task('concat', function() {
    gulp.src([
            'bower_components/modernizr/modernizr.js'
        ])
        .pipe(concat('vendor-header.js'))
        .pipe(gulp.dest('./build/js'))
        .pipe(connect.reload());
    
    gulp.src([
    		'./node_modules/font-awesome/css/font-awesome.min.css'
    	])
        .pipe(concat('vendor.css'))
        .pipe(gulp.dest('./build/css'));
});
