describe("Bugs", function() {

  var should = require('should');
  var Bugs;

  beforeEach(function() {
    Bugs = require('../../models/MongoDB/bugs');
  });

  it("#create", function(done) {
  	var newBug = { id: 8, title: "A silly bug", description: "I am too silly to describe myself...", submitter: "Mark", assignee: "Wayne", tags: ["foo", "bar"]};
    Bugs.create(newBug, function(err, bug){
      should.strictEqual(err, null);
      bug.should.have.length(1)
      bug[0].should.have.property('_id');
    	done();
    });
  });

  it("#delete", function(done){
  	var newBug = { id: 8, title: "A silly bug", description: "I am too silly to describe myself...", submitter: "Mark", assignee: "Wayne", tags: ["foo", "bar"]};
    Bugs.create(newBug, function(err, bug){
    	Bugs.delete(bug[0], function(){
    		done();
    	});
    });
  });

  it("#find", function(done){
  	Bugs.find({}, {}, function(err, bugs){
      bugs.length.should.not.equal(0);
  		done();
  	});
  });
});