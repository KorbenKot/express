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
        fs = require('file-system'),
        through = require('through2'),
        hb = require('gulp-hb'),
        argv = require('yargs').argv,
        path = require('path');

let project = argv.project;

// SOURCE PATHS

let src = {
    templates: "src/views/blocks/",
    hb: {
        data: {
            all: "src/data/all.json",
            templates: "src/data/partials/"
        },
        partials: "src/views/blocks/"
    },
    static: {
        css: "src/css/",
        js: "src/js/",
        img: "src/img/**",
        fonts: "src/fonts/*",
    }
};

// DESTINATION PATHS

let dist = {
    dir: "./dest",
    templates: "./dest"
};

let dest = {
    css: dist.dir + "css/",
    img: dist.dir + "img/",
    fonts: dist.dir + "fonts/",
    js: dist.dir + "js/",
};

/* MAIN TASK */

gulp.task('default', ['browser-sync', 'css', 'fonts', 'js'], function () { });

gulp.task('browser-sync', ['nodemon'], function () {
    browserSync.init({
        proxy: 'http://localhost:8080',
        browser: 'chrome',
        files: ['./src/views/blocks/**/**.css', './src/views/blocks/**/*.js', './src/css/*.css', './src/views/blocks/*.handlebars'],
        port: 3000
    });

    gulp.watch(['src/views/blocks/**/*.css'], ['css']);
    gulp.watch(['scr/css/*.css'], ['css']);
    gulp.watch(['src/views/blocks/**/*.js'], ['js']);
    gulp.watch('src/views/blocks/*.handlebars').on('change', browserSync.reload);
});

// HANDLEBARS TO HTML

gulp.task('hb', function () {

    return gulp.src("src/views/*.handlebars")

        .pipe(hb()
            .partials('src/views/blocks/*.handlebars')
            .data('src/data/all.json')
        )
        .pipe(rename({extname: ".html"}))
        .pipe(debug({title: 'template:'}))
        .pipe(gulp.dest(dist.templates))
});

// CSS

gulp.task('css', function () {
    const processors = [
        require('postcss-import'),
        require('postcss-custom-media'),
        require('postcss-assets')({
            loadPaths: ['src/img/', 'src/sprite/', 'src/svg/'],
            relative: true
        }),
        require('postcss-nested'),
        require('postcss-nesting'),
        require('postcss-simple-vars'),
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


// JS

gulp.task('js', function () {

        return gulp.src('./src/views/blocks/**/**.js')
            .pipe(newer('./dest/js/main.min.js'))
            .pipe(concat('main.js'))
            .pipe(uglify())
            .pipe(rename('main.min.js'))
            .pipe(debug({title: 'javascript : '}))
            .pipe(gulp.dest('./dest/js'))
            .pipe(browserSync.stream());
});

// NODEMON

gulp.task('nodemon', function (cb) {

    let started = false;

    return nodemon({
        script: 'app.js'
    }).on('start', function () {
        if (!started) {
            cb();
            started = true;
        }
    });
});