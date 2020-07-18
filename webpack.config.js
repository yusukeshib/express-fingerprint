const path = require("path");
const nodeExternals = require("webpack-node-externals");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");

module.exports = {
  target: "node",
  entry: {
    index: "./src/index.ts",
  },
  output: {
    filename: "[name].js",
    libraryTarget: "commonjs2",
    path: path.resolve(__dirname, "lib"),
  },
  module: {
    rules: [
      {
        test: /\.ts?$/,
        loader: require.resolve("ts-loader"),
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
  plugins: [new ForkTsCheckerWebpackPlugin()],
  externals: [nodeExternals()],
};
