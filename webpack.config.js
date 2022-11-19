const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/index.js",
  resolve: {
    modules: ["src", "node_modules"],
    extensions: [".ts", ".tsx", ".js", ".jsx"],
  },
  entry: "./src/scripts/index.js",
  module: {
    rules: [
      // --*-- BABEL --*--
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },
      // --*-- STYLES --*--
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      // --*-- HTML --*--
      {
        test: /\.html$/,
        use: ["html-loader"],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "public/index.html",
    }),
  ],
};
