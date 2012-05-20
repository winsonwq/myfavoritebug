describe('index router', function() {

	var qs = require('querystring');
	var should = require('should');

	var app = require('../../app');
	var baseUrl = 'http://127.0.0.1:3001';
	var routes = app.routes.routes;

	var Browser = require('zombie');
	var browser = new Browser({
		site: baseUrl
	});

	var Bugs = require('../../models/MongoDB/bugs');

	describe("get /", function() {

		it('should get all bugs', function(done) {
			var route = routes.get[0];

			var handler = route.callbacks[0];
			var spyRender;
			var spyHandler = spyOn(route.callbacks, '0').andCallFake(function(req, resp) {
				spyRender = spyOn(resp, 'render').andCallThrough();
				handler(req, resp);
			});

			browser.visit(route.path, function(e, browser, status) {
				status.should.equal(200);
				spyHandler.callCount.should.equal(1);
				spyRender.argsForCall[0][0].should.equal('index');
				spyRender.argsForCall[0][1].should.have.property('bugs');
				done();
			});
		});

	});

	describe("get /search", function() {

		var route, handler, spyRender, spyHandler;

		beforeEach(function() {
			route = routes.get[1];
			handler = route.callbacks[0];
			spyRender;

			spyHandler = spyOn(route.callbacks, '0').andCallFake(function(req, resp) {
				spyRender = spyOn(resp, 'render').andCallThrough();
				handler(req, resp);
			});

			route.path.should.equal('/search');
		});

		it('should get all bugs with no params', function(done) {
			var spyListAll = spyOn(Bugs, 'listAll').andCallThrough();

			browser.visit(route.path, function(e, browser, status) {
				status.should.equal(200);
				spyListAll.callCount.should.equal(1);
				spyHandler.callCount.should.equal(1);
				spyRender.argsForCall[0][0].should.equal('index');
				spyRender.argsForCall[0][1].should.have.property('bugs');
				done();
			});
		});

		it('should get all bugs with two params empty', function(done) {
			var spyListAll = spyOn(Bugs, 'listAll').andCallThrough();
			var path = qs.stringify({
				name: '',
				tags: ''
			});

			browser.visit(route.path + '?' + path, function(e, browser, status) {
				status.should.equal(200);
				spyListAll.callCount.should.equal(1);

				spyHandler.callCount.should.equal(1);
				spyHandler.argsForCall[0][0].query.name.should.equal('');
				spyHandler.argsForCall[0][0].query.tags.should.equal('');

				spyRender.argsForCall[0][0].should.equal('index');
				spyRender.argsForCall[0][1].should.have.property('bugs');

				done();
			});
		});

		it("should get bugs according to name", function(done) {
			var spySearchByTitleTags = spyOn(Bugs, 'searchByTitleTags').andCallThrough();
			var path = qs.stringify({
				name: 'name'
			});

			browser.visit(route.path + '?' + path, function(e, browser, status) {
				status.should.equal(200);
				spySearchByTitleTags.callCount.should.equal(1);
				spySearchByTitleTags.argsForCall[0][0].should.equal('name');
				spySearchByTitleTags.argsForCall[0][1].should.be.an.instanceof(Array);
				spySearchByTitleTags.argsForCall[0][1].should.have.length(0);

				spyHandler.callCount.should.equal(1);
				spyRender.argsForCall[0][0].should.equal('index');
				spyRender.argsForCall[0][1].should.have.property('bugs');

				done();
			});
		});

		it("should get bugs according to tags string", function(done) {
			var spySearchByTitleTags = spyOn(Bugs, 'searchByTitleTags').andCallThrough();
			var path = qs.stringify({
				tags: 'foo,bar'
			});

			browser.visit(route.path + '?' + path, function(e, browser, status) {
				status.should.equal(200);
				spySearchByTitleTags.callCount.should.equal(1);
				spySearchByTitleTags.argsForCall[0][0].should.equal('');
				spySearchByTitleTags.argsForCall[0][1].should.be.an.instanceof(Array);
				spySearchByTitleTags.argsForCall[0][1].should.have.length(2);

				spyHandler.callCount.should.equal(1);
				spyRender.argsForCall[0][0].should.equal('index');
				spyRender.argsForCall[0][1].should.have.property('bugs');

				done();
			});
		});

		it("should get bugs according to name and tags string", function(done) {
			var spySearchByTitleTags = spyOn(Bugs, 'searchByTitleTags').andCallThrough();
			var path = qs.stringify({
				name: 'name',
				tags: 'foo,bar'
			});

			browser.visit(route.path + '?' + path, function(e, browser, status) {
				status.should.equal(200);
				spySearchByTitleTags.callCount.should.equal(1);

				spySearchByTitleTags.argsForCall[0][0].should.equal('name');
				spySearchByTitleTags.argsForCall[0][1].should.be.an.instanceof(Array);
				spySearchByTitleTags.argsForCall[0][1].should.have.length(2);

				spyHandler.callCount.should.equal(1);
				spyRender.argsForCall[0][0].should.equal('index');
				spyRender.argsForCall[0][1].should.have.property('bugs');

				done();
			});
		});
	});
});
