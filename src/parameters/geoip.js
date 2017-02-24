import geoip from 'geoip-lite'

module.exports = function(next) {
  const geo = geoip.lookup(this.req.ip)
  next(null, {
    geoip: {
      country: geo ? geo.country : null
    }
  })
}
