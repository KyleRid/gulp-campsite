'use strict'
class CopyConfig {
    constructor(dirs, PROD) {
        this.dirs = require('../global-config.class').dirs;
        this.PROD = require('../global-config.class').PROD;
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

module.exports = CopyConfig;
