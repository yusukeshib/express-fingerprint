var UseragentParser = require('ua-parser-js')

module.exports = function(next) {
	var parser = new UseragentParser()
	parser.setUA(this.req.headers['user-agent'])
	var ua = parser.getResult()
	next(
		null,
		{
			useragent: {
				browser:{
					name:ua.browser.name,
					major:ua.browser.major
				},
				device:{
					model:ua.device.model,
					vendor:ua.device.vendor,
					type:ua.device.type
				},
				os: {
					name:ua.os.name,
					version:ua.os.version
				},
				engine:{
					name:ua.engine.name,
					version:ua.engine.version
				},
				cpu: {
					architecture:ua.cpu.architecture
				}
			}
		}
	)
}

