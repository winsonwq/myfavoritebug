var mongodb = require('mongodb'),
	Db = mongodb.Db,
	Server = mongodb.Server;

function extend(base, ext){
	for(var p in ext){
		if(ext.hasOwnProperty(p)){
			base[p] = ext[p];
		}
	}
}

function execute(collectionName, callback){
	var con = new Db('myfavbugs', new Server ('127.0.0.1', 27017, {}));
	con.open(function(err, pClient){
		con.collection(collectionName, function(err, coll) {
			if(typeof callback === 'function'){
				callback(err, coll);
			}
		});
	});
}

var Bugs = {
	create : function(bug, callback){
		execute('bugs', function(err, coll){
			coll.insert(bug, callback);
		});
	},
	delete : function(bug, callback){
		execute('bugs', function(err, coll){
			coll.remove(bug, callback);
		});
	},
	find : function(query, options, callback){
		execute('bugs', function(err, coll){
			coll.find(query, options).toArray(callback);
		});
	}
};

extend(exports, Bugs);