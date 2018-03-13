var gulp = require("gulp");
var watch = require("gulp-watch");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var cssVars = require("postcss-simple-vars");
var nested = require("postcss-nested");
var cssImport = require("postcss-import");
var browserSync = require("browser-sync").create(); // require in only the create method

gulp.task("default", function () {
  console.log("Sample Gulp Task");
});

gulp.task("html", function () {
  console.log("Sample HTML Task");
});

gulp.task("styles", function () {
  // pipe from app and create temp folder for output CSS
  return gulp.src("./app/assets/styles/styles.css")

  // add for CSS webkits, vars, nested CSS, importing files so CSS doesn't have to make different calls
  .pipe(postcss([cssImport, cssVars, nested, autoprefixer]))
  .pipe(gulp.dest("./app/temp/styles"));
});

gulp.task("watch", function () {
  // spin up web server
  browserSync.init({
    server: {
      baseDir: "app"
    }
  });

  // automatically trigger browser reload when index.html changes
  watch("./app/index.html", function () {
    browserSync.reload();
  });

  // trigger task when any CSS file is changed
  watch("./app/assets/styles/**/*.css", function () {
    gulp.start("cssInject");
  });
});

gulp.task("cssInject", ['styles'], function () {
  // Inject latest CSS without refreshing page, dependency on styles task

  return gulp.src("./app/temp/styles/styles.css")
  .pipe(browserSync.stream());
});