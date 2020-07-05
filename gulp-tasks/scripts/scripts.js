'use strict';
// TODO: add support of ts/js
const Scripts = require('./scripts.class')  ;
const scripts = new Scripts();
module.exports = {
    run: scripts.run,
}
