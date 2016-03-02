const isNumber = require('lodash/isNumber');
const isString = require('lodash/isString');
const startsWith = require('lodash/startsWith');
const name = 'oquery';

const hasKey = (query, key) => query.has ? query.has(key) : query[key];

module.exports = {
    err(message) {
        throw new Error(`${name}: ${message}`);
    },

    dupe(query, key) {
        if (hasKey(query, key)) {
            throw new Error(`${name}: ${key} already exists`);
        }
    },

    formatBatchCount(query, key) {
        if (
            // format with batch
            (key === '$format' && hasKey(query, '$batch')) ||
            (key === '$batch' && hasKey(query, '$format')) ||
            // count with batch
            (key === '$count' && hasKey(query, '$batch')) ||
            (key === '$batch' && hasKey(query, '$count')) ||
            // count with format
            (key === '$count' && hasKey(query, '$format')) ||
            (key === '$format' && hasKey(query, '$count'))
        ) {
            throw new Error(`${name}: $format || $batch || $count collision`);
        }
    },

    path(key, value) {
        if (!isString(value) && !Array.isArray(value)) {
            throw new Error(`${name}: ${key} requires a string or array, passed ${value}`);
        }
    },
    str(key, value) {
        if (!isString(value)) {
            throw new Error(`${name}: ${key} requires a string, passed ${value}`);
        }
    },
    num(key, value) {
        if (!isNumber(value)) {
            throw new Error(`${name}: ${key} requires a number, passed ${value}`);
        }
    },
    undef(key, value) {
        if (value !== undefined) {
            throw new Error(`${name}: ${key} does not accept a value, passed ${value}`);
        }
    },
    custom(key) {
        if (startsWith(key, '$') || startsWith(key, '@')) {
            throw new Error(`${name}: custom cannot accept key starting with '$' or '@', passed ${key}`);
        }
    },
    alias(key, value) {
        if (!isString(key) && !isString(value)) {
            throw new Error(`${name}: alias requires two strings, passed ${key} and ${value}`);
        }
    }
};
