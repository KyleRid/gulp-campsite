'use strict'
class BrowserSync {
    constructor(cfg) {
        this.start = this.start.bind(this);
        this.reload = this.reload.bind(this);
        this.stream = this.stream.bind(this);
        this.serverConfig = cfg;
        this.browserSync = require('browser-sync').create();
    }
    start(finish) {
        this.browserSync.init({
            server: {
                baseDir: this.serverConfig.baseDir,
            },
            port: this.serverConfig.port,
            // proxy: serverConfig.proxy
        });
        finish();
    }

    reload(finish) {
        this.browserSync.reload();
        finish();
    }

    stream() {
        return this.browserSync.stream();
    }
}

module.exports = BrowserSync;

