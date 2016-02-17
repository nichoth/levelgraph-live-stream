var db = require('level-test')()('testdb');
var graphdb = require('levelgraph')(db);
var livefeed = require('../feed.js');
var through = require('through2');

livefeed(db, { predicate: 'mythology' })
  .pipe(through.obj((data, enc, cb) => {
    cb(null, JSON.stringify(data, null, 2));
  }))
  .pipe(process.stdout)
;

graphdb.put({ subject: 'sphinx', predicate: 'mythology', object: 'greek' });
graphdb.put({ subject: 'loki', predicate: 'mythology', object: 'norse' });

