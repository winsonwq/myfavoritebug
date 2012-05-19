describe('index router', function() {

	var should = require('should');

	var Browser = require('zombie');
	var browser = new Browser();

	var app = require('../../app');
	var baseUrl = 'http://127.0.0.1:3001';
	var routes = app.routes.routes;

	it('/', function(done) {
		var route = routes.get[0];

		var handler = route.callbacks[0];
		var spyRender;
		var spyHandler = spyOn(route.callbacks, '0').andCallFake(function(req, resp){
			spyRender = spyOn(resp, 'render').andCallThrough();
			handler(req, resp);
		});

		browser.visit(baseUrl + route.path, function() {
			spyHandler.callCount.should.equal(1);
			spyRender.mostRecentCall.args[0].should.equal('index');
			done();
		});

	});

	it('/search', function(done) {
		done();
	});

});
