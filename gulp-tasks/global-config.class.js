'use strict';

class GlobalConfig {
    constructor() {
        if (!!GlobalConfig.instance) {
            return GlobalConfig.instance;
        }

        this.yargs = require('yargs');
        this.PROD = this.yargs.argv.PROD;
        this.sass_syntax = this.yargs.argv.sass ? 'sass': 'scss';
        this.dirs = {
            src: 'src',
            dev: 'dev',
            dist: 'dist',
            tasks: './gulp-tasks',
        }
        GlobalConfig.instance = this;
        return this;
    }
}

module.exports = new GlobalConfig();
