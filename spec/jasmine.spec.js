describe('hello world', function(){

	it("description", function(done) {
	  setTimeout(function(){
	  	expect(1).toBe(1);
	  	done();
	  }, 500);
	});

});