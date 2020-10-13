'use strict';

var gulp = require('gulp'),
    sass = require('gulp-sass'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglifyjs'),
    cssnano = require('gulp-cssnano'),
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
        .pipe(gulp.dest('app'));
});

gulp.task('sass', function () {
    return gulp.src('app/sass/**/*.scss')
        .pipe(sass())
        .pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], {cascade: true}))
        .pipe(gulp.dest('app/css'));
});

gulp.task('styles', function () {
    return gulp.src([
        'app/css/libs.css',
        'app/css/main.css'
    ])
        .pipe(cssnano()) // Сжимает минимизирует файлы
        .pipe(rename({suffix: '.min'})) // Задаем название нового минимизированного файла
        .pipe(gulp.dest('app/css'));
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

gulp.task('watch', gulp.series('html', 'sass', 'styles', function () {
        gulp.watch('app/html/**/*.html', gulp.series('html'));
        gulp.watch('app/sass/**/*.scss', gulp.series('sass'));
        gulp.watch(['app/css/main.css', 'app/css/libs.css'], gulp.series('styles'));
    })
);

gulp.task('build', gulp.series('html', 'img', 'sass', 'styles', function () {
    var buildCss = gulp.src([
        'app/css/main.min.css',
        'app/css/libs.min.css'
    ])
        .pipe(gulp.dest('dist/css'));

    var buildFonts = gulp.src([
        'app/fonts/**/*'
    ])
        .pipe(gulp.dest('dist/fonts'));

    var buildHtml = gulp.src('app/*.html')
        .pipe(gulp.dest('dist'));

    return buildCss;
    return buildFonts;
    return buildJs;
    return buildHtml;
}));

