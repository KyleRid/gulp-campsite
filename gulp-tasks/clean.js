'use strict';
const { dirs } = require('./variables');
class Config {
    constructor() {
        this.dist = [dirs.dist + '/**/*', '!' + dirs.dist],
        this.dev = [dirs.dev  + '/**/*', '!' + dirs.dev]
    }
}

class Cleaner {
    constructor(cfg) {
        this.del = require('del');
        this.clean = this.clean.bind(this);
        this.config = cfg;
    }

    async clean() {
        const deletedPaths = await this.del([
            ...this.config.dist, 
            ...this.config.dev,
        ]);
        console.log('deleted paths: ', deletedPaths.join('\n'));
        return deletedPaths;
    }
}

const config = new Config();
const cleaner = new Cleaner(config);
module.exports = {
    run: cleaner.clean
}
