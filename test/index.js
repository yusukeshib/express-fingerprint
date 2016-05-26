var express = require('express')
var fingerprint = require('..')

var app = express()
app.use(fingerprint())
app.set('port',10000)
var server = app.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + server.address().port)
})
app.get('*',function(req,res) {
	res.json({
		fingerprint:req.fingerprint
	})
})
