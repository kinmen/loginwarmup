var User = require('./model/model.js')
var assert = require("assert")

describe('isvalidname', function() {
	it("should be valid user", function(done){
		assert(User.isValidUser("gooduser"))
		done()
	})
	it("empty not valid user", function(done){
		assert(!User.isValidUser(""))
		done()
	})
	it("too long user", function(done){
		assert(!User.isValidUser("a"*130))
		done()
	})
})

describe('isvalidpass', function() {
	it("should be valid pw", function(done) {
		assert(User.isValidPassword("goodpassword"))
		done()
	})
	it("empty pw valid", function(done){
		assert(User.isValidPassword(""))
		done()
	})
	it("too long pw", function(done){
		assert(User.isValidPassword("a"*130))
		done()
	})
})
