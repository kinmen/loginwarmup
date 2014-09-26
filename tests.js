var User = require('./model/model.js')
var assert = require("assert")
require('./app.js')

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
describe('users', function() {
	it("should be valid schema", function(done) {
		var userName = 'asdf'
		var passWord = 'peedubya'
		var newuser = new User({user: userName, password: passWord, count: 1});
		assert(newuser.user == userName)
		assert(newuser.password == passWord)
		assert(newuser.count == 1)
		done()
	})
})
describe('userdbstuff', function() {
	var userName = 'a'
	var passWord = 'peedubya'
	before(function(done) {
		User.remove({},function(err) {
			done()
		})
	})
	describe('users2', function() {
		it("should add and find", function(done) {
			var newuser = new User({user: userName, password: passWord, count: 1});
			newuser.save(done);
		})
		it("should find", function(done) {
			User.findOne({user: userName}, function(err, found){
				assert(found.user == userName)
				done()
			})
		})
		it('should find and inc count', function(done) {
			User.findOneAndUpdate({user:userName}, {$inc: {count:1}}, function(err,found) {
				assert(found.count == 2)
				done()
			})
		})
	})
})