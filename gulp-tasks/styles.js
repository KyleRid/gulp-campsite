'use strict';
const { PROD, dirs } = require('./variables');
const Config = require('./_utils/Config.class');
// packages
const gulp = require('gulp');
const sass = require('gulp-sass');
const plumber = require('gulp-plumber');
const gulpIf = require('gulp-if');
const postcss = require('gulp-postcss');
const server = require('./browsersync');
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('autoprefixer');
const gulpStyleLint = require('gulp-stylelint') ;
const cssnano = require('cssnano');
const postCSSPlugins = [
        autoprefixer(['last 2 versions', '> 5%', 'ie 11'], {cascade: true}),
        PROD ? cssnano() : false,
].filter(Boolean);

const _cfg = new Config(dirs, PROD);

class Styles {
    constructor(cfg) {
        this.cfg = cfg;
        this.styles = this.styles.bind(this);
        this.linter = this.linter.bind(this);
    }

    styles() {
        return gulp
            .src(this.cfg.src)
            .pipe(plumber())
            .pipe(gulpIf(
                !this.cfg.PROD, 
                sourcemaps.init({
                    largeFile: true,
                }
            )))
            .pipe(sass({
                outputStyle: 'expanded',
            }))
            .on('error', error => 'Error: ' + error.message)
            .pipe(postcss(postCSSPlugins))
            .pipe(gulpIf(!this.cfg.PROD, sourcemaps.write()))
            .pipe(gulp.dest(this.cfg.dest)
            )
            // .pipe(server.stream());
    }

    linter() {
        return gulp
            .src([this.cfg.src])
            .pipe(gulpStyleLint({
                configFile: './.stylelintrc',
                reporters: [{formatter: 'string', console: true}],
                syntax: 'scss'
            }));
    }
}
const styles = new Styles(_cfg);

module.exports = {
    run: styles.styles,
    linter: styles.linter,
}
