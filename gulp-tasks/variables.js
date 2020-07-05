'use strict';

// Init prod flag
const yargs = require('yargs');
const PROD = yargs.argv.prod;
const sass_syntax = yargs.argv.sass ? 'sass': 'scss';

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
        browsersync: dirs.tasks + '/browsersync',
        // styles: dirs.tasks + '/styles',
        copy: dirs.tasks + '/copy',
        clean: dirs.tasks + '/clean',
        views: dirs.tasks + '/views',
        scripts: dirs.tasks + '/scripts',

    },
    scripts: {
        src     : dirs.src  + '/ts',
        dist    : dirs.dist + '/js',
        dev     : dirs.dev  + '/js',
    },
    // styles: {
    //     src     : dirs.src  + '/scss',
    //     dist    : dirs.dist + '/styles',
    //     dev     : dirs.dev  + '/styles',
    // },
    views: {
        src     : dirs.src  + '',
        dist    : dirs.dist + '',
        dev     : dirs.dev  + '',
    },
    images: {
        src     : dirs.src  + '/img',
        dist    : dirs.dist + '/img',
        dev     : dirs.dev  + '/img',
    },
    videos: {
        src     : dirs.src  + '/videos',
        dist    : dirs.dist + '/videos',
        dev     : dirs.dev  + '/videos',
    },
    fonts: {
        src     : dirs.src  + '/fonts',
        dist    : dirs.dist + '/fonts',
        dev     : dirs.dev  + '/fonts',
    },
    locales: {
        src     : dirs.src  + '/locales',
        dist    : dirs.dist + '/locales',
        dev     : dirs.dev  + '/locales',
    },
    favicons: {
        src     : dirs.src  + '/favicons',
        dist    : dirs.dist + '/favicons',
        dev     : dirs.dev  + '/favicons',
    }
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
    // styles: {
    //     src: paths.styles.src + '/**/*.scss',
    // },
    views: {
        src: paths.views.src + '/**/*.html',
    },
    images: {
        src: paths.images.src + '/**/*.{jpg,jpeg,png,svg,gif}',
    },
    videos: {
        src: paths.videos.src + '/**/*.{mp4,mov}',
    },
    fonts: {
        src: paths.fonts.src + '/**/*.{ttf,woff,eof,svg}',
    },
    locales: {
        src: paths.locales.src + '/**/*.{pot}',
    },
    favicons: {
        src: paths.favicons.src + '/**/*.{jpeg,jpg,png,svg,gif,ico}',
    },
    robots: {
        src: dirs.src + '/robots.txt',
    },
    sitemap: {
        src: dirs.src + '/sitemap.xml',
    }
};

const tasks = {
    copy: {
        img     : [dirs.src + '/img/**/*'],
        video   : []
    },
    clean: {
        dist    : [dirs.dist + '/**/*', '!' + dirs.dist],
        dev     : [dirs.dev  + '/**/*', '!' + dirs.dev]
    }
}

// configuration for BrowserSync
const serverConfig = {
    baseDir: PROD ? dirs.dist : dirs.dev,
    port: PROD ? 3000 : 3001,
    // proxy: 'localbuild.dev'
}

module.exports = {
    dirs: dirs,
    paths: paths,
    patterns: patterns,
    PROD: PROD,
    tasks: tasks,
    serverConfig: serverConfig,
}
