var geoip = require('geoip-lite')
var ipaddr = require('ipaddr.js')

module.exports = function(next)  {
	var ip = ipaddr.process(this.req.ip).toString()
	var geo = geoip.lookup(ip)
	next(
		null,
		{
			geoip: {
				country: geo ? geo.country : null
			}
		}
	)
}
