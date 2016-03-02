module.exports = function(obj) {
    return Object.keys(obj)
        .reduce((map, key) => {
            map[`@${key}`] = `'${obj[key]}'`;
            return map;
        }, {});
};