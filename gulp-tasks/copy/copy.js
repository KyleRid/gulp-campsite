'use strict';
const Copy = require('./copy.class');
const CopyConfig = require('./copy.config');
const copy = new Copy(
    new CopyConfig()
);

module.exports = {
    run: copy.copy,
}
