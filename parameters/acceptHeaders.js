module.exports = function(next) {
	next(
		null,
		this.req.headers['accept'],
		this.req.headers['accept-encoding'],
		this.req.headers['accept-language']
	)
}
