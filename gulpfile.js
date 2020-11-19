'use strict';

const gulp = require('gulp');
const del = require('del');
const file_include = require('gulp-file-include');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const rename = require('gulp-rename');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const imagemin = require('gulp-imagemin');
const imagemin_png = require('imagemin-pngquant');
const browserSync = require("browser-sync").create();

gulp.task('clear', function () {
    return del('dist');
});

gulp.task('html', function () {
    return gulp.src('app/html/*.html')
        .pipe(file_include())
        .pipe(gulp.dest('dist'))
        .pipe(browserSync.reload({stream: true}));
});

gulp.task('sass', function () {
    return gulp.src('app/sass/main.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({outputStyle: 'compressed'}))
        .pipe(rename({suffix: '.min'}))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('dist/css'))
        .pipe(browserSync.reload({stream: true}));
});

gulp.task('fonts', function () {
    return gulp.src('app/fonts/fontello.*')
        .pipe(gulp.dest('dist/css/fonts'))
        .pipe(browserSync.reload({stream: true}));
});

gulp.task('scripts', function () {
    return gulp.src([
        'node_modules/jquery/dist/jquery.slim.min.js',
        'node_modules/slick-carousel/slick/slick.min.js',
        'app/js/common.js'
    ])
        .pipe(concat('main.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'))
        .pipe(browserSync.reload({stream: true}));
});

gulp.task('images', function () {
    return gulp.src('app/img/**/*')
        .pipe(imagemin({
            interlaced: true,
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            une: [imagemin_png()]
        }))
        .pipe(gulp.dest('dist/img'))
        .pipe(browserSync.reload({stream: true}));
});

gulp.task('build', gulp.series('clear', [
    'html',
    'sass',
    'fonts',
    'scripts',
    'images'
]));

gulp.task('watch', gulp.series('build', function () {
    gulp.watch('app/html/**/*.html', gulp.series('html'));
    gulp.watch('app/sass/**/*.scss', gulp.series('sass'));
    gulp.watch('app/fonts/*', gulp.series('fonts'));
    gulp.watch('app/js/**/*.js', gulp.series('scripts'));
    gulp.watch('app/img/**/*', gulp.series('images'));

    browserSync.init({
        server: {
            baseDir: "./dist"
        }
    });
}));

gulp.task('default', gulp.series('watch'));
