'use strict';

class Styles {
    constructor(cfg) {
        this.cfg = cfg;

        /**
         * Packages
         */
        this.gulp = require('gulp');
        this.sass = require('gulp-sass');
        this.plumber = require('gulp-plumber');
        this.gulpIf = require('gulp-if');
        this.postcss = require('gulp-postcss');
        this.server = require('../browsersync/browsersync');
        this.sourcemaps = require('gulp-sourcemaps');
        this.autoprefixer = require('autoprefixer');
        this.gulpStyleLint = require('gulp-stylelint') ;
        this.cssnano = require('cssnano');
        this.postCSSPlugins = [
                this.autoprefixer(['last 2 versions', '> 5%', 'ie 11'], {cascade: true}),
                this.cfg.PROD ? this.cssnano() : false,
        ].filter(Boolean);

        this.styles = this.styles.bind(this);
        this.linter = this.linter.bind(this);
    }

    styles() {
        return this.gulp
            .src(this.cfg.src)
            .pipe(this.plumber())
            .pipe(this.gulpIf(
                !this.cfg.PROD,
                this.sourcemaps.init({
                    largeFile: true,
                }
            )))
            .pipe(this.sass({
                outputStyle: 'expanded',
            }))
            .on('error', error => 'Error: ' + error.message)
            .pipe(this.postcss(this.postCSSPlugins))
            .pipe(this.gulpIf(!this.cfg.PROD, this.sourcemaps.write()))
            .pipe(this.gulp.dest(this.cfg.dest)
            )
            .pipe(this.server.stream());
    }

    linter() {
        return this.gulp
            .src([this.cfg.src])
            .pipe(this.gulpStyleLint({
                configFile: './.stylelintrc',
                reporters: [{formatter: 'string', console: true}],
                syntax: 'scss'
            }));
    }
}

module.exports = Styles;
