const gulp = require('gulp');
const imagemin = require('gulp-imagemin');
const sass = require('gulp-sass');
const cleanCSS = require('gulp-clean-css');
const fileinclude = require ('gulp-file-include');
const autoprefixer = require ('gulp-autoprefixer');
const browserSync = require('browser-sync').create(); 
const sourcemaps = require('gulp-sourcemaps');
// const sassLinter = require('gulp-sass-lint');


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

// function sassLint() {
//     return gulp.src(scssSrc + '/**/*.scss')
//     .pipe(sassLinter())
//     .pipe(sassLinter.format())
//     .pipe(sassLinter.failOnError())
// }

function css() {
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

    // gulp.watch(styleWatchFiles, sassLint);
    gulp.watch(styleWatchFiles, css).on('change', browserSync.reload);
    gulp.watch(htmlWatchFiles, fileInclude).on('change', browserSync.reload);
    gulp.watch(imgSrc, imgmin).on('change', browserSync.reload);
}


// exports.sassLint = sassLint;
exports.css = css;
exports.imgmin = imgmin;
exports.watch = watch;
exports.fileInclude = fileInclude;

const build = gulp.parallel(watch);
gulp.task('default', build)










