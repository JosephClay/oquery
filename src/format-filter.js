const startsWith = require('lodash/startsWith');
const endsWith = require('lodash/endsWith');
const isNumber = require('lodash/isNumber');
const operations = require('./operations.json');
const comparison = [
    '==',
    '===',
    '!=',
    '!==',
    '>',
    '>=',
    '<',
    '<='
].reduce((map, key) => {
    map[key] = 1;
    return map;
}, {});

module.exports = function(str) {
    const pieces = str.split(' ');

    return pieces.map(value => value.trim())
        .map(value => operations[value] || value)
        .map((value, idx) => {
            const previousPiece = pieces[idx - 1];
            const wasComparison = comparison[previousPiece];
            if (!wasComparison) { return value; }

            // if we ran into a comparison, this value should be formatted
            // with '' if it's not already

            // assume the fast path...that the user already wrapped
            // in single quotes
            if (startsWith(value, `'`)) { return value; }
            // or the vale is an alias
            if (startsWith(value, `@`)) { return value; }

            // the value could be in a group
            let val = value;
            let end = '';
            if (endsWith(value, `)`)) {
                val = val.substr(0, val.length - 1);
                end = ')';
            }

            // it was a number, this was a noop
            const numVal = +val;
            if (isNumber(numVal) && !isNaN(numVal)) { return value; }

            // trim double quotes if they're used
            if (startsWith(value, '"')) { val = val.substr(1, val.length); }
            if (endsWith(value, '"')) { val = val.substr(0, val.length - 1); }

            // return the correctly formatted value
            return `'${val}'${end}`;
        })
        .join(' ');
};