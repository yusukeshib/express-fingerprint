module.exports = function(next) {
	next(
		null,
		{
			accept:{
				accept:this.req.headers['accept'],
				encoding:this.req.headers['accept-encoding'],
				language:this.req.headers['accept-language']
			}
		}
	)
}
