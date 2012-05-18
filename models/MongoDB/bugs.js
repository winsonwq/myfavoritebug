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
    listAll : function(callback){
        provider.execute('bugs', function(err, coll){
            coll.find(function(err,cursor){
                cursor.toArray(function (err, result) {
                    callback(result);
                });
            });
        });
    },
    findByTag : function(tag, callback){
        provider.execute('bugs', function(err, coll){
            coll.find(["{tags: \"", tag, "\" }"].join(''), function(err,cursor){
                cursor.toArray(function (err, result) {
                    callback(result);
                });
            });
        });
    }
};

_.extend(exports, Bugs);
