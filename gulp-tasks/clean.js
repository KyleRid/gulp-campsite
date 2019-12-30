'use strict';

const { tasks } = require('./variables');
const del = require('del');

async function clean() {
    const deletedPaths = await del([
        ...tasks.clean.dist, 
        ...tasks.clean.dev,
    ]
    );
    console.log('deleted paths: ', deletedPaths.join('\n'));
    return deletedPaths;
}

module.exports = {
    run: clean
}
