(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
// Try to use Date.now instead of creating a new date everytime we call now()
var now = Date.now || function () {
  return new Date().getTime();
};

exports.default = now;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); // Ease Math functions


// Get Current Time


// Polyfill for Request Animation Frame


var _ease = __webpack_require__(2);

var _ease2 = _interopRequireDefault(_ease);

var _now = __webpack_require__(0);

var _now2 = _interopRequireDefault(_now);

var _requestAnimationFrame = __webpack_require__(3);

var _requestAnimationFrame2 = _interopRequireDefault(_requestAnimationFrame);

var _tween2 = __webpack_require__(4);

var _tween3 = _interopRequireDefault(_tween2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var rAF = _requestAnimationFrame2.default.requestAnimationFrame;
var cAF = _requestAnimationFrame2.default.cancelAnimationFrame;

// Tween class represents a single tween of values on one target

var SevenTween = function () {
    function SevenTween() {
        _classCallCheck(this, SevenTween);

        // Main array of tweens to iterate over in main loop
        // And 'static' unique ID variable.
        this._tweens = [];
        this._nextTweenID = 1;
        this._nextTargetID = 1;

        // Using a unique ID given to a target object, access that object and its tweens.
        this._tweensByTargetID = {};

        // Default easing function
        this._easeFunctions = _ease2.default;
        this._defaultEase = _ease2.default['linear'];

        // Reserved words / Not Currently in use
        this._reserved = ['onStart', 'onUpdate', 'onComplete', 'ease', 'delay'];

        // Last time in milliseconds to be used by step()
        // And lagSmoothing which sets deltaTime to 1000/60 if deltaTime was higher than threshold (Ex: Computer froze for a bit, tabbed out of page.)
        this._lastTime = (0, _now2.default)();
        this._lagThreshold = 500;
        this._lagSmoothing = true;

        // Begin main loop
        this._step();
    }

    // Assign a Tween ID and increment inner counter.


    _createClass(SevenTween, [{
        key: '_assignTweenID',
        value: function _assignTweenID() {
            var assignedTweenID = this._nextTweenID;
            this._nextTweenID += 1;
            return assignedTweenID;
        }

        // Assign a Target ID and increment inner counter.

    }, {
        key: '_assignTargetID',
        value: function _assignTargetID() {
            var assignedTargetID = this._nextTargetID;
            this._nextTargetID += 1;
            return assignedTargetID;
        }

        // Main Tween for defining/creating method used by to(), fromTo(), set()

    }, {
        key: '_tween',
        value: function _tween(target, duration, fromParams, toParams) {

            // No target = No Tween
            if (!target) {
                console.error('Invalid Tween: Can\'t create a tween with no target object assigned.', { target: target, duration: duration, params: toParams });
                return function () {};
            }

            // Assign target a unique ID if it does not have one.
            if (!target._7tid) {
                target._7tid = this._assignTargetID();
                this._tweensByTargetID[target._7tid] = [];
            }

            // If an existing tween of this object exists and shares params that are being tweened, stop those. This new tween takes priority.
            this._overwriteParams(target, toParams);

            // If we want to set IMMEDIATELY.
            if (duration === 0) {
                for (var p in toParams) {
                    target[p] = toParams[p];
                }
                return;
            }

            // Create a tween object. 
            // Return a way to cancel the tween
            return this._createTween(target, duration, fromParams, toParams);
        }
    }, {
        key: 'to',
        value: function to(target, duration, toParams) {
            return this._tween(target, duration, null, toParams);
        }
    }, {
        key: 'fromTo',
        value: function fromTo(target, duration, fromParams, toParams) {
            return this._tween(target, duration, fromParams, toParams);
        }
    }, {
        key: 'set',
        value: function set(target, toParams) {
            this._tween(target, 0, null, toParams);
        }

        // Clear Tweens on target.

    }, {
        key: 'clear',
        value: function clear(target) {
            if (!target) return;
            var targetTweenList = this._getTweensForTarget(target);

            var t = targetTweenList.length;
            while (t--) {
                var tweenID = targetTweenList[t];
                var tt = this._tweens.length;

                while (tt--) {
                    var tween = this._tweens[tt];
                    if (tween._id == tweenID) {
                        this._killTween(tween);
                    }
                }
            }
        }

        // Add a new ease function to be used internally via string key

    }, {
        key: 'setEase',
        value: function setEase(name, func) {
            this._easeFunctions[name] = func;
        }

        // // set lagSmoothing, if set to off will continue animations regardless of being tabbed out, freeze, etc.

    }, {
        key: 'lagSmoothing',
        value: function lagSmoothing(val) {
            if (val == null || val == undefined) return this._lagSmoothing;
            this._lagSmoothing = !!val;
        }

        // Main loop of tweening library

    }, {
        key: '_step',
        value: function _step() {
            var _this = this;

            rAF(function () {
                _this._step();
            });

            // Delta time
            var currentTime = (0, _now2.default)();
            var deltaTime = currentTime - this._lastTime;
            this._lastTime = currentTime;

            // Lag smoothing
            if (this._lagSmoothing) {
                if (deltaTime >= this._lagThreshold) {
                    deltaTime = 1000 / 60;
                }
            }

            // Loop through existing tweens!
            var t = this._tweens.length;
            while (t--) {
                var tween = this._tweens[t];
                if (tween._killed) {
                    console.warn('Development: Killed Tween Exists within main loop. This should not happen.');
                    continue; // Should never have a killed tween in main array of tweens.
                }

                // Tween Progress logic 
                tween._timeEllapsed += deltaTime;

                if (tween._progress === 0) {
                    // Call start handler if it has not been called.
                    tween._start();
                    tween._timeEllapsed = 1000 / 60; // First Iteration gets only 1 frame of time ellapsed at 60fps
                }

                tween._progress = tween._timeEllapsed / (tween._duration * 1000);

                // Clamp progress at 1 max.
                if (tween._progress > 1) {
                    tween._progress = 1;
                    tween._timeEllapsed = tween._duration * 1000;
                }

                // Render
                tween._render();

                // Run onUpdate callback and pass it the current progress [0, 1]
                tween._update();

                // Run onComplete callback and remove the tween from the tweens array for this object's map entry
                // Remove tweens from the main tweens array as well, so it does not get iterated over in main step.
                if (tween._progress == 1) {
                    if (!tween._repeat) {
                        // Repeat does not exist currently.
                        this._ejectTween(tween, t);
                        tween._complete();
                    } else {
                        // tween._complete()
                        // tween.restart()
                    }
                }
            }
        }
    }, {
        key: '_createTween',
        value: function _createTween(target, duration, fromParams, toParams) {
            var _this2 = this;

            // Determine ease Function
            var easeFunction = void 0;
            if (toParams.ease && typeof toParams.ease == 'function') {
                easeFunction = toParams.ease;
            } else {
                easeFunction = this._easeFunctions[toParams.ease] || this._defaultEase;
            }

            // Create Tween, and inject into seven tween list of tweens if valid.
            var tween = new _tween3.default(this._assignTweenID(), target, duration, fromParams, toParams, easeFunction, this._reserved);
            if (!tween._invalid) {
                this._injectTween(tween);
            }
            return function () {
                _this2._killTween(tween);
            }.bind(this);
        }
    }, {
        key: '_injectTween',
        value: function _injectTween(tween) {
            // Insert into main array
            this._tweens.push(tween);

            // Insert into array of tweens by Target ID
            var targetTweenList = this._getTweensForTarget(tween._target);
            targetTweenList.push(tween._id);
        }
    }, {
        key: '_ejectTween',
        value: function _ejectTween(tween, t) {

            var targetTweenList = this._getTweensForTarget(tween._target);
            var tt = targetTweenList.length;

            while (tt--) {
                if (targetTweenList[tt] == tween._id) {
                    targetTweenList.splice(tt, 1);
                    break;
                }
            }

            this._tweens.splice(t, 1);
        }
    }, {
        key: '_killTween',
        value: function _killTween(tween) {
            var t = this._tweens.length;
            while (t--) {
                var otherTween = this._tweens[t];
                if (otherTween._id == tween._id) {
                    this._ejectTween(tween, t);
                }
            }
            tween._kill();
        }

        // This method is in charge of returning a list of current tweens IDs for a specific JS object / Target

    }, {
        key: '_getTweensForTarget',
        value: function _getTweensForTarget(target) {
            if (target._7tid && this._tweensByTargetID[target._7tid]) {
                return this._tweensByTargetID[target._7tid];
            } else {
                return [];
            }
        }

        // Given a list of tweenIDs and a new params object, overwrite anything applicable in all current tweens.
        // Ex: Stop older tweens from updating a parameter which has been set to tween differently later.

    }, {
        key: '_overwriteParams',
        value: function _overwriteParams(target, parametersObject) {
            var targetTweenList = this._getTweensForTarget(target);
            var t = targetTweenList.length;
            while (t--) {
                var tweenID = targetTweenList[t];
                var tt = this._tweens.length;

                while (tt--) {
                    var tween = this._tweens[tt];
                    if (tween._id == tweenID) {
                        for (var p in tween._paramDetails) {
                            for (var n in parametersObject) {
                                if (n == p) {
                                    tween._deactivateParam(p);
                                    if (tween._useless) {
                                        console.log('found useless tween');
                                        this._ejectTween(tween, tt);
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }]);

    return SevenTween;
}();

var sevenTween = new SevenTween();

// Browser export as a global
if (typeof window !== 'undefined') {
    window.sevenTween = sevenTween;
}

// Node Export
if ( true && module.exports) {
    module.exports = sevenTween;
}

// Module export - Webpack
exports.default = sevenTween;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
var ease = {
    linear: function linear(x, t, b, c, d) {
        return c * t / d + b;
    },
    easeInQuad: function easeInQuad(x, t, b, c, d) {
        t /= d;return c * t * t + b;
    },
    easeOutQuad: function easeOutQuad(x, t, b, c, d) {
        t /= d;return -c * t * (t - 2) + b;
    },
    easeInOutQuad: function easeInOutQuad(x, t, b, c, d) {
        t /= d / 2;if (t < 1) return c / 2 * t * t + b;t--;return -c / 2 * (t * (t - 2) - 1) + b;
    },
    easeInCubic: function easeInCubic(x, t, b, c, d) {
        t /= d;return c * t * t * t + b;
    },
    easeOutCubic: function easeOutCubic(x, t, b, c, d) {
        t /= d;t--;return c * (t * t * t + 1) + b;
    },
    easeInOutCubic: function easeInOutCubic(x, t, b, c, d) {
        t /= d / 2;if (t < 1) return c / 2 * t * t * t + b;t -= 2;return c / 2 * (t * t * t + 2) + b;
    },
    easeInQuart: function easeInQuart(x, t, b, c, d) {
        t /= d;return c * t * t * t * t + b;
    },
    easeOutQuart: function easeOutQuart(x, t, b, c, d) {
        t /= d;t--;return -c * (t * t * t * t - 1) + b;
    },
    easeInOutQuart: function easeInOutQuart(x, t, b, c, d) {
        t /= d / 2;if (t < 1) return c / 2 * t * t * t * t + b;t -= 2;return -c / 2 * (t * t * t * t - 2) + b;
    },
    easeInQuint: function easeInQuint(x, t, b, c, d) {
        t /= d;return c * t * t * t * t * t + b;
    },
    easeOutQuint: function easeOutQuint(x, t, b, c, d) {
        t /= d;t--;return c * (t * t * t * t * t + 1) + b;
    },
    easeInOutQuint: function easeInOutQuint(x, t, b, c, d) {
        t /= d / 2;if (t < 1) return c / 2 * t * t * t * t * t + b;t -= 2;return c / 2 * (t * t * t * t * t + 2) + b;
    },
    easeInSine: function easeInSine(x, t, b, c, d) {
        return -c * Math.cos(t / d * (Math.PI / 2)) + c + b;
    },
    easeOutSine: function easeOutSine(x, t, b, c, d) {
        return c * Math.sin(t / d * (Math.PI / 2)) + b;
    },
    easeInOutSine: function easeInOutSine(x, t, b, c, d) {
        return -c / 2 * (Math.cos(Math.PI * t / d) - 1) + b;
    },
    easeInExpo: function easeInExpo(x, t, b, c, d) {
        return c * Math.pow(2, 10 * (t / d - 1)) + b;
    },
    easeOutExpo: function easeOutExpo(x, t, b, c, d) {
        return c * (-Math.pow(2, -10 * t / d) + 1) + b;
    },
    easeInOutExpo: function easeInOutExpo(x, t, b, c, d) {
        t /= d / 2;if (t < 1) return c / 2 * Math.pow(2, 10 * (t - 1)) + b;t--;return c / 2 * (-Math.pow(2, -10 * t) + 2) + b;
    },
    easeInCirc: function easeInCirc(x, t, b, c, d) {
        t /= d;return -c * (Math.sqrt(1 - t * t) - 1) + b;
    },
    easeOutCirc: function easeOutCirc(x, t, b, c, d) {
        t /= d;t--;return c * Math.sqrt(1 - t * t) + b;
    },
    easeInOutCirc: function easeInOutCirc(x, t, b, c, d) {
        t /= d / 2;if (t < 1) return -c / 2 * (Math.sqrt(1 - t * t) - 1) + b;t -= 2;return c / 2 * (Math.sqrt(1 - t * t) + 1) + b;
    },
    easeInBack: function easeInBack(x, t, b, c, d, s) {
        if (s == undefined) {
            s = 1.70158;
        }return c * (t /= d) * t * ((s + 1) * t - s) + b;
    },
    easeOutBack: function easeOutBack(x, t, b, c, d, s) {
        if (s == undefined) {
            s = 1.70158;
        }return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b;
    },
    easeInOutBack: function easeInOutBack(x, t, b, c, d, s) {
        if (s == undefined) {
            s = 1.70158;
        }if ((t /= d / 2) < 1) return c / 2 * (t * t * (((s *= 1.525) + 1) * t - s)) + b;return c / 2 * ((t -= 2) * t * (((s *= 1.525) + 1) * t + s) + 2) + b;
    },
    easeInElastic: function easeInElastic(x, t, b, c, d) {
        var s = 1.70158;var p = 0;var a = c;if (t == 0) return b;if ((t /= d) == 1) return b + c;if (!p) p = d * .3;if (a < Math.abs(c)) {
            a = c;var s = p / 4;
        } else var s = p / (2 * Math.PI) * Math.asin(c / a);return -(a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
    },
    easeOutElastic: function easeOutElastic(x, t, b, c, d) {
        var s = 1.70158;var p = 0;var a = c;if (t == 0) return b;if ((t /= d) == 1) return b + c;if (!p) p = d * .3;if (a < Math.abs(c)) {
            a = c;var s = p / 4;
        } else var s = p / (2 * Math.PI) * Math.asin(c / a);return a * Math.pow(2, -10 * t) * Math.sin((t * d - s) * (2 * Math.PI) / p) + c + b;
    },
    easeInOutElastic: function easeInOutElastic(x, t, b, c, d) {
        var s = 1.70158;var p = 0;var a = c;if (t == 0) return b;if ((t /= d / 2) == 2) return b + c;if (!p) p = d * (.3 * 1.5);if (a < Math.abs(c)) {
            a = c;var s = p / 4;
        } else var s = p / (2 * Math.PI) * Math.asin(c / a);if (t < 1) return -.5 * (a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;return a * Math.pow(2, -10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p) * .5 + c + b;
    },
    easeOutBounce: function easeOutBounce(x, t, b, c, d) {
        if ((t /= d) < 1 / 2.75) {
            return c * (7.5625 * t * t) + b;
        } else if (t < 2 / 2.75) {
            return c * (7.5625 * (t -= 1.5 / 2.75) * t + .75) + b;
        } else if (t < 2.5 / 2.75) {
            return c * (7.5625 * (t -= 2.25 / 2.75) * t + .9375) + b;
        } else {
            return c * (7.5625 * (t -= 2.625 / 2.75) * t + .984375) + b;
        }
    },
    easeInBounce: function easeInBounce(x, t, b, c, d) {
        return c - _ease.easeOutBounce(x, d - t, 0, c, d) + b;
    },
    easeInOutBounce: function easeInOutBounce(x, t, b, c, d) {
        if (t < d / 2) return _ease.easeInBounce(x, t * 2, 0, c, d) * .5 + b;return _ease.easeOutBounce(x, t * 2 - d, 0, c, d) * .5 + c * .5 + b;
    }
};

exports.default = ease;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _now = __webpack_require__(0);

var _now2 = _interopRequireDefault(_now);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _rAF = void 0; // Get Current Time

var _cAF = void 0;

if (typeof window !== 'undefined') {
    var vendors = ['ms', 'moz', 'webkit', 'o'];
    var x = vendors.length;

    _rAF = window.requestAnimationFrame;
    _cAF = window.cancelAnimationFrame;

    while (x--) {
        if (_rAF || x < 0) break;
        _rAF = window[vendors[x] + 'RequestAnimationFrame'];
        _cAF = window[vendors[x] + 'CancelAnimationFrame'] || window[vendors[x] + 'CancelRequestAnimationFrame'];
    }
}

// If we can't find requestAnimationFrame ...
// Use setTimeout internally but wrap it as if it was requestAnimationFrame
var lastTime = 0;

if (!_rAF) {
    _rAF = function _rAF(callback) {
        var currTime = (0, _now2.default)();
        var timeToCall = Math.max(0, 16 - (currTime - lastTime));
        var id = setTimeout(function () {
            callback(currTime + timeToCall);
        }, timeToCall);
        lastTime = currTime + timeToCall;
        return id;
    };
}

if (!_cAF) {
    _cAF = function _cAF(id) {
        clearTimeout(id);
    };
}

exports.default = {
    requestAnimationFrame: _rAF,
    cancelAnimationFrame: _cAF
};

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _helpers = __webpack_require__(5);

var _helpers2 = _interopRequireDefault(_helpers);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var emptyFunction = function emptyFunction() {};

var Tween = function () {
    function Tween(id, target, duration, fromParams, toParams, easeFunction, reservedWords) {
        _classCallCheck(this, Tween);

        this._init(id, target, duration, fromParams, toParams, easeFunction, reservedWords);
    }

    _createClass(Tween, [{
        key: '_init',
        value: function _init(id, target, duration, fromParams, toParams, easeFunction, reservedWords) {

            if (!duration || isNaN(duration) || typeof duration !== 'number' || duration < 0) {
                console.warn('Warning: Tween Duration not specified or invalid. Setting duration to 0', { target: target, duration: duration, params: toParams });
                duration = 0;
            }

            this._id = id; // SevenTween internal ID assigned to this tween
            this._invalid = false; // Flag to know if this tween is valid and should be started

            this._target = target; // Target Object. We are tweening params on this object.


            this._duration = duration;
            this._progress = 0;
            this._timeEllapsed = 0;
            this._easeFunction = easeFunction;

            this._useless = true; // Assume tween is useless by default, meaning no active params to tween (overridden), or no toParams that are not reserved keywords 

            // Keep initial params raw in case we need ...
            this._fromParams = fromParams;
            this._toParams = toParams;

            this._isDOM = false;

            if (_helpers2.default.isDOMElement(target)) {
                this._isDOM = true;
                console.error('Invalid Tween: DOM Objects not yet supported', { target: target, duration: duration, params: toParams });
                this._invalid = true;
                // console.log('Target for Tween: DOM Element')
            } else {
                    // console.log('Target for Tween: JS Object')
                }

            this._paramDetails = {};

            // Assign onUpdate and onComplete functions
            this._onStart = toParams.onStart;
            this._onUpdate = toParams.onUpdate;
            this._onComplete = toParams.onComplete;

            if (typeof this._onStart !== 'function') {
                this._onStart = emptyFunction;
            }
            if (typeof this._onUpdate !== 'function') {
                this._onUpdate = emptyFunction;
            }
            if (typeof this._onComplete !== 'function') {
                this._onComplete = emptyFunction;
            }

            if (!this._invalid) {
                this._defineParamsDetails(fromParams || {}, toParams, reservedWords);
                if (this._useless) {
                    console.warn('Invalid Tween: No parameters to tween indicated');
                    this._invalid = true;
                }
            }
        }
    }, {
        key: '_defineParamsDetails',
        value: function _defineParamsDetails(fromParams, toParams, reservedWords) {

            for (var p in toParams) {

                // Don't keep reserved words as tweening params
                var reserved = false;
                for (var r in reservedWords) {
                    if (reservedWords[r] == p) {
                        reserved = true;
                    }
                }
                if (reserved) continue;

                this._paramDetails[p] = {
                    active: true,
                    fromType: 'number',
                    fromValue: fromParams[p] || this._target[p] || 0,
                    toType: 'number', // Only value right now.
                    toValue: toParams[p]

                    // Found something to tween at least.
                };this._useless = false;
            }
        }
    }, {
        key: '_deactivateParam',
        value: function _deactivateParam(param) {
            this._paramDetails[param].active = false;

            // Prove you are useful, dumb tween. or SevenTween will kill you
            this._useless = true;
            for (var p in this._paramDetails) {
                if (this._paramDetails[p].active) {
                    this._useless = false;
                }
            }
        }
    }, {
        key: '_kill',
        value: function _kill() {
            this._killed = true;
        }
    }, {
        key: '_render',
        value: function _render() {
            if (this._killed) return;
            if (this._onCompleted) return;
            for (var p in this._paramDetails) {
                if (!this._paramDetails[p].active) continue; // If parameter is not active, do not tween it.

                // @TODO: depending on param type (to be implemented) convert to appropriate. Ex: string with px, hex/rgb colors
                this._target[p] = this._easeFunction(this._progress, this._timeEllapsed, this._paramDetails[p].fromValue, this._paramDetails[p].toValue - this._paramDetails[p].fromValue, this._duration * 1000);
            }
        }
    }, {
        key: '_complete',
        value: function _complete() {
            if (this._killed) return;
            if (!this._onCompleted) {
                this._onCompleted = true;
                this._onComplete();
            }
        }
    }, {
        key: '_update',
        value: function _update() {
            if (this._killed) return;
            if (this._onCompleted) return;
            this._onUpdate(this._progress);
        }
    }, {
        key: '_start',
        value: function _start() {
            if (this._killed) return;
            if (this._onCompleted) return;
            if (this._onStarted) return;

            for (var p in this._paramDetails) {
                if (this._paramDetails[p].active) {
                    this._target[p] = this._paramDetails[p].fromValue;
                    // this._initialTarget[p] = this._paramDetails[p].fromValue
                }
            }

            this._onStarted = true;
            this._onStart();
        }
    }]);

    return Tween;
}();

exports.default = Tween;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var isDOMElement = function isDOMElement(o) {
    return (typeof HTMLElement === "undefined" ? "undefined" : _typeof(HTMLElement)) === "object" ? o instanceof HTMLElement : //DOM2
    o && (typeof o === "undefined" ? "undefined" : _typeof(o)) === "object" && o !== null && o.nodeType === 1 && typeof o.nodeName === "string";
};

exports.default = {
    isDOMElement: isDOMElement
};

/***/ })
/******/ ]);
});