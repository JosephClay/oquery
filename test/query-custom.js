// Per the spec, section 5.2, this tests the following:
//
// Custom query options MUST NOT begin with a $ or @ character.
//
// http://docs.oasis-open.org/odata/odata/v4.0/errata02/os/complete/part2-url-conventions/odata-v4.0-errata02-os-part2-url-conventions-complete.html#_Custom_Query_Options

const test = require('tape');
const query = require('../query');

test('custom values with $ or @', assert => {
    assert.throws(() => query().add('$foo', 1), 'cannot add a custom value starting with a $');
    assert.throws(() => query().add('@foo', 1), 'cannot add a custom value starting with a @');
    assert.doesNotThrow(() => query().add('foo', 1), 'able to add a custom value that does not start with $ or @');

    assert.end();
});

test('custom values as collection', assert => {
    assert.deepEqual(query().add('foo', ['foo', 'bar']).get('foo'), ['foo', 'bar'], 'can add array as a custom');

    const actual = query().add('foo', ['foo', 'bar']).value();
    const expected = `?foo=["foo","bar"]`;
    assert.equal(actual, expected, 'a collection is an encoded array with double quotes');

    assert.end();
});
