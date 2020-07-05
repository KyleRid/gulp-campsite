'use strict'

class Gulpfile {
    constructor() {
        if (!!Gulpfile.instance) {
            return this;
        }
        this.config =  require('./gulp-tasks/global-config.class');
        this.dirs = this.config.dirs;
        this.gulp = require('gulp');
        this.server = require(this.dirs.tasks + '/browsersync/browsersync');
        this.styles = require(this.dirs.tasks + '/styles/styles');
        this.copy = require(this.dirs.tasks + '/copy/copy');
        this.clean = require(this.dirs.tasks + '/clean/clean');
        // this.views = require(paths.tasks.views);
        this.scripts = require(this.dirs.tasks + '/scripts/scripts');

        this.watchFiles = this.watchFiles.bind(this);
        this.dev = this.dev.bind(this);
        this.build = this.build.bind(this);

        Gulpfile.instance = this;
        return this;
    }

    watchFiles() {
        this.gulp.watch([this.dirs.src + '/styles/**/*.scss'], this.gulp.series(this.styles.linter, this.styles.run));
        // gulp.watch([/*patterns.views.src,*/ patterns.index.src], gulp.series(/*views.pugs.run,*/ server.reload));

        this.gulp.watch([
            this.dirs.src + '/img/**/*.{jpg,jpeg,png,svg,gif}',
            this.dirs.src + '/videos/**/*.{mp4,mov}',
            this.dirs.src + '/favicons/**/*.{jpeg,jpg,png,svg,gif,ico}',
            this.dirs.src + '/fonts/**/*.{ttf,woff,eof,svg}',
            this.dirs.src + '/locales/**/*.{pot}',
            this.dirs.src + '/robots.txt',
            this.dirs.src + '/sitemap.xml',
            this.dirs.src + '/views/**/*.html',
        ],  this.gulp.series(this.copy.run, this.server.reload));
        this.gulp.watch([this.dirs.src + '/scripts/**/*.ts'],  this.gulp.series(this.scripts.run, this.server.reload));
    }

    // Start the development and run a server
    dev() {

       return this.gulp.series(
        this.clean.run,
        this.gulp.parallel(
            this.gulp.series(
                this.styles.linter,
                this.styles.run,
            ),
            this.copy.run,
            // views.pugs.run,
            this.scripts.run
        ),
        this.server.start,
        this.watchFiles
    );


    }
    // Build a distribution version
    build() {
        return this.gulp.series(
            this.clean.run,
            this.gulp.parallel(
                this.gulp.series(
                    this.styles.linter,
                    this.styles.run,
                ),
                this.copy.run,
            //    views.pugs.run,
                this.scripts.run
            )
        );
    }
}

module.exports = new Gulpfile();
