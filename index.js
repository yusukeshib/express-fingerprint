/*!
 * express-supercookie
 * Copyright(c) 2016 Yusuke Shibata
 * MIT Licensed
 */

'use strict'

var hash = require('murmurhash3js')[process.arch]
var async = require('async')
var parameters = require('./parameters')

//
exports = module.exports = Supercookie

var defaultConfig = {
	parameters:parameters,
}
function Supercookie(config) {
	var config = {
		parameters:defaultConfig.parameters.concat(config.parameters)
	}
	return function(req,res,next) {
		var components = []
		config.req = req
		var supercookie = {
			hash:null
		}
		async.eachLimit(config.parameters,1,function(parameter,callback) {
			parameter.bind(config)(function() {
				var err = arguments[0]
				Array.apply(null,arguments).slice(1).forEach(function(comps) {
					components = components.concat(comps)
				})
				callback(err)
			})
		},function(err) {
			if(!err) {
				supercookie.hash = hash.hash128(components.join("~~~"))
				supercookie.components = components // debug
				req.supercookie = supercookie
			}
			next()
		})
	}
}

