"use strict";
const
        gulp = require ('gulp'),
        browserSync = require ('browser-sync').create(),
        nodemon = require ('gulp-nodemon'),
        postcss = require ('gulp-postcss'),
        debug = require("gulp-debug"),
        rename = require('gulp-rename'),
        concat = require('gulp-concat'),
        uglify = require('gulp-uglify'),
        newer = require('gulp-newer'),
        fs = require('file-system');

gulp.task('default', ['browser-sync', 'css', 'fonts'], function () { });

gulp.task('browser-sync', ['nodemon'], function () {
    browserSync.init({
        proxy: 'http://localhost:8080',
        browser: 'chrome',
        files: ['./views/blocks/**/*.css', './src/css/*.css', './views/blocks/*.handlebars'],
        port: 3000
    });

    gulp.watch(['views/blocks/**/*.css'], ['css']);
    gulp.watch(['scr/css/*.css'], ['css']);
    gulp.watch('views/blocks/*.handlebars').on('change', browserSync.reload);
});

gulp.task('css', function () {
    const processors = [
        require('postcss-import'),
        require('postcss-assets')({
            loadPaths: ['src/img/', 'src/sprite/', 'src/svg/'],
            relative: true
        }),
        require('postcss-nested'),
        require('postcss-nesting'),
        require('postcss-simple-vars'),
        require('postcss-custom-media'),
        require('postcss-center'),
        require('postcss-pxtorem'),
        require('postcss-svg'),
        require('postcss-inline-svg'),
        require('postcss-short'),
        require('cssnano')({
            autoprefixer: false,
            reduceIdents: false
        })
    ];

    return gulp.src('./src/css/*.css')
        .pipe(postcss(processors))
        .pipe(concat('style.css'))
        .pipe(rename('style.min.css'))
        .pipe(debug({title: 'css: '}))
        .pipe(gulp.dest('./dest/css'))
        .pipe(browserSync.stream());
});

// FONTS

gulp.task('fonts', function () {

    return gulp.src('./src/fonts/*')
        .pipe(newer('./dest/fonts'))
        .pipe(debug({title: 'fonts: '}))
        .pipe(gulp.dest('./dest/fonts'));
});

gulp.task('nodemon', function (cb) {

    var started = false;

    return nodemon({
        script: 'app.js'
    }).on('start', function () {
        if (!started) {
            cb();
            started = true;
        }
    });
});