var mongoose = require('mongoose')
var schema = mongoose.Schema

var userschema = new schema({
	user: {type: String, unique: true},
	password: {type: String},
	count: {type: Number, max: Math.pow(2,32)}
})

userschema.statics.isValidUser = function(name) {
	if(name) {
		if (name.length <= 128) {
			return true
		}
	}
	return false
}

userschema.statics.isValidPassword = function(password) {
	if(password) {
		if (password.length > 128) {
			return false
		}
	}
	return true
}
module.exports = mongoose.model('Users', userschema);