/*!
 * node-fingerprint
 * Copyright(c) 2016 Yusuke Shibata
 * MIT Licensed
 */

'use strict'

var hash = require('murmurhash3js')[process.arch]
var useragent = require('ua-parser-js')
var _ = require('lodash') 

/**
 * Module exports.
 */
exports = module.exports = Fingerprint
Object.defineProperty(exports, 'param', Parameter)

var defaultConfig = {
}

function Fingerprint(config) {
	var config = _.merge(defaultConfig,config)
	return function(req,res,next) {
		// var onFinish = function() {
		// 	res.removeListener('finish', onFinish)
		// }
		// res.on('finish',onFinish)

		var fingerprint = {
			components:[]
		}
		var parser = new useragent()
		parser.setUA(req.headers['user-agent'])
		var ua = parser.getResult()
		fingerprint.components.push(ua.browser.name)
		fingerprint.components.push(ua.browser.major)
		fingerprint.components.push(ua.device.model)
		fingerprint.components.push(ua.device.vendor)
		fingerprint.components.push(ua.device.type)
		fingerprint.components.push(ua.os.name)
		fingerprint.components.push(ua.os.version)
		fingerprint.components.push(ua.engine.name)
		fingerprint.components.push(ua.engine.version)
		fingerprint.components.push(ua.cpu.architecture)
		//
		fingerprint.hash = hash.hash128(fingerprint.components.join("~~~"))
		req.fingerprint = fingerprint
		next()
	}
}
function Parameter() {
}

