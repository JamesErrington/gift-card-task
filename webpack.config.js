/* eslint-disable @typescript-eslint/no-var-requires */
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

/** @type {import('webpack').Configuration} */
module.exports = {
  entry: path.resolve(__dirname, "client/src/index.tsx"),
  output: {
    path: path.resolve(__dirname, "build/client"),
    filename: "bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.js(x)?$/,
        use: "babel-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.ts(x)?$/,
        loader: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin(),
    new HtmlWebpackPlugin({ template: path.resolve(__dirname, "client/public/index.html") }),
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "client/public/manifest.json"),
          to: path.resolve(__dirname, "build/client"),
          noErrorOnMissing: true,
        },
      ],
    }),
  ],
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
};
