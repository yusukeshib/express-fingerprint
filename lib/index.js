(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("murmurhash3js"), require("async"), require("useragent"), require("geoip-lite"), require("traverse"));
	else if(typeof define === 'function' && define.amd)
		define(["murmurhash3js", "async", "useragent", "geoip-lite", "traverse"], factory);
	else if(typeof exports === 'object')
		exports["index"] = factory(require("murmurhash3js"), require("async"), require("useragent"), require("geoip-lite"), require("traverse"));
	else
		root["index"] = factory(root["murmurhash3js"], root["async"], root["useragent"], root["geoip-lite"], root["traverse"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__, __WEBPACK_EXTERNAL_MODULE_2__, __WEBPACK_EXTERNAL_MODULE_5__, __WEBPACK_EXTERNAL_MODULE_8__, __WEBPACK_EXTERNAL_MODULE_9__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var hash = __webpack_require__(1)[process.arch];
	var async = __webpack_require__(2);
	var parameters = __webpack_require__(3);
	var traverse = __webpack_require__(9);

	//
	exports = module.exports = Fingerprint;
	Object.keys(parameters).forEach(function (key) {
	  Fingerprint[key] = parameters[key];
	});

	function Fingerprint(config) {
	  if (!config) {
	    config = {};
	  }
	  if (!config.parameters) {
	    config.parameters = [Fingerprint.useragent, Fingerprint.acceptHeaders, Fingerprint.geoip];
	  }
	  return function (req, res, next) {
	    var components = {};
	    config.req = req;
	    var fingerprint = {
	      hash: null
	    };
	    async.eachLimit(config.parameters, 1, function (parameter, callback) {
	      parameter.bind(config)(function (err, obj) {
	        Object.keys(obj).forEach(function (key) {
	          components[key] = obj[key];
	        });
	        callback(err);
	      });
	    }, function (err) {
	      if (!err) {
	        var leaves = traverse(components).reduce(function (acc, x) {
	          if (this.isLeaf) {
	            acc.push(x);
	          }
	          return acc;
	        }, []);
	        fingerprint.hash = hash.hash128(leaves.join("~~~"));
	        fingerprint.components = components; // debug
	        req.fingerprint = fingerprint;
	      }
	      next();
	    });
	  };
	}

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = require("murmurhash3js");

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = require("async");

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = {
	  useragent: __webpack_require__(4),
	  acceptHeaders: __webpack_require__(6),
	  geoip: __webpack_require__(7)
	};

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var useragent = __webpack_require__(5);

	module.exports = function (next) {
	  var agent = useragent.parse(this.req.headers['user-agent']);
	  next(null, {
	    useragent: {
	      browser: {
	        family: agent.family,
	        version: agent.major
	      },
	      device: {
	        family: agent.device.family,
	        version: agent.device.major
	      },
	      os: {
	        family: agent.os.family,
	        major: agent.os.major,
	        minor: agent.os.minor
	      }
	    }
	  });
	};

/***/ },
/* 5 */
/***/ function(module, exports) {

	module.exports = require("useragent");

/***/ },
/* 6 */
/***/ function(module, exports) {

	'use strict';

	module.exports = function (next) {
	  next(null, {
	    acceptHeaders: {
	      accept: this.req.headers['accept'],
	      language: this.req.headers['accept-language']
	    }
	  });
	};

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var geoip = __webpack_require__(8);

	module.exports = function (next) {
	  var geo = geoip.lookup(this.req.ip);
	  next(null, {
	    geoip: {
	      country: geo ? geo.country : null
	    }
	  });
	};

/***/ },
/* 8 */
/***/ function(module, exports) {

	module.exports = require("geoip-lite");

/***/ },
/* 9 */
/***/ function(module, exports) {

	module.exports = require("traverse");

/***/ }
/******/ ])
});
;