const startsWith = require('lodash/startsWith');

module.exports = function(imports, query, custom, alias) {
    Object.keys(imports)
        .forEach(function(key) {
            const value = imports[key];

            // query
            if (startsWith(key, '$')) {
                return query.add(key, value);
            }

            // alias
            if (startsWith(key, '@')) {
                alias[key.substr(1)] = value;
                return;
            }

            // custom
            custom[key] = value;
        });
};