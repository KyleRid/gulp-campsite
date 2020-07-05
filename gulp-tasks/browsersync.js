'use strict';
class Config {
    constructor(dirs, PROD = false) {
        this.baseDir = PROD ? dirs.dist : dirs.dev;
        this.port = PROD ? 3000 : 3001;
        // this.proxy = 'localbuild.dev';
    }
}

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
                baseDir: serverConfig.baseDir,
            },
            port: serverConfig.port,
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
const {PROD, dirs} = require('./variables');
const serverConfig = new Config(dirs, PROD);
const browserSync = new BrowserSync(serverConfig);
module.exports = {
    start: browserSync.start,
    reload: browserSync.reload,
    stream: browserSync.stream,
}
