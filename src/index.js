// Ease Math functions
import easeFunctions from './ease'

// Get Current Time
import now from './now'

// Polyfill for Request Animation Frame
import rafPolyfill from './requestAnimationFrame'
const rAF = rafPolyfill.requestAnimationFrame
const cAF  = rafPolyfill.cancelAnimationFrame

import Tween from './tween'


// *********************** //
// **** TWEEN LIBRARY **** //
// *********************** //

class SevenTween {
    constructor() {
        // Main array of tweens to iterate over in main loop
        // And 'static' unique ID variable.
        this._tweens = [] 
        this._nextTweenID = 0
        this._nextTargetID = 1

        // Using a unique ID given to a target object, access that object and its tweens.
        this._tweensByTargetID = {}

        // Default easing function
        this._easeFunctions = easeFunctions
        this._defaultEase = easeFunctions.linear
        
        // Reserved words
        this._reserved = ['onStart', 'onUpdate', 'onComplete', 'ease', 'delay']

        // Last time in milliseconds to be used by step()
        // And lagSmoothing which sets deltaTime to 1000/60 if deltaTime was higher than threshold (Ex: Computer froze for a bit, tabbed out of page.)
        this._lastTime = now() 
        this._lagThreshold = 500
        this._lagSmoothing = true

        // Begin main loop
        this._step()
    }

    // Assign a Tween ID and increment inner counter.
    _assignTweenID() {
        let assignedTweenID = this._nextTweenID
        this._nextTweenID += 1
        return assignedTweenID
    }

    // Main Tween for defining/creating method used by to(), fromTo(), set()
    _tween(jsObject, duration, fromParams, toParams) {
        // Get list of tweens for this object.
        let tweenList = this._getTweenList(jsObject)

        // if applicable, overwrite current existing tween params.
        // If an existing tween of this object exists and shares param names, stop those. This one takes priority. 
        this._overwriteParams(tweenList, toParams)

        // If we want to set IMMEDIATELY.
        // @TODO: Cleanly actually immediately apply changes rather than waiting till next step() tick. ?
        if(duration === 0) {
            for(let p in toParams) {
                jsObject[p] = toParams[p]
            }
            return;
        }

        // Create a tween object. 
        // Return a way to cancel the tween
        return this._createTween(jsObject, tweenList, duration, fromParams, toParams)
    }
    
    
    to(jsObject, duration, toParams) {
        return this._tween(jsObject, duration, null, toParams)
    }


    fromTo(jsObject, duration, fromParams, toParams) {
        return this._tween(jsObject, duration, fromParams, toParams)
    }

    set(jsObject, toParams) {
        this._tween(jsObject, 0, null, toParams)
    }

    // Add a new ease function to be used internally via string key
    setEase(name, func) {
        this._easeFunctions[name] = func
    }

    // set lagSmoothing, if set to off will continue animations regardless of being tabbed out, freeze, etc.
    lagSmoothing(val) {
        if(val == null || val == undefined) return this._lagSmoothing;
        this._lagSmoothing = !!val
    }
    
