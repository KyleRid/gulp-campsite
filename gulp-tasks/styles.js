'use strict';
const { PROD, dirs } = require('./variables');

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

class Config {
    constructor(dirs, PROD = false) {
        this._src = dirs.src + '/scss/**/*.scss';
        this._paths = {
            src     : dirs.src + '/scss',
            dist    : dirs.dist + '/styles',
            dev     : dirs.dev  + '/styles',
        }
        this._PROD = PROD;
    }

    get dest() {
        return this._PROD ? 
            this._paths.dist : 
            this._paths.dev;  
    }

    get src() {
        return this._src;
    }

    get PROD() {
        return this._PROD;
    }
}
const _cfg = new Config(dirs, PROD);
function styles(cfg) {
    return gulp
        .src(cfg.src)
        .pipe(plumber())
        .pipe(gulpIf(
            !cfg.PROD, 
            sourcemaps.init({
                largeFile: true,
            }
        )))
        .pipe(sass({
            outputStyle: 'expanded',
        }))
        .on('error', error => 'Error: ' + error.message)
        .pipe(postcss(postCSSPlugins))
        .pipe(gulpIf(!cfg.PROD, sourcemaps.write()))
        .pipe(gulp.dest(cfg.dest)
        )
        // .pipe(server.stream());
}

function linter(cfg) {
    return gulp
        .src([cfg.src])
        .pipe(gulpStyleLint({
            configFile: './.stylelintrc',
            reporters: [{formatter: 'string', console: true}],
            syntax: 'scss'
        }));
};
linter(_cfg)
module.exports = {
    run: styles,
    lint: linter,
}
