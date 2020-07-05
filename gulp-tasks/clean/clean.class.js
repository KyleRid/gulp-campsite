'use strict';
class Clean {
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

module.exports = Clean;
