var gulp = require("gulp");
var webpack = require("webpack");

// automatically refresh JS
gulp.task("scripts", function (callback) {
  webpack(require("../../webpack.config.js"), function (error, stats) {
    if (error) {
      console.log(error.toString());
    }
    console.log(stats.toString());
    // callback let's gulp know webpack is done
    callback();
  });
});