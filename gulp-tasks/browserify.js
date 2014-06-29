/* jshint node: true */
'use strict';

var gulp       = require('gulp'),
    gutil      = require('gulp-util'),
    watchify   = require('watchify'),
    reactify   = require('reactify'),
    source     = require('vinyl-source-stream'),
    streamify  = require('gulp-streamify'),
    connect    = require('gulp-connect'),
    uglify     = require('gulp-uglify');

gulp.task('browserify:app', function()
{
    var bundler = watchify({
            entries    : ['./application/bootstrap.js'],
            extensions : ['.js', '.jsx']
        })
        .external('config')
        .transform(reactify);

    var rebundle = function() {
        var stream = bundler.bundle({
            debug : (gutil.env.build !== 'production')
        });

        stream.on('error', gutil.log);

        stream = stream.pipe(source('app.js'))
            .pipe(gutil.env.build === 'production' ? streamify(uglify()) : gutil.noop())
            .pipe(gulp.dest('./build/js'))
            .pipe(connect.reload());

        return stream;
    };

    bundler.on('log', gutil.log);
    bundler.on('update', rebundle);
    return rebundle();
});

gulp.task('browserify:config', function()
{
    var env = (gutil.env.build ) ? gutil.env.build : 'development';

    var bundler = watchify()
        .require('./application/config/config.'+env+'.js', { expose : 'config' });

    var rebundle = function() {
        var stream = bundler.bundle({
            debug : (gutil.env.build !== 'production')
        });

        stream.on('error', gutil.log);

        stream = stream.pipe(source('config.js'))
            .pipe(gutil.env.build === 'production' ? streamify(uglify()) : gutil.noop())
            .pipe(gulp.dest('./build/js'))
            .pipe(connect.reload());

        return stream;
    };

    bundler.on('log', gutil.log);
    bundler.on('update', rebundle);
    return rebundle();
});
