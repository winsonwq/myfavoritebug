describe("Bugs", function() {

  var should = require('should');
  var Bugs;

  beforeEach(function() {
    Bugs = require('../../models/MongoDB/bugs');
  });

  it("#create", function(done) {
  	var newBug = { id: 8, title: "testing bug title", description: "I am too silly to describe myself...", submitter: "Mark", assignee: "Wayne", tags: ["foo", "bar"]};
    Bugs.create(newBug, function(err, bug){
      should.strictEqual(err, null);
      bug.should.have.length(1)
      bug[0].should.have.property('_id');
    	done();
    });
  });

  it("#delete", function(done){
  	var bug = { id : 8, title: "testing bug title" };
  	Bugs.delete(bug, function(){
  		done();
  	});
  });

  it("#find", function(done){
    var bug = { id: 8, title: "testing bug title", description: "I am too silly to describe myself...", submitter: "Mark", assignee: "Wayne", tags: ["foo", "bar"]};
    Bugs.create(bug, function(err){
    	Bugs.find({ id: 8, title: "testing bug title" }, {}, function(err, bugs){
        bugs.length.should.equal(1);
    		done();
    	});
    });
  });
});