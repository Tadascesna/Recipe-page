const gulp = require('gulp');
const imagemin = require('gulp-imagemin');
const sass = require('gulp-sass');
const cleanCSS = require('gulp-clean-css');
const fileinclude = require ('gulp-file-include');
const autoprefixer = require ('gulp-autoprefixer');
const browserSync = require('browser-sync').create(); 
const sourcemaps = require('gulp-sourcemaps');
const scssLinter = require('gulp-sass-lint');


// ROUTES

const scssSrc = 'src/sass/';
const htmlSrc = 'src/views/';
const imgSrc = 'src/assets/*';

const imgDest = 'dist/assets';
const scssDest = 'dist/css/';
const htmlDest = 'dist/';


const styleWatchFiles = scssSrc + '**/*.scss';
const htmlWatchFiles = htmlSrc + '**/*.html';



function fileInclude() {
    return gulp.src(['index.html'])
    .pipe(fileinclude({
        prefix: '@@',
        basepath: '@file'
    }))
    .pipe(gulp.dest(htmlDest))
}

function scssLint() {
    return gulp.src(scssSrc + '/**/*.scss')
    .pipe(scssLinter({
        rules: {
            'indentation': 0,
            'class-name-format': 0,
            'zero-unit': 0,
        }
    }))
    .pipe(scssLinter.format())
    .pipe(scssLinter.failOnError())
}

function scss() {
    return gulp.src(scssSrc + 'style.scss')
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(sass().on('error',sass.logError))
    .pipe(autoprefixer('last 2 versions'))
    .pipe(cleanCSS())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(scssDest))
}

function imgmin() {
    return gulp.src(imgSrc)
    .pipe(imagemin())
    .pipe(gulp.dest(imgDest))
}

function watch() {
    browserSync.init({
        server: {
            baseDir: "dist/"
        }
    });

    gulp.watch(styleWatchFiles, scssLint);
    gulp.watch(styleWatchFiles, scss).on('change', browserSync.reload)
    gulp.watch(htmlWatchFiles, fileInclude).on('change', browserSync.reload);
    gulp.watch(imgSrc, imgmin).on('change', browserSync.reload);
}


exports.scssLint = scssLint;
exports.scss = scss;
exports.imgmin = imgmin;
exports.watch = watch;
exports.fileInclude = fileInclude;

const build = gulp.parallel(watch);
gulp.task('default', build)










