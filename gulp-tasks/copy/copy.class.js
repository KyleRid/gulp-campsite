'use strict'
class Copy {
    constructor(cfg) {
        this.gulp = require('gulp');
        this.through2 = require('through2');
        this.config = cfg;
        this.copy = this.copy.bind(this);
        this.verify = this.verify.bind(this);
    }

    copy() {
        return this.gulp
            .src(this.config.src, {
                base: this.config.base
            })
            .pipe(
                this.gulp.dest(this.config.dest)
            )
            .pipe(this.verify());
    }

    verify() {
        let fileCounter = 0;
        return this.through2(this.config.verifyOptions, write, end);

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
}

module.exports = Copy;
