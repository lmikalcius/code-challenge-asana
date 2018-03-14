var path = require("path");

module.exports = {
  // file to look at to begin creating bundle
  entry: "./app/assets/scripts/App.js",
  output: {
    // webpack needs absolute path
    path: path.resolve(__dirname, "./app/temp/scripts"),
    // name of new bundled file
    filename: "App.js"
  },
  module: {
    loaders: [
      {
        loader: "babel-loader",
        query: {
          presets: ["es2015"]
        },
        // only apply to JS files
        test: /\.js$/,
        // don't compile node modules
        exclude: /node_modules/
      }
    ]
  }
}