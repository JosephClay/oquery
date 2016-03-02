const isString = require('lodash/isString');
const isNumber = require('lodash/isNumber');
const validate = require('./validate');

module.exports = function(value) {
    if (value === undefined) { return value; }
    if (isString(value)) { return value; }
    if (isNumber(value)) { return `${value}`; }
    if (Array.isArray(value)) {
        return `[${value.map(str => `"${str}"`).join(',')}]`;
    }

    validate.err(`unable to handle value, passed ${value}`);
};
