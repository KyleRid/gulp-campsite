'use strict';

const { patterns, paths, PROD } = require('./variables');

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

function styles() {
    return gulp
        .src(patterns.styles.src)
        .pipe(plumber())
        .pipe(gulpIf(!PROD, sourcemaps.init({
            largeFile: true,
        })))
        .pipe(sass({
            outputStyle: 'expanded',
        }))
        .on('error', error => 'Error: ' + error.message)
        .pipe(postcss(postCSSPlugins))
        .pipe(gulpIf(!PROD, sourcemaps.write()))
        .pipe(gulp.dest(
            PROD ?
                paths.styles.dist :
                paths.styles.dev
            )
        )
        .pipe(server.stream());
}

function linter() {
    return gulp
        .src([patterns.styles.src])
        .pipe(gulpStyleLint({
            configFile: './.stylelintrc',
            reporters: [{formatter: 'string', console: true}],
            syntax: 'scss'
        }));
};

module.exports = {
    run: styles,
    lint: linter,
}
