const path = require("path");
const CleanWebpackPlugin = require("clean-webpack-plugin").CleanWebpackPlugin;
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");

module.exports = {
  entry: [
    path.resolve(__dirname, "src/set-public-path.ts"),
    path.resolve(__dirname, "src/index.ts")
  ],
  output: {
    filename: "openmrs-esm-test-results-viewer-app.js",
    libraryTarget: "system",
    path: path.resolve(__dirname, "dist"),
    jsonpFunction: "webpackJsonp_openmrs_esm_test_results_viewer"
  },
  module: {
    rules: [
      {
        parser: {
          system: false
        }
      },
      {
        test: /\.m?(js|ts|tsx)$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.css$/,
        use: [
          { loader: "style-loader" },
          {
            loader: "css-loader",
            options: {
              modules: {
                localIdentName:
                  "esm-test-results-viewer__[name]__[local]___[hash:base64:5]"
              }
            }
          }
        ]
      }
    ]
  },
  devtool: "sourcemap",
  devServer: {
    headers: {
      "Access-Control-Allow-Origin": "*"
    },
    disableHostCheck: true
  },
  externals: [
    /^@openmrs\/esm.*/,
    "i18next",
    "single-spa",
    "react",
    "react-dom",
    "react-i18next",
    "react-router-dom"
  ],
  plugins: [new ForkTsCheckerWebpackPlugin(), new CleanWebpackPlugin()],
  resolve: {
    extensions: [".tsx", ".ts", ".jsx", ".js"]
  }
};
