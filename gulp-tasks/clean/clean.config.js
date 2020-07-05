'use strict'

class CleanConfig {
    constructor() {
        this.dirs = require('../global-config.class').dirs;
        this.dist = [this.dist + '/**/*', '!' + this.dist];
        this.dev = [this.dev  + '/**/*', '!' + this.dev];
    }
}

module.exports = CleanConfig;
