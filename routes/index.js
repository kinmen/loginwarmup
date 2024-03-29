var express = require('express');
var router = express.Router();
var User = require('../model/model.js')
var assert = require("assert")

var exec = require('child_process').exec
var fs = require('fs')

/* GET home page. */
router.get('/', function(req, res) {
  res.redirect('/users/login');
});

router.get('/users/login', function(req, res) {
	res.render('index', { title: 'Please enter your credentials below'});
})

router.post('/users/login', function(req, res) {

	var userName = req.body.user;
	var passWord = req.body.password;

	User.findOneAndUpdate({user: userName, password: passWord}, {$inc: {count: 1}}, function(err, docs) {
		if (!docs) {
			//return res.json({errCode: -1});
			return res.render('index', {title: "Invalid username and password combination. Please try again."});
		} else {
			var welcome = "Welcome " + userName + ". You have logged in " + docs.count + " times."
			return res.render('success', {title: welcome, count: docs.count});
			// return res.json({errCode: 1, count: docs.count})
		}
	})
})

router.post('/users/add', function(req, res) {

	var userName = req.body.user;
	var passWord = req.body.password;

	if (!User.isValidUser(userName)) {
		//return res.json({errCode: -3});
		return res.render('index', {title : "The user name should be non-empty and at most 128 characters long. Please try again."})
	}
	if (!User.isValidPassword(passWord)) {
		// return res.json({errCode : -4});
		return res.render('index', {title : "The password should be at most 128 characters long. Please try again."})
	}

	var newuser = User({user: userName, password: passWord, count: 1});

	User.findOne({user: userName}, function(err, found) {
		if(found) {
			// return res.json({errCode: -2})
			return res.render('index', {title : "This username already exists. Please try again."});
		} else {
			newuser.save(function(err, newuser) {
				// return res.json({errCode: 1, count : 1})
				var welcome = "Welcome " + userName + ". You have logged in " + newuser.count + " times."
				return res.render('success', {title : welcome, count: newuser.count});
			})
		}
	})
})
router.post('/TESTAPI/resetFixture', function(req, res) {
	User.remove({},function(err) {
		return res.json({errCode: 1})
	})
})

router.post('/TESTAPI/unitTests', function(req, res) {
	exec('npm test', function(err, stdout, stderr) {
		var jsonfile = fs.readFileSync('./report.json')
		var parsed = JSON.parse(jsonfile)
		var failed = parsed.stats.failures
		var ntests = parsed.stats.tests
		return res.json({nrFailed: failed, output: JSON.stringify(parsed), totalTests: ntests})
	})
})

module.exports = router;
