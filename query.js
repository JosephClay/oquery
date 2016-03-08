const isObject = require('lodash/isObject');
const isString = require('lodash/isString');
const validate = require('./src/validate');
const serializeQuery = require('./src/serialize-query');
const serializeCustom = require('./src/serialize-custom');
const serializeAlias = require('./src/serialize-alias');
const strip = require('./src/strip-function-contents');
const applyImports = require('./src/apply-imports');

module.exports = function(imports) {
    const query = new Map();
    const custom = {};
    const alias = {};

    const add = (key, value) => query.set(key, value);

    const protect = function(key, validationFn, fn) {
        return function(value) {
            validationFn(key, value);
            validate.dupe(query, key);
            fn(key, value);
            return this;
        };
    };

    const build = () => {
        return Object.assign(
            serializeQuery(query),
            serializeCustom(custom),
            serializeAlias(alias)
        );
    };

    // this can have side-effects
    if (imports) { applyImports(imports, query, custom, alias); }

    return {
        build,

        get(key) { return query.get(key) || custom[key] || alias[key]; },

        top: protect('$top', validate.num, add),
        skip: protect('$skip', validate.num, add),
        orderby: protect('$orderby', validate.path, add),
        expand: protect('$expand', validate.path, add),
        select: protect('$select', validate.path, add),
        search: protect('$search', validate.str, add),
        filter: protect('$filter', validate.strOrFunc, function(key, value) {
            add(key, isString(value) ? value : strip(value));
        }),

        format: protect('$format', validate.str, function(key, value) {
            validate.formatBatchCount(query, key);
            add(key, value);
        }),
        batch: protect('$batch', validate.undef, function(key) {
            validate.formatBatchCount(query, key);
            add(key, true);
        }),
        count: protect('$count', validate.undef, function(key) {
            validate.formatBatchCount(query, key);
            add(key, true);
        }),

        // proxy to top
        first() { return this.top(1); },
        // proxy to filter
        where(str) { return this.filter(str); },

        add(key, value) {
            if (isObject(key) && value === undefined) {
                const obj = key;
                Object.keys(obj)
                    .forEach(function(k) {
                        const val = obj[k];
                        validate.custom(k);
                        validate.dupe(custom, k);
                        custom[k] = val;
                    });
                return this;
            }

            validate.custom(key);
            validate.dupe(custom, key);
            custom[key] = value;
            return this;
        },

        alias(key, value) {
            validate.alias(key, value);
            validate.dupe(alias, key);
            alias[key] = value;
            return this;
        },

        value() {
            const queryObj = build();
            const values = Object.keys(queryObj)
                .map(key => {
                    const value = queryObj[key];
                    return value === true ? key :
                        `${key}=${value}`;
                })
                .join('&');

            return `?${values}`;
        }
    };
};