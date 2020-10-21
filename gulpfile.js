'use strict';

var gulp = require('gulp'),
    sass = require('gulp-sass'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglifyjs'),
    rename = require('gulp-rename'),
    del = require('del'),
    imagemin = require('gulp-imagemin'),
    imagequant = require('imagemin-pngquant'),
    cache = require('gulp-cache'),
    autoprefixer = require('gulp-autoprefixer'),
    fileinclude = require('gulp-file-include'),
    sourcemaps = require('gulp-sourcemaps');

gulp.task('html', function () {
    return gulp.src('app/html/*.html')
        .pipe(fileinclude())
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

gulp.task('clear', function () {
    return cache.clearAll();
});

gulp.task('img', function () {
    return gulp.src('app/img/**/*')
        .pipe(cache(imagemin({
            interlaced: true,
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            une: [imagequant()]
        })))
        .pipe(gulp.dest('dist/img'));
});

gulp.task('watch', gulp.series('html', 'sass', function () {
        gulp.watch('app/html/**/*.html', gulp.series('html'));
        gulp.watch('app/sass/**/*.scss', gulp.series('sass'));
    })
);

gulp.task('build', gulp.series(
    'clean',
    'clear',
    'html',
    'sass',
    'fonts',
    'img',
    'scripts'
));
