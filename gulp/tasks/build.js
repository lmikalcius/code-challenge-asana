var gulp = require("gulp");
var del = require("del");
var imagemin = require('gulp-imagemin');
var usemin = require('gulp-usemin');
var rev = require('gulp-rev');
var cssnano = require('gulp-cssnano');
var uglify = require('gulp-uglify');
var browserSync = require("browser-sync").create();

gulp.task("previewDocs", function () {
    browserSync.init({
    server: {
      baseDir: "docs"
    }
  });
});

// delete docs folder and rebuild every time
gulp.task('deleteDocsFolder', function() {
  return del("./docs");
});

gulp.task('optimizeImages', ['deleteDocsFolder'], function() {
  return gulp.src(['./app/assets/images/**/*'])
    .pipe(gulp.dest("./docs/assets/images"));
});

// minify files
gulp.task('usemin', ['deleteDocsFolder'], function() {
  return gulp.src("./app/index.html")
    .pipe(usemin({
      css: [function() {return rev()}, function() {return cssnano()}],
      js: [function() {return rev()}, function () {return uglify()}]
    }))
    .pipe(gulp.dest("./docs"));
});

gulp.task('build', ['deleteDocsFolder', 'optimizeImages', 'usemin']);