    // Main loop of tweening library
    _step() {
        rAF(() => { this._step() })

        // Delta time
        let currentTime =  now()
        let deltaTime = currentTime - this._lastTime       
        this._lastTime = currentTime

        // Lag smoothing
        if(this._lagSmoothing) {
            if(deltaTime >= this._lagThreshold) {
                deltaTime = 1000/60
            }
        }
        
        // Loop through existing tweens!
        let t = this._tweens.length
        while(t--) {
            let tween = this._tweens[t]
            if(tween._killed) {
                console.warn('Development: Killed Tween Exists within main loop. This should not happen.')
                continue; // Should never have a killed tween in main array of tweens.
            } 


            tween._timeEllapsed += deltaTime * tween._timeScale 

            if(tween._progress === 0) {
                // Force render from Parameters if applicable.
                if(tween._fromParams) {
                    for(let p in tween._fromParams) {
                        tween._target[p] = tween._fromParams[p]
                        tween._initialTarget[p] = tween._fromParams[p]
                    }
                }

                // Call start handler if it has not been called.
                tween._start()
                if(tween._killed) continue; // In case tween was killed within the start handler.
                tween._timeEllapsed = 1000/60 * tween._timeScale // First Iteration gets only 1 frame of time ellapsed at 60fps
            }

            tween._progress = tween._timeEllapsed / tween._durationMS

            // Clamp progress at 1 max.
            if(tween._progress > 1) {
                tween._progress = 1
                tween._timeEllapsed = tween._durationMS
            } 

            // Render
            for(let p in tween._toParams) {
                if(!tween._activeParams[p]) continue; // If parameter is not active, do not tween it.

                // @TODO: depending on param type (to be implemented) convert to appropriate. Ex: string with px, hex/rgb colors
                // (Debatable since tweening library would start having duties that are not necessarily theirs)
                tween._target[p] = tween._easeFunction(tween._progress, tween._timeEllapsed, tween._initialTarget[p], (tween._toParams[p] - tween._initialTarget[p]), tween._durationMS)
            }

            // Run onUpdate callback and pass it the current progress [0, 1]
            tween._onUpdate(tween._progress)

            // Run onComplete callback and remove the tween from the tweens array for this object's map entry
            // Remove tweens from the main tweens array as well, so it does not get iterated over in main step.
            if(tween._progress == 1) {
                if(!tween._repeat) { // Repeat does not exist currently.
                    this._ejectTween(tween, t)
                    // If tween was killed on update function don't run complete.
                    if(!tween._killed) {
                        tween._complete()
                    }
                } else {
                    // tween._complete()
                    // tween.restart()
                }
            }
            

        }
        
    }

    _createTween(jsObject, tweenListForObject, duration, fromParams, toParams) {
        let tween = new Tween(this._assignTweenID(), jsObject, tweenListForObject, duration, fromParams, toParams, this._easeFunctions, this._defaultEase)
        this._injectTween(tween)
        return (() => {
            this._killTween(tween)
        }).bind(this)
    }

    _injectTween(tween) {
        if(tween._ejected) {
            tween._ejected = false
            tween._onStarted = false
            tween._onCompleted = false
            this._tweens.push(tween)
            tween._tweenList.push(tween._id)
        }
    }

    _ejectTween(tween, t) {
        if(tween._killed) return;
        tween._ejected = true
        
        let tt = tween._tweenList.length

        while(tt--) {
            if(tween._tweenList[tt] == tween._id) {
                tween._tweenList.splice(tt,1)
                break;
            } 
        }

        this._tweens.splice(t, 1)
    }

    _killTween(tween) {
        let t = this._tweens.length
        while(t--) {
            let otherTween = this._tweens[t]
            if(otherTween._id == tween._id) {
                this._ejectTween(tween, t)
            }
        }
        tween._killed = true
    }

    // This method is in charge of returning a list of current tweens IDs for a specific JS object
    _getTweenList(jsObject) {
        if(jsObject._7tid && this._tweensByTargetID[jsObject._7tid]) { 
            return this._tweensByTargetID[jsObject._7tid]
        } else {
            jsObject._7tid = this._nextTargetID
            this._nextTargetID += 1
            this._tweensByTargetID[jsObject._7tid] = []
            return this._tweensByTargetID[jsObject._7tid]
        }
    }

    // Given a list of tweenIDs and a new params object, overwrite anything applicable in all current tweens.
    // Ex: Stop older tweens from updating a parameter which has been set to tween differently later.
    _overwriteParams(tweenList, parametersObject) {
        let t = tweenList.length
        while(t--) {
            let tweenID = tweenList[t]
            let tt = this._tweens.length

            while(tt--) {
                let tween = this._tweens[tt]
                if(tween._id == tweenID) {
                    for(let p in tween._toParams) {
                        for(let n in parametersObject) {
                            if(n == p) {
                                tween._activeParams[p] = false
                            }
                        }
                    }
                }
            }
        }
    }
}

// ******************* //
// **** EXPORTING **** //
// ******************* //
const sevenTween = new SevenTween()

// Browser export as a global
if(typeof window !== 'undefined') {
    window.sevenTween = sevenTween
}

// Node Export
if (typeof(module) !== "undefined" && module.exports) {
    module.exports = sevenTween;
}

export default sevenTween
    