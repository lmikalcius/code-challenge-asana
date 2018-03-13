var gulp = require("gulp");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var autoprefixer = require("autoprefixer");
var cssVars = require("postcss-simple-vars");
var nested = require("postcss-nested");
var cssImport = require("postcss-import");


gulp.task("styles", function () {
  return gulp.src("./app/assets/styles/styles.css")

  // add for CSS webkits, vars, nested CSS, importing files so CSS doesn't have to make different calls
  .pipe(postcss([cssImport, cssVars, nested, autoprefixer]))
  .pipe(gulp.dest("./app/temp/styles"));
});