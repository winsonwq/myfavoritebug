exports.init = function(app){
	
	var routers = [
		'./home'
	];
	
	routers.forEach(function(route, idx){
		var controller = require(route);
		controller.init && controller.init(app);
	});
};