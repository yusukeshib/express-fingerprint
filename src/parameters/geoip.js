import geoip from 'geoip-lite'

module.exports = function(next) {
  
  var ip = (this.req.headers['x-forwarded-for'] || '').split(',').pop() ||
        this.req.connection.remoteAddress ||
        this.req.socket.remoteAddress ||
        this.req.connection.socket.remoteAddress;
  
  const geo = geoip.lookup(ip)
  next(null, {
    geoip: {
      country: geo ? geo.country : null
    }
  })
}
