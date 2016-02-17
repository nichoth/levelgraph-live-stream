var level = require('levelup')({ db: require('memdown') });
var db = require('level-sublevel')(level);
//var db = require('level-sublevel')(require('level')(__dirname+'/test'));
var graphsub = db.sublevel('graph', { valueEncoding: 'json' });
var graph = require('levelgraph')(graphsub);
var utils = require('levelgraph/lib/utilities');
var livefeed = require('level-livefeed');
var xtend = require('xtend');

var t = { subject: 'sphinx', predicate: 'mythology', object: 'greek' };
var tt = { subject: 'marduk', predicate: 'mythology', object: 'greek' };
var ttt = { subject: 'loki', predicate: 'mythology', object: 'norse' };
var q = utils.createQuery({ predicate: t.predicate });

// livefeed
var stream = livefeed(graphsub, xtend(q, {
  valueEncoding: 'json'
}));
stream.on('loaded', () => {
  console.log('loaded');
  graph.put(t);
  graph.put(ttt);
});
stream.on('data', data => {
  console.log(xtend(data, {
    value: JSON.parse(data.value)
  }));
});

graph.put(tt);

console.log('query', q);

