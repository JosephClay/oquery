// Per the spec, section 5.1, this tests the following:
//
// Resource paths not ending in /$count or /$batch allow $format.
//
// http://docs.oasis-open.org/odata/odata/v4.0/odata-v4.0-part2-url-conventions.html

const test = require('tape');
const query = require('../query');

test('$format not allowed with $batch', assert => {
    let q = query().count();
    assert.throws(() => q.format('*'), 'cannot $format with $count');

    q = query().format('*');
    assert.throws(() => q.count(), 'cannot $count with $format');

    assert.end();
});

test('$count not allowed with $batch', assert => {
    let q = query().batch();
    assert.throws(() => q.format('*'), 'cannot $format with $batch');

    q = query().format('*');
    assert.throws(() => q.batch(), 'cannot $batch with $format');

    assert.end();
});
