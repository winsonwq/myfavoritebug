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
            coll.find({ "tags": tag }, function(err,cursor){
                cursor.toArray(function (err, result) {
                    callback(result);
                });
            });
        });
    },
    searchByTitleTags : function(title, tags, callback){
        provider.execute('bugs', function(err, coll){
            var queryObj = {
                $and: []
            };

            if(title && title !==""){
                queryObj.$and.push({ title: { $regex: ".*" + title + ".*", $options:'i' } });
            }

            if(tags && tags.length){
                for (var i = 0; i < tags.length; i++) {
                    queryObj.$and.push({tags: tags[i]});
                };
            }
            coll.find(queryObj, function(err,cursor){
                cursor.toArray(function (err, result) {
                    callback(result);
                });
            });
        });
    }
};

_.extend(exports, Bugs);
