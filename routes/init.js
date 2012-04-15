exports.init = function(app){
	
	var routers = [
		'./index'
	];
	
	routers.forEach(function(route, idx){
		var controller = require(route);
		controller.init && controller.init(app);
	});
};