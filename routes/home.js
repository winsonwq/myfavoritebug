exports.init = function(app){
	
	app.get('/', function(req, res){
		res.render('home', { title : 'Express' });
	});
	
};