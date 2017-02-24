import useragent from 'useragent'

module.exports = next => {
  const agent = useragent.parse(this.req.headers['user-agent'])
  next(null, {
    useragent: {
      browser:{
        family:agent.family,
        version:agent.major
      },
      device:{
        family:agent.device.family,
        version:agent.device.major
      },
      os: {
        family:agent.os.family,
        major:agent.os.major,
        minor:agent.os.minor
      }
    }
  })
}

