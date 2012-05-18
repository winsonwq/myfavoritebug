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
            bug.should.have.length(1);
            bug[0].should.have.property('_id');
            done();
        });
    });

    it("#listALl", function(done){
        Bugs.listAll(function (allBugs){
            allBugs.length.should.be.above(0);
            done();
        });
    });

    it("#findByTag", function(done){
        var tag = "foo";
        Bugs.findByTag(tag, function(foundBugs){
            for (var i = 0; i < foundBugs.length; i++) {
                foundBugs[i].tags.should.include("foo");
            };

            done();
        });
    });

    it("#searchByTitleTag", function(done){
        var title="s", tag = "foo";
        Bugs.searchByTitleTag(title, tag, function(foundBugs){
            console.log(foundBugs);
            for (var i = 0; i < foundBugs.length; i++) {
                foundBugs[i].title.should.include(title);
                foundBugs[i].tags.should.include(tag);
            };

            done();
        });
    });

    it("#delete", function(done){
        var bug = { id : 8, title: "testing bug title" };
        Bugs.delete(bug, function(){
            done();
        });
    });

});
