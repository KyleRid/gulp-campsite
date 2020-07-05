'use strict'
class ServerConfig {
    constructor() {
        this.PROD = require('../variables').PROD;
        this.dirs = require('../variables').dirs;
        this.baseDir = this.PROD ? this.dirs.dist : this.dirs.dev;
        this.port = this.PROD ? 3000 : 3001;
        // this.proxy = 'localbuild.dev';
    }
}

module.exports = ServerConfig;
