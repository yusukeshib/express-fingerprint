var geoip = require('geoip-lite')

module.exports = function(next)  {
  var geo = geoip.lookup(this.req.ip)
  next(
    null,
    {
      geoip: {
        country: geo ? geo.country : null
      }
    }
  )
}
