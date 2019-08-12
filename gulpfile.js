const gulp = require('gulp');
const imagemin = require('gulp-imagemin');
const scss = require('gulp-sass');
const uglifyCss = require('gulp-clean-css');
const concat = require('gulp-concat');
const fileinclude = require ('gulp-file-include')



gulp.task('fileinclude', done => {
    gulp.src('src/views/index.html')
        .pipe(fileinclude({
            prefix: '@@',
            basepath: '@file'
        }))
        .pipe(gulp.dest('dist/'));
        done();
} )




gulp.task('imageMin', done => {
    gulp.src('src/assets/*')
    .pipe(imagemin())
    .pipe(gulp.dest('dist/assets'));
    done();
})

gulp.task('sass', done => {
    gulp.src('src/sass/**/*.scss')
    .pipe(scss().on('error', scss.logError))
    .pipe(uglifyCss())
    .pipe(concat('style.min.css'))
    .pipe(gulp.dest('dist/css'));
    done();
})


gulp.task('default',gulp.parallel(['fileinclude', 'sass']));

gulp.task('watch', done => {
    gulp.watch('src/sass/*', ['sass']);
    done ()
} )




