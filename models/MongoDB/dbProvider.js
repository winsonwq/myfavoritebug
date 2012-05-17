var _ = require('underscore'),
	mongodb = require('mongodb'),
	Db = mongodb.Db,
	Server = mongodb.Server,
	client,
	con;

function execute(collectionName, callback){
	if(client === undefined){
		con = new Db('myfavbugs', new Server ('127.0.0.1', 27017, {}));
		con.open(function(err, pClient){
			client = pClient;
			execute(collectionName, callback);
		});
	}else{
		con.collection(collectionName, function(err, coll) {
			if(typeof callback === 'function'){
				callback(err, coll);
			}
		});
	}
}

exports.execute = execute;