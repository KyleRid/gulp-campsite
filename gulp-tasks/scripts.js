'use strict';

const { patterns, paths, PROD } = require('./variables');
const gulp = require('gulp');
const webpack = require('webpack');
const webpackConfig = require('../webpack.config');
// TODO: add support of ts/js
function scripts() {
    return new Promise((resolve, reject) => {
        webpack(webpackConfig, (err, stats) => {
          // reject if errors
          if (err) {
            return reject(err);
          }

          // tranform info to JSON
          const info = stats.toJson();

          // reject if compilation errors
          if (stats.hasErrors()) {
            return reject(info.errors);
          }

          // reject if compilation warnings
          if (stats.hasWarnings()) {
            return reject(info.warnings);
          }

          // log as the CLI would
          console.log(
            stats.toString({
              chunks: false, // Makes the build much quieter
              colors: true // Shows colors in the console
            })
          );

          // resolve
          resolve();
        });
    });
}

module.exports = {
    run: scripts,
}
