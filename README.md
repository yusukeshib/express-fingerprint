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
	additional:[
		Supercookie.parameter(...)
	]
}))
```

### List of fingerprinting sources

* User Agent (1 in 4,184)
* HTTP_ACCEPT Headers (1 in 14)
* Browser Plugin Details (1 in 1.8 million)
* Time Zone (1 in 24)
* Screen Size and Color Depth (1 in 1,700)
* System Fonts (1 in 11)
* Cookies Enabled? (1 in 1.3)
* Limited SuperCookie test (1 in 2)


#### License

MIT
