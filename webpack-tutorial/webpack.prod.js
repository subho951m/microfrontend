const path = require("path");
const common = require("./webpack.common");
const { merge } = require("webpack-merge");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtarctPlugin = require("mini-css-extract-plugin");
const CssMinimizerWebpackPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
var HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = merge(common, {
  mode: "production",
  output: {
    filename: "[name].[contenthash].bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  optimization: {
    minimizer: [new CssMinimizerWebpackPlugin(), new TerserPlugin()],
  },
  plugins: [
    new MiniCssExtarctPlugin({
      filename: "[name].[contenthash].css",
    }),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: "./src/template.html",
      minify: {
        removeAttributeQuotes: true,
        collapseWhitespace: true,
        removeComments: true,
      },
    }),
  ],
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          MiniCssExtarctPlugin.loader, //3. Extract CSS into files
          "css-loader", //2. Turns css into commonjs
          "sass-loader", //1. Turns sass into css
        ],
      },
    ],
  },
});
