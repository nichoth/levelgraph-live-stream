var createQuery = require('levelgraph/lib/utilities').createQuery;
var through = require('through2');
var livestream = require('level-live-stream');
var xtend = require('xtend');

module.exports = function(db, triple, opts) {
  var q = createQuery(triple);
  var stream = livestream(db, xtend(opts, q));

  var toJson = through.obj((data, enc, cb) => {
    if (typeof data.value === 'string') {
      return cb(null, xtend(data, {
        value: JSON.parse(data.value)
      }));
    }
    cb(null, data);
  });

  return stream.pipe(toJson);

};
