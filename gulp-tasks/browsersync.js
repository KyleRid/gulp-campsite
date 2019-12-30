'use strict';

const { serverConfig } = require('./variables');

const browserSync = require('browser-sync').create();

function start(finish) {
    browserSync.init({
        server: {
            baseDir: serverConfig.baseDir,
        },
        port: serverConfig.port,
        // for WP development and other server stuff
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
