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

    it("#searchByTitleTags", function(done){
        var title="s", tags = ["foo","bar"];
        Bugs.searchByTitleTags(title, tags, function(foundBugs){
            for (var i = 0; i < foundBugs.length; i++) {
                foundBugs[i].title.should.include(title);
                //foundBugs[i].tags.should.equal(tags);
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
