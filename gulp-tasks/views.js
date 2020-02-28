// 'use strict';

// const { paths, patterns, dirs, PROD } = require('./variables');

// const gulp = require('gulp');
// // const pug = require('gulp-pug');
// const plumber = require('gulp-plumber');

// Compile pug files from the pug folder
// function compileTemplates() {
//     return gulp
//         .src(patterns.views.src)
//         .pipe(plumber())
//         .pipe(pug({
//             pretty: true,
//         }))
//         .pipe(gulp.dest(
//             PROD ?
//                 paths.views.dist :
//                 paths.views.dev
//         ));
// }

// Compile index.pug into index.html separately
// function compileIndex() {
//     return gulp
//         .src(patterns.index.src)
//         .pipe(plumber())
//         .pipe(pug({
//             pretty: true
//         }))
//         .pipe(gulp.dest(
//             PROD ?
//                 dirs.dist :
//                 dirs.dev
//         ));
// }

// function compileViews() {
//     compileIndex();
//     return compileTemplates();
// }

// module.exports = {
//     pugs: {
//         run: compileViews,
//     },
// }
