const httpMocks = require('node-mocks-http')
const Middleware = require('..')
const should = require('should')
const struct = require('superstruct').struct


let req, res

beforeEach(function(done) {
  req = httpMocks.createRequest({
    method: 'GET',
    url: '/test/path?myid=312',
    query: {
      myid: '312'
    },
    headers: {
      'accept': '*/*',
      'accept-encoding': 'gzip, deflate, br',
      'accept-language': 'en-US,en;q=0.9,ja-JP;q=0.8,ja;q=0.7'
    },
    ip: '192.30.255.112'
  })
  res = httpMocks.createResponse()
  done()
})

it('without option', function(done) {

  const isValid = struct({
    hash: v => !!v.match(/^\w{32}$/),
    components: {
      useragent: {
        browser: {
          family: 'string',
          version: v => !!v.match(/^[0-9.]+$/)
        },
        device: {
          family: 'string',
          version: v => !!v.match(/^[0-9.]+$/)
        },
        os: {
          family: 'string',
          major: v => !!v.match(/^[0-9.]+$/),
          minor: v => !!v.match(/^[0-9.]+$/)
        }
      },
      acceptHeaders: {
        accept: v => v === '*/*',
        language: v => v === 'en-US,en;q=0.9,ja-JP;q=0.8,ja;q=0.7'
      },
      geoip: {
        country: v => v === 'US'
      }
    }
  })
  const middleware = Middleware()
  middleware(req, res, function(err) {
    isValid(req.fingerprint)
    done()
  })
})
