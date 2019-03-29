const path = require("path");

let config = {
  mode: "development",
  entry: "./src/entry.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "./dist")
  }
};

module.exports = config;
