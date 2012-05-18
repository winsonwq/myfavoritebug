exports.init = function(app){
	
	var Bugs = require('../models/MongoDB/bugs');

	app.get('/', function(req, res){
		Bugs.listAll(function(bugs){
			res.render('index', { bugs : bugs });
		});
	});

	app.get('/search', function(req, res){
		var name = req.query.name;
		var tags = req.query.tags.split(',');

		if(name != '' || tags.length > 0){
			Bugs.searchByTitleTags(name, tags, function(bugs){
				res.render('index', { bugs : bugs });
			});
		}else{
			Bugs.listAll(function(bugs){
				res.render('index', { bugs : bugs });
			});
		}
	});
};