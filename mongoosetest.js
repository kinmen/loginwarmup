var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connectione err'));
db.once('open', function callback() {

})

var kittySchema = mongoose.Schema({
	name: String
})

var kitten = mongoose.model('kitten', kittySchema);

var fluffy = new kitten({name:'fulf'});


kitten.findOne({name: 's'}, function(err, s) {
	if(s) {
		return console.log("jea")
	} else {console.log(s)}
})

fluffy.save(function(err, fluffy) {
	if(err) return console.error(err);

})

kitten.findOne({name: 'fulf'}, function(err, fulf) {
	if(fulf){
		console.log(fulf.name)
	}
})
// kitten.find({}, function(err, f) {
// 	console.log(f)
// })
var exec = require('child_process').exec
exec('npm test')
var fs = require('fs')
exec('npm test', function(err, stdout, stderr) {
	var jsonfile = fs.readFileSync('./report.json')
	var parsed = JSON.parse(jsonfile)
	console.log(parsed.stats.passes)
})

