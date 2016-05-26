module.exports = function(next) {
	var components = [
		this.req.headers['accept'],
		this.req.headers['accept-encoding'],
		this.req.headers['accept-language']
	]
	next(null,components)
}
