var gulp = require("gulp");
var watch = require("gulp-watch");

gulp.task("default", function () {
  console.log("Sample Gulp Task");
});

gulp.task("html", function () {
  console.log("Sample HTML Task");
});

gulp.task("styles", function () {
  console.log("Sample CSS Task");
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