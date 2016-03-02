const test = require('tape');
const formatGeneral = require('../src/format-general');
const formatCustom = require('../src/format-custom');
const formatSearch = require('../src/format-search');
const formatSelect = require('../src/format-select');
const formatFilter = require('../src/format-filter');

test('general', assert => {
    assert.equal(formatGeneral(1), '1', 'numbers come back as strings');
    assert.equal(formatGeneral(['foo', 'bar']), 'foo/bar', 'array gets converted to a path');
    assert.equal(formatGeneral(), undefined, 'other values are untouched');

    assert.end();
});

test('custom', assert => {
    assert.equal(formatCustom(), undefined, 'undefined is untouched');
    assert.equal(formatCustom('foo'), 'foo', 'strings are untouched');
    assert.equal(formatCustom(1), '1', 'numbers are converted to strings');
    assert.equal(formatCustom(['foo', 'bar']), '["foo","bar"]', 'arrays are converted to double-quoted array string');
    assert.throws(() => formatCustom(null), 'unhandled values throw');

    assert.end();
});

test('search', assert => {
    assert.equal(
        formatSearch(`Name === bar`),
        `Name eq bar`,
        'search performs operator replacement'
    );

    assert.end();
});

test('filter', assert => {
    assert.equal(formatSelect('*'), '*', 'strings are untouched');
    assert.equal(formatSelect(['foo', 'bar']), 'foo,bar', 'arrays are converted into comma-delimited lists');

    assert.end();
});

test('filter', assert => {
    assert.equal(
        formatFilter(`Name === bar && Price <= 0.57 || (Dollars + Cents === 0.60) and (LastName == baz)`),
        `Name eq 'bar' and Price le 0.57 or (Dollars add Cents eq 0.60) and (LastName eq 'baz')`,
        'filter string replacement'
    );

    assert.equal(
        formatFilter(`Name === @bar`),
        `Name eq @bar`,
        'filter format does not wrap an alias in quotes'
    );

    assert.end();
});