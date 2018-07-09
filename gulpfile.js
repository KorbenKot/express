var         gulp = require ('gulp');
var         browserSync = require ('browser-sync').create();
var         nodemon = require ('gulp-nodemon');
var         postcss = require ('gulp-postcss');


gulp.task('default', ['browser-sync'], function () {
});

gulp.task('browser-sync', ['nodemon'], function () {
    browserSync.init({
        proxy: 'http://localhost:8080',
        browser: 'chrome',
        files: ['./views/*.pug', './*.js'],
        port: 3000
    });

    gulp.watch("public/scss/*.scss", ['css']);
    gulp.watch("views/*.html").on('change', browserSync.reload);

});


gulp.task('css', function () {
    var processors = [
    ];
    return gulp.src('./src/*.css')
        .pipe(postcss(processors))
        .pipe(gulp.dest('./dest'))
        .pipe(browserSync.stream());
});

gulp.task('nodemon', function (cb) {

    var started = false;

    return nodemon({
        script: 'app.js'
    }).on('start', function () {
        // to avoid nodemon being started multiple times
        if (!started) {
            cb();
            started = true;
        }
    });
});


