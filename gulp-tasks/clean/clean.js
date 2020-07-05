'use strict';

const Clean = require('./clean.class');
const CleanConfig = require('./clean.config');

const clean = new Clean(
    new CleanConfig()
);

module.exports = {
    run: clean.clean
}
