'use strict';

// Init prod flag
const yargs = require('yargs');
const PROD = yargs.argv.prod;
const sass_syntax = yargs.argv.sass ? 'sass': 'scss';

// PROD is a static property of a GlobalConfig class, and maybe dirs too
// environment directories paths
const dirs = {
    src: 'src',
    dev: 'dev',
    dist: 'dist',
    tasks: './gulp-tasks',
}

// paths for all directories
const paths = {
    tasks: {
        views: dirs.tasks + '/views',
        scripts: dirs.tasks + '/scripts',

    },
    scripts: {
        src     : dirs.src  + '/ts',
        dist    : dirs.dist + '/js',
        dev     : dirs.dev  + '/js',
    },
};

// patterns for tasks
const patterns = {
    index: {
        src     : dirs.src  + '/index.html',
        dist    : dirs.dist + '/index.html',
        dev     : dirs.dev  + '/index.html',
    },
    scripts: {
        src: paths.scripts.src + '/**/*.ts',
    },
};


module.exports = {
    dirs: dirs,
    paths: paths,
    patterns: patterns,
    PROD: PROD,
}
