let gulp          = require('gulp'),
    minCss        = require('gulp-clean-css'),
    sass          = require('gulp-sass'),
    browserSync   = require('browser-sync').create(),
    del           = require('del'),
    imagemin      = require('gulp-imagemin'),
    pngquant      = require('imagemin-pngquant'),
    cache         = require('gulp-cache');

gulp.task('sass', function() {
  return gulp.src("app/sass/*.sass")
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest("app/css"))
    .pipe(browserSync.stream());
});

gulp.task('move', ['sass', 'img'], function () {
  gulp.src('app/*.html')
    .pipe(gulp.dest('dist'));
  gulp.src('app/css/*.css')
    .pipe(minCss())
    .pipe(gulp.dest('dist/css'));
  gulp.src('app/js/*.js')
    .pipe(gulp.dest('dist/js'));
  gulp.src('app/fonts/**.*')
    .pipe(gulp.dest('dist/fonts'))
});

gulp.task('serve', ['move'], function() {
  browserSync.init({
    server: "app/"
  });

  gulp.watch("app/sass/*.sass", ['sass']);
  gulp.watch("app/*.html").on('change', browserSync.reload);
});

gulp.task('clean', function () {
  return del.sync('dist');
});

gulp.task('clear', function () {
  return cache.clearAll();
});

gulp.task('img', function() {
  return gulp.src('app/img/**/*')
    .pipe(cache(imagemin({
      interlaced: true,
      progressive: true,
      svgoPlugins: [{removeViewBox: false}],
      use: [pngquant()]
    })))
    .pipe(gulp.dest('dist/img'));
});

gulp.task('default', ['serve', 'clean']);