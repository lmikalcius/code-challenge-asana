var gulp = require("gulp");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var autoprefixer = require("autoprefixer");
var cssVars = require("postcss-simple-vars");
var nested = require("postcss-nested");
var cssImport = require("postcss-import");
var mixins = require("postcss-mixins");


gulp.task("styles", function () {
  return gulp.src("./app/assets/styles/styles.css")

  // add for CSS webkits, vars, nested CSS, importing files so CSS doesn't have to make different calls
  .pipe(postcss([cssImport, mixins, cssVars, nested, autoprefixer]))

  // add error handling so watch doesn't stop
  .on("error", function (errorInfo) {
    console.log(errorInfo.toString());
    this.emit("end");
  })
  .pipe(gulp.dest("./app/temp/styles"));
});