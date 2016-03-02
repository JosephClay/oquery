const general = require('./format-general');
const filter = require('./format-filter');
const format = {
    '$filter': filter,
    '$orderby': filter,
    '$select': require('./format-select'),
    '$search': require('./format-search')
};

module.exports = function(obj) {
    return Object.keys(obj)
        .reduce((map, key) => {
            const value = obj[key];
            map[key] = (format[key] || general)(value);
            return map;
        }, {});
};