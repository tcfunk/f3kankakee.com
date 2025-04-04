let gulp = require('gulp'),
    sass = require('gulp-sass')(require('sass')),
    sassGlob = require('gulp-sass-glob'),
    autoprefixer = require('gulp-autoprefixer'),
    remToPx = require('gulp-rem-to-px'),
    csscombx = require('gulp-csscombx')

// scss
gulp.task('scss', function () {

  return gulp.src('./sass/components/**/*.scss')
    .pipe(sassGlob())
    .pipe(csscombx())
    .pipe(gulp.dest('./sass/components'));

});

// ckeditor
gulp.task('ckeditor', function () {

  return gulp.src('./css/ckeditor.css')
    .pipe(remToPx({
    fontSize : 10
    }))
    .pipe(gulp.dest('./css'));

});

// sass
gulp.task('sass', function () {

  return gulp.src('./sass/*.scss')

    .pipe(sassGlob())
    .pipe(sass())
    .pipe(autoprefixer())
    .pipe(csscombx())
    .pipe(gulp.dest('./css'))

});

gulp.task('default', gulp.series('sass', 'ckeditor', function () {
  gulp.watch( './sass/**/*.scss', gulp.series('sass', 'ckeditor'));
}));
