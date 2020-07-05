'use strict';

class Config {
    constructor(dirs, PROD) {
        this.dirs = require('./variables').dirs;
        this.PROD = require('./variables').PROD;
        this.src = [
            this.dirs.src + '/img/**/*.{jpg,jpeg,png,svg,gif}',
            this.dirs.src + '/videos/**/*.{mp4,mov}',
            this.dirs.src + '/favicons/**/*.{jpeg,jpg,png,svg,gif,ico}',
            this.dirs.src + '/fonts/**/*.{ttf,woff,eof,svg}',
            this.dirs.src + '/locales/**/*.{pot}',
            this.dirs.src + '/robots.txt',
            this.dirs.src + '/sitemap.xml',
            this.dirs.src + '/views/**/*.html'
        ];
        this.base = './src';
        this.verifyOptions = {
            objectMode: true,
        }
    }

    get dest() {
       return this.PROD ? this.dirs.dist : this.dirs.dev;
    }
}
class Copier {
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

const config = new Config();
const copier = new Copier(config);

module.exports = {
    run: copier.copy,
}
