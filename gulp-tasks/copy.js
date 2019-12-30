'use strict';

const { patterns, PROD, dirs } = require('./variables');

const gulp = require('gulp');
const through2 = require('through2');

function copy() {
    return gulp
        .src([
                patterns.images.src,
                patterns.videos.src,
                patterns.favicons.src,
                patterns.fonts.src,
                patterns.locales.src,
                patterns.robots.src,
                patterns.sitemap.src,
            ], {
            base: './src'
        })
        .pipe(gulp.dest((PROD ? dirs.dist : dirs.dev)))
        .pipe(verify());
}

function verify() {
    const options = { objectMode: true };
    let fileCounter = 0;
    return through2(options, write, end);

    function write(file, enc, cb) {
        fileCounter++;
        console.log(`file: ${file.path}`);
        cb(null, file);
    }

    function end(cb) {
        fileCounter ?
            console.log(`${fileCounter} files has been copied`) :
            console.log('No files has been copied. No new files.');
        cb();
    }
}

module.exports = {
    run: copy,
}
