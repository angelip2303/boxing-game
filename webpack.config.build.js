const path = require("path");
const { merge } = require("webpack-merge");
const webpackConfig = require("./webpack.config");
const CleanWebpackPlugin = require("clean-webpack-plugin");

module.exports = merge(webpackConfig, {
  mode: "production",
  devtool: "source-map",
  output: {
    path: path.join(__dirname, "dist"),
    filename: "[name].[chunkhash].js",
  },
  plugins: [new CleanWebpackPlugin(["dist"])],
});
