'use strict';

const gulp = require('gulp');
const del = require('del');
const autoprefixer = require('gulp-autoprefixer');
const file_include = require('gulp-file-include');
const imagemin = require('gulp-imagemin');
const imagemin_png = require('imagemin-pngquant');
const rename = require('gulp-rename');
const sass = require('gulp-sass');
const uglify = require('gulp-uglifyjs');
const concat = require('gulp-concat');
const sourcemaps = require('gulp-sourcemaps');

gulp.task('html', function () {
    return gulp.src('app/html/*.html')
        .pipe(file_include())
        .pipe(gulp.dest('dist'));
});

gulp.task('sass', function () {
    return gulp.src('app/sass/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({outputStyle: 'compressed'}))
        .pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], {cascade: true}))
        .pipe(sourcemaps.write())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('dist/css'));
});

gulp.task('fonts', function () {
    return gulp.src('app/fonts/fontello.*')
        .pipe(gulp.dest('dist/css/fonts'));
});

gulp.task('scripts', function () {
    return gulp.src([
        'app/libs/jquery/dist/jquery.js',
        'app/libs/slick-carousel/slick/slick.min.js',
        'app/libs/bootstrap/dist/js/bootstrap.js',
        'app/js/common.js'
    ])
        .pipe(concat('main.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'));
});

gulp.task('clean', function () {
    return del('dist');
});

gulp.task('img', function () {
    return gulp.src('app/img/**/*')
        .pipe(imagemin({
            interlaced: true,
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            une: [imagemin_png()]
        }))
        .pipe(gulp.dest('dist/img'));
});

gulp.task('watch', gulp.series('html', 'sass', function () {
        gulp.watch('app/html/**/*.html', gulp.series('html'));
        gulp.watch('app/sass/**/*.scss', gulp.series('sass'));
    })
);

gulp.task('build', gulp.series(
    'clean',
    'html',
    'sass',
    'fonts',
    'img',
    'scripts'
));
