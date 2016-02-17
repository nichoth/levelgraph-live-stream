# levelgraph live stream

Live stream a levelgraph query.

## install

    $ npm install levelgraph-live-stream

## example

```js
var db = require('level-test')()('testdb');
var graphdb = require('levelgraph')(db);
var livefeed = require('levelgraph-live-stream');
var through = require('through2');

livefeed(db, { predicate: 'mythology' }, { old: false })
  .pipe(through.obj((data, enc, cb) => {
    cb(null, JSON.stringify(data, null, 2));
  }))
  .pipe(process.stdout)
;

graphdb.put({ subject: 'sphinx', predicate: 'mythology', object: 'greek' });
graphdb.put({ subject: 'loki', predicate: 'mythology', object: 'norse' });
```

## API

### livefeed(leveldb, triple, [opts]) => readable stream

Pass in the level or sublevel instance used by levelgraph and a triple. The opts arg is passed to [level-live-stream](https://github.com/dominictarr/level-live-stream). Return a readable stream that emits objects.
