# oquery

`npm install oquery`

oquery is a js lib to simplify creating [odata query strings][1].

[1]: http://docs.oasis-open.org/odata/odata/v4.0/odata-v4.0-part2-url-conventions.html

### Example

```js
const query = require('oquery');

const q = query()
  .filter('foo === 1 || (foo <= 2 && bar === @baz)')
  .alias('baz', 'world')
  .top(100)
  .skip(1)
  .count();

// results in:
// ?$top=100&$skip=1&$filter=foo eq 1 or (foo le 2 and bar eq @baz)&@baz='world'&$count
q.value();

// results in:
// { $top: 100, $skip; 1, $filter: "foo eq 1 or (foo le 2 and bar eq 'baz')", @baz: "world", $count: true }
q.build();
```

### Methods

Currently the following queries are supported:

`.top(int)`
top x objects: ?*$top=2*

`.skip(int)`
skip by x objects: ?*$skip=2*

`.filter(string)`
adds a filter string, converting simple js sytax: ?*$filter=Name eq 'Example'*

`.search(string)`
create a search filter: ?*$search=Price eq 0*

`.orderBy(string || array)`
orders the data: ?*$orderBy=Name*

`.count()`
counts the result: ?*$count*

`.batch()`
indicates a batch body (multiple resources): ?*$batch*

`.expand(string || array)`
expands a related resource: ?*$expand=ProductUnit*

`.select(string || array)`
selects a related resource: ?*$select=ProductUnit*

`.format(string)`
sets an override for the return format: ?*$format=json*

`.alias(string, string)`
sets an alias: ?*@word='Black'*

`.add(string, string)`
adds a custom value to the query string, protecting the odata: ?*hello=world*

### Tests

Run `npm test` after installing `npm i`

#License

The MIT License (MIT)

Copyright (c) 2014 Joseph Clay

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.  IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.