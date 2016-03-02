const formatCustom = require('./format-custom');

module.exports = function(obj) {
    return Object.keys(obj)
        .reduce((map, key) => {
            map[key] = formatCustom(obj[key]);
            return map;
        }, {});
};