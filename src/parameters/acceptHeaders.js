module.exports = function(next) {
  next(
    null,
    {
      acceptHeaders:{
        accept:this.req.headers['accept'],
        language:this.req.headers['accept-language']
      }
    }
  )
}
