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

gulp.task('scripts', function () {
    return gulp.src([
        'app/libs/jquery/dist/jquery.js',
        'app/libs/slick-carousel/slick/slick.min.js'
    ])
        .pipe(concat('libs.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('app/js'));
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

gulp.task('build', gulp.series('clean', 'clear', 'html', 'img', 'sass', 'scripts'));

// gulp.task('build', gulp.series('html', 'img', 'sass', 'styles', function () {
//     var buildCss = gulp.src([
//         'app/css/main.min.css',
//         'app/css/libs.min.css'
//     ])
//         .pipe(gulp.dest('dist/css'));
//
//     var buildFonts = gulp.src([
//         'app/fonts/**/*'
//     ])
//         .pipe(gulp.dest('dist/fonts'));
//
//     var buildHtml = gulp.src('app/*.html')
//         .pipe(gulp.dest('dist'));
//
//     return buildCss;
//     return buildFonts;
//     return buildJs;
//     return buildHtml;
// }));

