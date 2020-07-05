'use strict'

class CleanConfig {
    constructor() {
        this.dirs = require('../variables').dirs;
        this.dist = [this.dist + '/**/*', '!' + this.dist];
        this.dev = [this.dev  + '/**/*', '!' + this.dev];
    }
}

module.exports = CleanConfig;
