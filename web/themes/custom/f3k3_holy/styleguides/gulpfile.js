let gulp = require('gulp'),
  newfile = require('gulp-file'),
  fs = require('fs'),
  tap = require('gulp-tap'),
  replace = require('gulp-replace'),
  path = require('path'),
  header = require('gulp-header'),
  sass = require('gulp-sass')(require('sass')),
  sassGlob = require('gulp-sass-glob'),
  autoprefixer = require('gulp-autoprefixer'),
  rename = require("gulp-rename"),
  inject = require('gulp-inject'),
  eol = require('gulp-eol'),
  csscombx = require('gulp-csscombx');

// sg
gulp.task('sg', function () {

  return gulp.src('./sass/**/*.scss')

    .pipe(sassGlob())
    .pipe(sass())
    .pipe(autoprefixer())
    .pipe(csscombx())
    .pipe(gulp.dest('./css'))

});

// scss
gulp.task('scss', function () {

  return gulp.src('./sass/**/*.scss')
    .pipe(sassGlob())
    .pipe(csscombx())
    .pipe(gulp.dest('./sass'));

});

// css
gulp.task('css', function () {

  var variables = fs.readFileSync("./../sass/_variables.scss");

  return gulp.src('./../sass/**/*.scss')

    .pipe(sassGlob())

    .pipe(rename(function (opt) {
      opt.basename = opt.basename.replace(/_/, '');
      return opt;
    }))

    .pipe(header(variables))
    .pipe(sass())
    .pipe(autoprefixer())
    .pipe(eol('\n'))
    .pipe(gulp.dest('./code'))

});

// code
gulp.task('code', function () {

  return gulp.src('./../sass/**/*.scss')

    .pipe(tap(function (file) {

      var filename = file.basename.replace(/_/, '').replace(/.scss/, '');
      var csspath = file.basename.replace(/_/, '').replace(/.scss/, '.css');
      var phtmlpath = file.path.replace(/_/, '').replace(/sass/, 'styleguides/code').replace(/scss/, 'phtml').replace(/_/, '');
      var scsspath = path.relative(path.join(file.cwd), file.path);
      var scsspath2 = scsspath.replace(/\\/g, '/');
      var templatepath = file.path.replace(/_/, '').replace(/sass/, 'styleguides/template/code').replace(/scss/, 'phtml').replace(/_/, '').replace(/\\/g, '/');

      if (fs.existsSync(templatepath)) {
        var phtmltemplate = fs.readFileSync(templatepath);
      } else {
        var phtmltemplate = fs.readFileSync("./template/code/component.phtml");
      }

      if (fs.existsSync(phtmlpath)) {
        console.log('phtml file exist.');
      } else {
        return newfile(phtmlpath, phtmltemplate)
          .pipe(replace('$$name$$', filename))
          .pipe(replace('$$css$$', csspath))
          .pipe(replace('$$scss$$', scsspath2))
          .pipe(eol('\n'))
          .pipe(gulp.dest('.'))
      }

    }));

});

// images
gulp.task('images', function () {

  return gulp.src('./../images/*.*')

    .pipe(gulp.dest('./images'))

});

