'use strict';
// variables
const { patterns, paths, PROD, dirs } = require('./gulp-tasks/variables');

// Packages
const gulp = require('gulp');

// Import tasks
const server = require(paths.tasks.browsersync);
const styles = require(dirs.tasks + '/styles');
const copy = require(paths.tasks.copy);
const clean = require(paths.tasks.clean);
const views = require(paths.tasks.views);
const scripts = require(paths.tasks.scripts);


function watchFiles() {
    gulp.watch([patterns.styles.src], gulp.series(styles.lint, styles.run));
    // gulp.watch([/*patterns.views.src,*/ patterns.index.src], gulp.series(/*views.pugs.run,*/ server.reload));
    console.log(patterns);

    gulp.watch([
        patterns.images.src,
        patterns.videos.src,
        patterns.favicons.src,
        patterns.fonts.src,
        patterns.locales.src,
        patterns.robots.src,
        patterns.sitemap.src,
        patterns.views.src,
    ],  gulp.series(copy.run, server.reload));
    gulp.watch([patterns.scripts.src],  gulp.series(scripts.run, server.reload));
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



exports.stylesTest = gulp.series(
    styles.linter,
    styles.run
);

