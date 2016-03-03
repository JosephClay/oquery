// strips out the contents of a function
// to use as the base of a filter

const test = require('tape');
const strip = require('../src/strip-function-contents');

test('alias', assert => {
    let foo;

    const expected = 'foo === 1';
    assert.equal(strip(function() { return foo === 1; }), expected, 'can strip normal function');
    assert.equal(strip(function(bar, baz, foo) { return foo === 1; }), expected, 'can strip normal function with params');
    assert.equal(strip(function(bar, baz, foo) {
        return foo === 1;
    }), expected, 'can strip normal function with newlines');

    assert.equal(strip(() => foo === 1), expected, 'can strip arrow function function');

    assert.equal(strip(() => { return foo === 1; }), expected, 'can strip arrow function with return function');
    assert.equal(strip((bar, baz, foo) => { return foo === 1; }), expected, 'can strip arrow function with return with params');
    assert.equal(strip((bar, baz, foo) => {
        return foo === 1;
    }), expected, 'can strip arrow function with return with newlines');

    assert.end();
});
