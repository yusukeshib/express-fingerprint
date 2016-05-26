/*!
 * node-fingerprint
 * Copyright(c) 2016 Yusuke Shibata
 * MIT Licensed
 */

'use strict'

var hash = require('murmurhash3js')[process.arch]
var _ = require('lodash')
var async = require('async')
var parameters = require('./parameters')

//
exports = module.exports = Fingerprint

var defaultConfig = {
	parameters:parameters,
}
function Fingerprint(config) {
	var config = _.merge(defaultConfig,config)
	return function(req,res,next) {
		var components = []
		config.req = req
		var fingerprint = {
			hash:null
		}
		async.eachLimit(config.parameters,1,function(parameter,callback) {
			parameter.bind(config)(function(err,comps) {
				components = components.concat(comps)
				callback(err)
			})
		},function(err) {
			if(!err) {
				fingerprint.hash = hash.hash128(components.join("~~~"))
				fingerprint.components = components // debug
				req.fingerprint = fingerprint
			}
			next()
		})
	}
}

