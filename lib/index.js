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

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _murmurhash3js = __webpack_require__(1);

	var _murmurhash3js2 = _interopRequireDefault(_murmurhash3js);

	var _async = __webpack_require__(2);

	var _async2 = _interopRequireDefault(_async);

	var _parameters = __webpack_require__(3);

	var _parameters2 = _interopRequireDefault(_parameters);

	var _traverse = __webpack_require__(9);

	var _traverse2 = _interopRequireDefault(_traverse);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var hash = _murmurhash3js2.default[process.arch];

	var Fingerprint = function Fingerprint(setting) {
	  var config = _extends({
	    parameters: [Fingerprint.useragent, Fingerprint.acceptHeaders, Fingerprint.geoip]
	  }, setting);

	  return function (req, res, next) {
	    var components = {};
	    config.req = req;
	    var fingerprint = { hash: null };
	    _async2.default.eachLimit(config.parameters, 1, function (parameter, callback) {
	      parameter.bind(config)(function (err, obj) {
	        Object.keys(obj).forEach(function (key) {
	          components[key] = obj[key];
	        });
	        callback(err);
	      });
	    }, function (err) {
	      if (!err) {
	        var leaves = (0, _traverse2.default)(components).reduce(function (acc, x) {
	          if (undefined.isLeaf) acc.push(x);
	          return acc;
	        }, []);
	        fingerprint.hash = hash.hash128(leaves.join('~~~'));
	        fingerprint.components = components; // debug
	        req.fingerprint = fingerprint;
	      }
	      next();
	    });
	  };
	};

	Object.keys(_parameters2.default).forEach(function (key) {
	  Fingerprint[key] = _parameters2.default[key];
	});

	exports = module.exports = Fingerprint;

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

	var _useragent = __webpack_require__(4);

	var _useragent2 = _interopRequireDefault(_useragent);

	var _acceptHeaders = __webpack_require__(6);

	var _acceptHeaders2 = _interopRequireDefault(_acceptHeaders);

	var _geoip = __webpack_require__(7);

	var _geoip2 = _interopRequireDefault(_geoip);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	module.exports = {
	  useragent: _useragent2.default,
	  acceptHeaders: _acceptHeaders2.default,
	  geoip: _geoip2.default
	};

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _useragent = __webpack_require__(5);

	var _useragent2 = _interopRequireDefault(_useragent);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	module.exports = function (next) {
	  var agent = _useragent2.default.parse(undefined.req.headers['user-agent']);
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
	      accept: undefined.req.headers['accept'],
	      language: undefined.req.headers['accept-language']
	    }
	  });
	};

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _geoipLite = __webpack_require__(8);

	var _geoipLite2 = _interopRequireDefault(_geoipLite);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	module.exports = function (next) {
	  var geo = _geoipLite2.default.lookup(undefined.req.ip);
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