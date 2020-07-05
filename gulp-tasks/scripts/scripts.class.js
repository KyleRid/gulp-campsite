'use strict'
class Scripts {
    constructor() {
        this.gulp = require('gulp');
        this.webpack = require('webpack');
        this.webpackConfig = require('../../webpack.config');
        this.run = this.run.bind(this);
    }

    run () {
        return new Promise((resolve, reject) => {
            this.webpack(this.webpackConfig, (err, stats) => {
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
}

module.exports = Scripts;
