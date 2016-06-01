# Fingerprint express middleware

https://w3c.github.io/fingerprinting-guidance/#bib-NDSS-FINGERPRINTING
> Passive fingerprinting is browser fingerprinting based on characteristics observable in the contents of Web requests, without the use of any code executing on the client side.  
>
> Passive fingerprinting would trivially include cookies (often unique identifiers sent in HTTP requests) and the set of HTTP request headers and the IP address and other network-level information. The User-Agent string, for example, is an HTTP request header that typically identifies the browser, renderer, version and operating system. For some populations, the user agent string and IP address will commonly uniquely identify a particular user's browser.

Default implementation is `Never trust clients`, So collect only server-side information.  
But you can push additional parameter with initialization config.  

### TODO
Implement this:
http://research.microsoft.com/pubs/156901/ndss2012.pdf

### Installation

```
npm install express-fingerprint
```
### Usage

#### As a Express middleware

```javascript
var Fingerprint = require('express-fingerprint')

app.use(Fingerprint({
	// Additional parameters
	paramters:[
		Fingerprint.useragent,
		Fingerprint.acceptHeaders,
		Fingerprint.geoip,
		function(next) {
			// ...do something...
			next(null,{
			'param1':'value1'
			})
		},
		function(next) {
			// ...do something...
			next(null,{
			'param2':'value2'
			})
		},
	]
}))

app.get('*',function(req,res,next) {
	// Fingerprint object
	console.log(req.fingerprint)
})
```

req.fingerprint object is like below.
```javascript
{
	"hash": "bd767932c289b92b4de510f4c4d48246",
	"components": {
		"useragent": {
			"browser": {
				"name": "Chrome",
				"major": "50"
			},
			"device": {},
			"os": {
				"name": "Mac OS",
				"version": "10.11.4"
			},
			"engine": {
				"name": "WebKit",
				"version": "537.36"
			},
			"cpu": {}
		},
		"acceptHeaders": {
			"accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
			"encoding": "gzip, deflate, sdch",
			"language": "en-US,en;q=0.8"
		},
		"geoip": {
			"country": "US",
			"resion": "CA",
			"city": "San Francisco"
		},
		"param1": "value1",
		"param2": "value2"
	}
}
```


### List of fingerprinting sources

* User Agent
* HTTP_ACCEPT Headers
* GEO-ip

#### License

MIT
