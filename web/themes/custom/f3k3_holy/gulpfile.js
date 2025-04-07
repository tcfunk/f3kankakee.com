let gulp = require('gulp'),
    sass = require('gulp-sass')(require('sass')),
    sassGlob = require('gulp-sass-glob'),
    autoprefixer = require('gulp-autoprefixer'),
    remToPx = require('gulp-rem-to-px'),
    csscombx = require('gulp-csscombx'),
    sourcemaps = require('gulp-sourcemaps');

// scss
gulp.task('scss', function () {

  return gulp.src('./sass/components/**/*.scss')
    .pipe(sourcemaps.init())
      .pipe(sassGlob())
      .pipe(csscombx())
      .pipe(sourcemaps.write('.'))
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
    .pipe(sourcemaps.init())
      .pipe(sourcemaps.identityMap())
      .pipe(sassGlob())
      .pipe(sass())
      .pipe(autoprefixer())
      .pipe(csscombx())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./css'))

});

gulp.task('default', gulp.series('sass', 'ckeditor', function () {
  gulp.watch( './sass/**/*.scss', gulp.series('sass', 'ckeditor'));
}));
