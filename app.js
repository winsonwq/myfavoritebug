
/**
 * Module dependencies.
 */

var express = require('express'), 
	routesInit = require('./routes/init')

var app = module.exports = express.createServer();
var pub = __dirname + '/public';

// Configuration

app.configure(function(){
  	app.set('views', __dirname + '/views');
  	app.set('view engine', 'jade');
  	app.use(express.bodyParser());
  	app.use(express.methodOverride());

	// sass
	app.use(express.compiler({ enable : ['sass'], src : __dirname, dest : pub }));
	// coffeescript
	app.use(express.compiler({ enable : ['coffeescript'], src : __dirname, dest : pub }));

	app.use(app.router);
	app.use(express.static(pub));

});

app.configure('development', function(){
  	app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
});

app.configure('production', function(){
  	app.use(express.errorHandler()); 
});

// Route
routesInit.init(app);

app.listen(3001);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
