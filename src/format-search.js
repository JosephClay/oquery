const operations = require('./operations.json');

module.exports = function(str) {
    const pieces = str.split(' ');

    return pieces.map(value => value.trim())
        .map(value => operations[value] || value)
        .join(' ');
};