/*!
 * express-fingerprint
 * Copyright(c) 2016 Yusuke Shibata
 * MIT Licensed
 */

'use strict'

var hash = require('murmurhash3js')[process.arch]
var async = require('async')
var parameters = require('./parameters')
var traverse = require('traverse')

//
exports = module.exports = Fingerprint
Object.keys(parameters).forEach(function(key) {
	Fingerprint[key] = parameters[key]
})

function Fingerprint(config) {
	if(!config) {
		config = {}
	}
	if(!config.parameters) {
		config.parameters = [
			Fingerprint.useragent,
			Fingerprint.acceptHeaders,
			Fingerprint.geoip
		]
	}
	return function(req,res,next) {
		var components = {}
		config.req = req
		var fingerprint = {
			hash:null
		}
		async.eachLimit(config.parameters,1,function(parameter,callback) {
			parameter.bind(config)(function(err,obj) {
				Object.keys(obj).forEach(function(key) {
					components[key] = obj[key]
				})
				callback(err)
			})
		},function(err) {
			if(!err) {
				var leaves = traverse(components).reduce(function(acc, x) {
					if (this.isLeaf) {
						acc.push(x);
					}
					return acc;
				}, []);
				fingerprint.hash = hash.hash128(leaves.join("~~~"))
				fingerprint.components = components // debug
				req.fingerprint = fingerprint
			}
			next()
		})
	}
}

