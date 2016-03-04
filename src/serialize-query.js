const general = require('./format-general');
const filter = require('./format-filter');
const format = {
    '$filter': filter,
    '$orderby': filter,
    '$select': require('./format-select'),
    '$search': require('./format-search')
};

module.exports = function(map) {
    const obj = {};
    map.forEach((value, key) => {
        const value = map.get(key);
        obj[key] = (format[key] || general)(value);
        return obj;
    });
    return obj;
};