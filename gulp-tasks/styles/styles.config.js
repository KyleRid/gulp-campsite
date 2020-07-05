'use strict'

class StylesConfig {
    constructor() {
        this.dirs = require('../global-config.class').dirs;
        this.PROD = require('../global-config.class').PROD;
        this.src = this.dirs.src + '/scss/**/*.scss';
        this.paths = {
            src     : this.dirs.src + '/scss',
            dist    : this.dirs.dist + '/styles',
            dev     : this.dirs.dev  + '/styles',
        }
    }

    get dest() {
        return this.PROD ?
            this.paths.dist :
            this.paths.dev;
    }

    // get src() {
    //     return this.src;
    // }

    // get PROD() {
    //     return this.PROD;
    // }

    // set PROD(value) {
    //     this.PROD = value;
    // }
}

module.exports = StylesConfig;
