var geoip = require('geoip-lite')
var ipaddr = require('ipaddr.js')

module.exports = function(next)  {
	var ip = ipaddr.process(this.req.ip).toString()
	var geo = geoip.lookup(ip)
	var components = [
		geo ? geo.country : null,
		geo ? geo.region : null,
		geo ? geo.city : null
	]
	next(null,components)
}
