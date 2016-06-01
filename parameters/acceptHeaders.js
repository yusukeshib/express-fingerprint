module.exports = function(next) {
	next(
		null,
		{
			acceptHeaders:{
				accept:this.req.headers['accept'],
				encoding:this.req.headers['accept-encoding'],
				language:this.req.headers['accept-language']
			}
		}
	)
}
