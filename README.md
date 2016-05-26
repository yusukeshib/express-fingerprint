# Supercookie express middleware

http://programmers.stackexchange.com/questions/122372/is-browser-fingerprinting-a-viable-technique-for-identifying-anonymous-users

### Installation

```
npm install supercookie
```

### Usage

#### As a Express middleware

```javascript
var Supercookie = require('supercookie')
var app = express()
app.use(Supercookie({
	paramters:[
	]
}))
```

### List of fingerprinting sources

* User Agent
* HTTP_ACCEPT Headers
* GEO-ip

#### License

MIT
