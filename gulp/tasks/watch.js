var gulp = require("gulp");
var watch = require("gulp-watch");
var browserSync = require("browser-sync").create(); // require in only the create method

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

  watch("./app/assets/scripts/**/*.js", function () {
    gulp.start("scripts-refresh");
  });
});

gulp.task("cssInject", ['styles'], function () {
  // Inject latest CSS without refreshing page, dependency on styles task

  return gulp.src("./app/temp/styles/styles.css")
  .pipe(browserSync.stream());
});

gulp.task("scripts-refresh", ["scripts"], function () {
  browserSync.reload();
});