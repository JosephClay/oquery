// Tests creation of the following basic methods
//
// format
// top
// skip
// count
// orderby
// expand
// select
// search

const test = require('tape');
const query = require('../query');

test('set values', assert => {
    assert.equal(query().format('foo').get('$format'), 'foo', `format sets $format to 'foo'`);
    assert.equal(query().orderby('foo').get('$orderby'), 'foo', `orderby sets $orderby to 'foo'`);
    assert.equal(query().expand('foo').get('$expand'), 'foo', `expand sets $expand to 'foo'`);
    assert.equal(query().top(1).get('$top'), 1, `top sets $top to 1`);
    assert.equal(query().skip(1).get('$skip'), 1, `skip sets $skip to 1`);
    assert.equal(query().count().get('$count'), true, `count sets $count to true`);
    assert.equal(query().batch().get('$batch'), true, `batch sets $batch to true`);
    assert.equal(query().select('*').get('$select'), '*', `select sets $select to '*'`);
    assert.equal(query().search('foo').get('$search'), 'foo', `search sets $search to 'foo'`);

    assert.end();
});

test('improper values', assert => {
    assert.throws(() => query().format(), `format throws when passed improper value`);
    assert.throws(() => query().orderby(), `orderby throws when passed improper value`);
    assert.throws(() => query().expand(), `expand throws when passed improper value`);
    assert.throws(() => query().top(), `top throws when passed improper value`);
    assert.throws(() => query().skip(), `skip throws when passed improper value`);
    assert.throws(() => query().count(1), `count throws when passed improper value`);
    assert.throws(() => query().batch(1), `batch throws when passed improper value`);
    assert.throws(() => query().select(1), `select throws when passed improper value`);
    assert.throws(() => query().search(1), `search throws when passed improper value`);

    assert.end();
});

test('double sets', assert => {
    assert.throws(() => query().format('foo').format('foo'), `format throws when double set`);
    assert.throws(() => query().orderby('foo').orderby('foo'), `orderby throws when double set`);
    assert.throws(() => query().expand('foo').expand('foo'), `expand throws when double set`);
    assert.throws(() => query().top(1).top(1), `top throws when double set`);
    assert.throws(() => query().skip(1).skip(1), `skip throws when double set`);
    assert.throws(() => query().count().count(), `count throws when double set`);
    assert.throws(() => query().batch().batch(), `batch throws when double set`);
    assert.throws(() => query().select('*').select('*'), `select throws when double set`);
    assert.throws(() => query().search('foo').search('foo'), `search throws when double set`);

    assert.end();
});
