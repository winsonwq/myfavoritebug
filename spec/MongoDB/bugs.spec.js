describe("mongodb operation for bugs", function() {
  var Bugs;

  beforeEach(function() {
    Bugs = require('../../models/MongoDB/bugs');
  });

  it("can insert bug in to database", function() {
  	var newBug = { id: 8, title: "A silly bug", description: "I am too silly to describe myself...", submitter: "Mark", assignee: "Wayne", tags: ["foo", "bar"]};
    Bugs.create(newBug, function(err, bug){
    	expect(err).toEqual(null);
    	expect(bug._id).not.toBe(0);
    });
    waits(3000);
  });

  it("can delete bug by id", function(){
  	var newBug = { id: 8, title: "A silly bug", description: "I am too silly to describe myself...", submitter: "Mark", assignee: "Wayne", tags: ["foo", "bar"]};
    Bugs.create(newBug, function(err, bug){
    	Bugs.delete(bug[0], function(err){
    		expect(err).toEqual(null);
    	});
    });
    waits(3000);
  });

  it("should return all bugs", function(){
  	Bugs.find({}, {}, function(err, bugs){
  		expect(err).toEqual(null);
  		expect(bugs.length).not.toBe(0);
  	});
  	waits(3000);
  });
});