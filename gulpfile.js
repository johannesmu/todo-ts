//gulp configuration
var gulp = require('gulp');
var pug = require('gulp-pug');
var scss = require('gulp-sass');
var prettify = require('gulp-prettify');
var typescript = require('gulp-typescript');
var cleancss = require('gulp-clean-css');
var browsersync = require('browser-sync');
var watch = require('gulp-watch');
var run = require('run-sequence');

var dir = './build';

gulp.task('html', () => {
  return gulp.src('./templates/*.pug')
  .pipe( pug() )
  .pipe( prettify() )
  .pipe( browsersync.reload({ stream:true}) )
  .pipe( gulp.dest(dir) );
});

gulp.task('scss', () => {
  return gulp.src('./scss/*.scss')
  .pipe( scss() )
  .pipe( cleancss() )
  .pipe( browsersync.reload({ stream:true}) )
  .pipe( gulp.dest(dir+'/css') );
} );

gulp.task('js', () => {
  return gulp.src('./ts/*.ts')
  .pipe( typescript(
    {
      noImplicityAny: true, 
      outFile: 'main.js'
    }
  ))
  .pipe( gulp.dest(dir+'/js') );
} );

gulp.task('browsersync', () => {
  browsersync.init({ server:{baseDir: dir} });
} );

gulp.task('watch', () => {
  run('html','scss','js','browsersync',() => {});
  gulp.watch('./templates/*.pug', ['html']);
  gulp.watch('./scss/*.scss',['scss']);
  gulp.watch('./ts/*.ts',['js']);
});