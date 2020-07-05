module.exports = class Config {
    constructor(dirs, PROD = false) {
        this._src = dirs.src + '/scss/**/*.scss';
        this._paths = {
            src     : dirs.src + '/scss',
            dist    : dirs.dist + '/styles',
            dev     : dirs.dev  + '/styles',
        }
        this._PROD = PROD;
    }

    get dest() {
        return this._PROD ? 
            this._paths.dist : 
            this._paths.dev;  
    }

    get src() {
        return this._src;
    }

    get PROD() {
        return this._PROD;
    }
}
