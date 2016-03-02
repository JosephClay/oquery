// 5.1.1.8 Parameter Aliases
//
// http://docs.oasis-open.org/odata/odata/v4.0/odata-v4.0-part2-url-conventions.html

const test = require('tape');
const query = require('../query');

test('alias', assert => {
    assert.equal(query().alias('word', 'foo').get('word'), 'foo', 'can set alias word to foo');
    assert.throws(() => query().alias('word', 'foo').alias('word', 'foo'), 'cannot set same alias twice');
    assert.equal(query().alias('word', 'foo').value(), `?@word='foo'`, 'stringified word is foo');

    assert.end();
});