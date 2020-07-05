'use strict'
const Styles = require('./styles.class');
const StylesConfig = require('./styles.config');

const styles = new Styles(
    new StylesConfig()
);


module.exports = {
    run: styles.styles,
    linter: styles.linter,
}
