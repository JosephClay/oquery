module.exports = function(value) {
    // select doesn't format a "path" from an array...only
    // a comma-deminited list
    return Array.isArray(value) ? `${value.join(',')}` : value;
};