var gulp = require('gulp');
var sass = require('gulp-sass');
var jshint = require('gulp-jshint');
var uglify = require('gulp-uglify');
var minifyHTML = require('gulp-minify-html');
var minifyInline = require('gulp-minify-inline');

// Lint JavaScript
gulp.task('lint', function() {
    return gulp.src('dev/js/*.js')
               .pipe(jshint())
               .pipe(jshint.reporter('default'));
});

// Minify HTML and inline scripts and CSS
gulp.task('minifyhtml', function() {
  return gulp.src('dev/**/*.html')
             .pipe(minifyHTML())
             .pipe(minifyInline())
             .pipe(gulp.dest('dist'));
});

// Compile Sass
gulp.task('sass', function () {
  return gulp.src('dev/css/*.scss')
             .pipe(sass({outputStyle: 'compressed'}))
             .pipe(gulp.dest('dist/css'));
});

// Minify JavaScript
gulp.task('minifyjs', function() {
  return gulp.src('dev/js/*.js')
             .pipe(uglify())
             .pipe(gulp.dest('dist'));
});

// Move images with PNG or JPG extension
gulp.task('moveimages', function() {
  return gulp.src('dev/img/**/*.+(png|jpg)')
             .pipe(gulp.dest('dist/img/'));
});

// Move lib css files; don't need to do this every time
gulp.task('movelibcss', function() {
  return gulp.src('dev/css/lib/*.css')
             .pipe(gulp.dest('dist/css/lib/'));
});

// Move lib js files; don't need to do this every time
gulp.task('movelibjs', function() {
  return gulp.src('dev/js/lib/*.js')
  .pipe(gulp.dest('dist/js/lib/'));
});

// Move all lib files
gulp.task('movelib', ['movelibcss', 'movelibjs']);

// Do everything by default
gulp.task('default', ['lint', 'sass', 'minifyhtml', 'minifyjs', 'moveimages']);

// Watch HTML, Sass, JavaScript files and update on change
gulp.task('watch', function() {
  // Watch Sass files and update
  gulp.watch('dev/css/*.scss', ['sass']);
  
  // Watch HTML files and minify output
  gulp.watch('dev/*.html', ['minifyhtml']);
  
  // Watch js files and lint and minify output
  gulp.watch('dev/js/*.js', ['lint', 'minifyjs']);
});
