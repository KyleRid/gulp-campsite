const path = require("path");
const { PROD } = require('./gulp-tasks/variables');

module.exports = {
  mode: PROD ? "production" : "development",
  entry: "./src/ts/app.ts",
  watch: PROD ? false : true,
  devtool: 'inline-sourcemap',
  output: {
    path: path.resolve(__dirname, PROD ? "./dist/js" : "./dev/js"),
    filename: "main.bundle.js"
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json']
  },
  module: {
    rules: [
      {
        include: [path.resolve(__dirname, "./src/ts/")],
        test: /\.tsx?$/,
        loader: "ts-loader",
        exclude: /node_modules/,
        options: {
            transpileOnly: true
        }
      },
      {
        enforce: "pre",
        include: [path.resolve(__dirname, "./src/ts/")],
        test: /\.(ts|tsx)$/,
        loader: "eslint-loader",
        exclude: /node_modules/,
      },
    ]
  }
};
