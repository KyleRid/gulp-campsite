'use strict';
class Config {
    constructor(dirs, PROD = false) {
        this.baseDir = PROD ? dirs.dist : dirs.dev;
        this.port = PROD ? 3000 : 3001;
        // this.proxy = 'localbuild.dev';
    }
}
const {PROD, dirs} = require('./variables');
const browserSync = require('browser-sync').create();
const serverConfig = new Config(dirs, PROD);




function start(finish) {
    browserSync.init({
        server: {
            baseDir: serverConfig.baseDir,
        },
        port: serverConfig.port,
        // proxy: serverConfig.proxy
    });
    finish();
}

function reload(finish) {
    browserSync.reload();
    finish();
}

function stream() {
    return browserSync.stream();
}

module.exports = {
    start: start,
    reload: reload,
    stream: stream,
}
