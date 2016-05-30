# Fingerprint express middleware

Default implementation is `Never trust clients`, So collect only server-side information.  
But you can push additional parameter with initialization config.  

http://programmers.stackexchange.com/questions/122372/is-browser-fingerprinting-a-viable-technique-for-identifying-anonymous-users

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
		"ua": {
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
		"accept": {
			"accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
			"encoding": "gzip, deflate, sdch",
			"language": "en-US,en;q=0.8"
		},
		"geo": {
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
