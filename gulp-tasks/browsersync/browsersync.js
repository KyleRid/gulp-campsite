'use strict';
const ServerConfig = require('./browsersync.config');
const BrowserSync = require('./browsersync.class');

const browserSync = new BrowserSync(
    new ServerConfig()
);

module.exports = {
    start:  browserSync.start,
    reload: browserSync.reload,
    stream: browserSync.stream,
}
