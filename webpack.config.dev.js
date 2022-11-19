const path = require("path");
const { merge } = require("webpack-merge");
const webpackConfig = require("./webpack.config");

module.exports = merge(webpackConfig, {
  mode: "development",
  devtool: "inline-source-map",
  devServer: {
    static: path.join(__dirname, "build"),
    historyApiFallback: true,
    port: 4000,
    open: true,
    hot: true,
  },
});
