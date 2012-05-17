var provider = require('./dbProvider'),
	_ = require('underscore');

var Bugs = {
	create : function(bug, callback){
		provider.execute('bugs', function(err, coll){
			coll.insert(bug, callback);
		});
	},
	delete : function(bug, callback){
		provider.execute('bugs', function(err, coll){
			coll.remove(bug, callback);
		});
	},
	find : function(query, options, callback){
		provider.execute('bugs', function(err, coll){
			coll.find(query, options).toArray(callback);
		});
	}
};

_.extend(exports, Bugs);