// index
gulp.task('index', function () {

  // index
  gulp.src('./template/pages/index.phtml')

    .pipe(gulp.dest('.'));

  // base
  gulp.src('./template/pages/base.phtml')

      .pipe(inject(gulp.src(['./../sass/*.scss', '!./../sass/ckeditor.scss', '!./../sass/style.scss']), {
        starttag: '<!-- inject:list -->',
        relative: 1,
        transform: function (filePath, file) {
          name = file.basename.replace(/_/, '').replace(/.scss/, '');
          li = '<li><a href="#sg-' + name + '" class="skip">' + name + '</a></li>';
          return li
        }
      }))

      .pipe(inject(gulp.src(['./../sass/*.scss', '!./../sass/ckeditor.scss', '!./../sass/style.scss']), {
        starttag: '<!-- inject:content -->',
        relative: 1,
        transform: function (filePath, file) {
          phtml = 'code/' + path.relative(path.join('../sass'), file.path).replace(/scss/, 'phtml').replace(/_/, '');
          phtml2 = phtml.replace(/\\/g, '/');
          include = '<?php include "' + phtml2 + '"; ?>';
          return include
        }
      }))

      .pipe(eol('\n'))
      .pipe(gulp.dest('.'));

  // atoms
  gulp.src('./template/pages/atoms.phtml')

      .pipe(inject(gulp.src(['./../sass/components/01-atoms/**/*.scss']), {
          starttag: '<!-- inject:list -->',
          relative: 1,
          transform: function (filePath, file) {
            name = file.basename.replace(/_/, '').replace(/.scss/, '');
            li = '<li><a href="#sg-' + name + '" class="skip">' + name + '</a></li>';
          return li
          }
      }))

      .pipe(inject(gulp.src(['./../sass/components/01-atoms/**/*.scss']), {
          starttag: '<!-- inject:content -->',
          relative: 1,
          transform: function (filePath, file) {
            phtml = 'code/' + path.relative(path.join('../sass'), file.path).replace(/scss/, 'phtml').replace(/_/, '');
            phtml2 = phtml.replace(/\\/g, '/');
            include = '<?php include "' + phtml2 + '"; ?>';
            return include
          }
      }))

      .pipe(eol('\n'))
      .pipe(gulp.dest('.'));

  // molecules
  gulp.src('./template/pages/molecules.phtml')

      .pipe(inject(gulp.src(['./../sass/components/02-molecules/**/*.scss']), {
          starttag: '<!-- inject:list -->',
          relative: 1,
          transform: function (filePath, file) {
            name = file.basename.replace(/_/, '').replace(/.scss/, '');
            li = '<li><a href="#sg-' + name + '" class="skip">' + name + '</a></li>';
          return li
          }
      }))

      .pipe(inject(gulp.src(['./../sass/components/02-molecules/**/*.scss']), {
          starttag: '<!-- inject:content -->',
          relative: 1,
          transform: function (filePath, file) {
            phtml = 'code/' + path.relative(path.join('../sass'), file.path).replace(/scss/, 'phtml').replace(/_/, '');
            phtml2 = phtml.replace(/\\/g, '/');
            include = '<?php include "' + phtml2 + '"; ?>';
            return include
          }
      }))

      .pipe(eol('\n'))
      .pipe(gulp.dest('.'));

  // organisms
  gulp.src('./template/pages/organisms.phtml')

    .pipe(inject(gulp.src(['./../sass/components/03-organisms/**/*.scss']), {
      starttag: '<!-- inject:list -->',
      relative: 1,
      transform: function (filePath, file) {
        name = file.basename.replace(/_/, '').replace(/.scss/, '');
        li = '<li><a href="#sg-' + name + '" class="skip">' + name + '</a></li>';
      return li
      }
    }))

    .pipe(inject(gulp.src(['./../sass/components/03-organisms/**/*.scss']), {
        starttag: '<!-- inject:content -->',
        relative: 1,
        transform: function (filePath, file) {
          phtml = 'code/' + path.relative(path.join('../sass'), file.path).replace(/scss/, 'phtml').replace(/_/, '');
          phtml2 = phtml.replace(/\\/g, '/');
          include = '<?php include "' + phtml2 + '"; ?>';
          return include
        }
    }))

    .pipe(eol('\n'))
    .pipe(gulp.dest('.'));

  // layouts
  gulp.src('./template/pages/layouts.phtml')

      .pipe(inject(gulp.src(['./../sass/components/04-layouts/**/*.scss']), {
          starttag: '<!-- inject:list -->',
          relative: 1,
          transform: function (filePath, file) {
            name = file.basename.replace(/_/, '').replace(/.scss/, '');
            li = '<li><a href="#sg-' + name + '" class="skip">' + name + '</a></li>';
          return li
          }
      }))

      .pipe(inject(gulp.src(['./../sass/components/04-layouts/**/*.scss']), {
          starttag: '<!-- inject:content -->',
          relative: 1,
          transform: function (filePath, file) {
            phtml = 'code/' + path.relative(path.join('../sass'), file.path).replace(/scss/, 'phtml').replace(/_/, '');
            phtml2 = phtml.replace(/\\/g, '/');
            include = '<?php include "' + phtml2 + '"; ?>';
            return include
          }
      }))

      .pipe(eol('\n'))
      .pipe(gulp.dest('.'));

  // pages
  gulp.src('./template/pages/pages.phtml')

      .pipe(inject(gulp.src(['./../sass/components/05-pages/**/*.scss']), {
          starttag: '<!-- inject:list -->',
          relative: 1,
          transform: function (filePath, file) {
            name = file.basename.replace(/_/, '').replace(/.scss/, '');
            li = '<li><a href="#sg-' + name + '" class="skip">' + name + '</a></li>';
          return li
          }
      }))
      .pipe(inject(gulp.src(['./../sass/components/05-pages/**/*.scss']), {
          starttag: '<!-- inject:content -->',
          relative: 1,
          transform: function (filePath, file) {
            phtml = 'code/' + path.relative(path.join('../sass'), file.path).replace(/scss/, 'phtml').replace(/_/, '');
            phtml2 = phtml.replace(/\\/g, '/');
            include = '<?php include "' + phtml2 + '"; ?>';
            return include
          }
      }))

      .pipe(eol('\n'))
      .pipe(gulp.dest('.'));

});

// default
gulp.task('default', gulp.series('sg', 'css', 'images', 'code', 'index'));
