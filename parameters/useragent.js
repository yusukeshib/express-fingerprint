var UseragentParser = require('ua-parser-js')

module.exports = function(next) {
	var parser = new UseragentParser()
	parser.setUA(this.req.headers['user-agent'])
	var ua = parser.getResult()
	next(
		null,
		ua.browser.name,
		ua.browser.major,
		ua.device.model,
		ua.device.vendor,
		ua.device.type,
		ua.os.name,
		ua.os.version,
		ua.engine.name,
		ua.engine.version,
		ua.cpu.architecture
	)
}

