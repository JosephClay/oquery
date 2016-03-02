var v8 = require('v8');
v8.setFlagsFromString('--use_strict');
v8.setFlagsFromString('--harmony_destructuring');

require('./query-alias');
require('./query-allowance');
require('./query-custom');
require('./query-format');
require('./query-methods');