'use strict';
// variables
// const {PROD, dirs} = require('./gulp-tasks/variables');
const GlobalConfig = require('./gulp-tasks/variables');
const config = GlobalConfig;
const dirs = config.dirs;
// Packages
const gulp = require('gulp');

// Import tasks
const server = require(config.dirs.tasks + '/browsersync/browsersync');
const styles = require(config.dirs.tasks + '/styles/styles');
const copy = require(config.dirs.tasks + '/copy/copy');
const clean = require(config.dirs.tasks + '/clean/clean');
// const views = require(paths.tasks.views);
const scripts = require(config.dirs.tasks + '/scripts/scripts');


function watchFiles() {
    gulp.watch([dirs.src + '/styles/**/*.scss'], gulp.series(styles.linter, styles.run));
    // gulp.watch([/*patterns.views.src,*/ patterns.index.src], gulp.series(/*views.pugs.run,*/ server.reload));

    gulp.watch([
        dirs.src + '/img/**/*.{jpg,jpeg,png,svg,gif}',
        dirs.src + '/videos/**/*.{mp4,mov}',
        dirs.src + '/favicons/**/*.{jpeg,jpg,png,svg,gif,ico}',
        dirs.src + '/fonts/**/*.{ttf,woff,eof,svg}',
        dirs.src + '/locales/**/*.{pot}',
        dirs.src + '/robots.txt',
        dirs.src + '/sitemap.xml',
        dirs.src + '/views/**/*.html',
    ],  gulp.series(copy.run, server.reload));
    gulp.watch([dirs.src + '/scripts/**/*.ts'],  gulp.series(scripts.run, server.reload));
}

// Start the development and run a server
const dev = gulp.series(
    clean.run,
    gulp.parallel(
        gulp.series(
            styles.linter,
            styles.run,
        ),
        copy.run,
        // views.pugs.run,
        scripts.run
    ),
    server.start,
    watchFiles
);

// Build a distribution version
const build = gulp.series(
    clean.run,
    gulp.parallel(
        gulp.series(
            styles.linter,
            styles.run,
        ),
        copy.run,
    //    views.pugs.run,
        scripts.run
    )
);


// Export tasks for the usage
exports.dev   = dev;
exports.build = build;
