var gulp = require("gulp");
var watch = require("gulp-watch");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var cssVars = require("postcss-simple-vars");
var nested = require("postcss-nested");
var cssImport = require("postcss-import");

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
  // automatically trigger task when index.html changes
  watch("./app/index.html", function () {
    gulp.start("html");
  });

  // trigger task when any CSS file is changed
  watch("./app/assets/styles/**/*.css", function () {
    gulp.start("styles")
  })
});