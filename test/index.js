var express = require('express')
var Fingerprint = require('..')

var app = express()

//
app.use(Fingerprint({
	parameters:[
		function(next) {
			next(null,{
				param1:'value1',
				param2:'value2'
			})
		},
		function(next) {
			next(null,{
				param3:'value3',
				param4:'value4'
			})
		}
	]
}))

//
app.set('port',10000)
var server = app.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + server.address().port)
})
app.get('*',function(req,res) {
	res.json({
		fingerprint:req.fingerprint
	})
})
