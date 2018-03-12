var gulp = require("gulp");
var watch = require("gulp-watch");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var cssVars = require("postcss-simple-vars");
var nested = require("postcss-nested");

gulp.task("default", function () {
  console.log("Sample Gulp Task");
});

gulp.task("html", function () {
  console.log("Sample HTML Task");
});

gulp.task("styles", function () {
  // pipe from app and create temp folder for output CSS
  return gulp.src("./app/assets/styles/styles.css")
  // add for CSS webkits, vars, nested CSS
  .pipe(postcss([cssVars, nested, autoprefixer]))
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