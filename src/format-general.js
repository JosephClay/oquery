const isNumber = require('lodash/isNumber');

module.exports = function(value) {
        // number -> string
    return isNumber(value) ? `${value}` :
        // path
        Array.isArray(value) ? value.join('/') :
        // default (e.g. undefined)
        value;
};