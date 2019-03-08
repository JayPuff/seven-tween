const emptyFunction = (() => {})
import helpers from './helpers'

export default class Tween {
    constructor(id, target, targetTweenList, duration, fromParams, toParams, easeFunctions, defaultEase) {
        this._init(id, target, targetTweenList, duration, fromParams, toParams, easeFunctions, defaultEase)
    }

    _init(id, target,targetTweenList, duration, fromParams, toParams, easeFunctions, defaultEase) {

        this._invalid = false

        if(!duration || isNaN(duration) || typeof duration !== 'number' || duration < 0) {
            console.warn('Warning: Tween Duration not specified or invalid. Setting duration to 0', {target: target, duration: duration, params: toParams})
            duration = 0
        }

        this._id = id
        this._ejected = true
        this._targetTweenList = targetTweenList
        this._progress = 0
        this._timeEllapsed = 0
        this._target = target
        this._duration = duration
        this._fromParams = fromParams
        this._isDOM = false

        if(helpers.isDOMElement(target)) {
            this._isDOM = true
            console.log('Target for Tween: DOM Element')
        } else {
            console.log('Target for Tween: JS Object')
        }

        if(toParams.ease && typeof toParams.ease == 'function') {
            this._easeFunction = toParams.ease
        } else {
            this._easeFunction = easeFunctions[toParams.ease] || defaultEase
        }
        
        // https://stackoverflow.com/questions/122102/what-is-the-most-efficient-way-to-deep-clone-an-object-in-javascript
        // Copy basic object 
        // Only really care about numeric values to tween, not functions, date objects, etc.
        if(!this._isDOM) {
            try {
                this._initialTarget = JSON.parse(JSON.stringify(target));
            } catch (e) {
                console.error('Invalid Tween: Target object for tween has a circular reference', {target: target, duration: duration, params: toParams})
                this._initialTarget = {}
                this._invalid = true
            }
        } else {
            console.error('Invalid Tween: DOM Objects not yet supported', {target: target, duration: duration, params: toParams})
            this._invalid = true
        }

        this._toParams = toParams || {}
        this._activeParams = {}

        // Assign onUpdate and onComplete functions
        this._onStart = this._toParams.onStart 
        this._onUpdate = this._toParams.onUpdate 
        this._onComplete = this._toParams.onComplete 

        if (typeof this._onStart !== 'function') { this._onStart = emptyFunction }
        if (typeof this._onUpdate !== 'function') { this._onUpdate = emptyFunction }
        if (typeof this._onComplete !== 'function') { this._onComplete = emptyFunction }

        if(!this._invalid) {
            this._activate()
        }
    }


    _activate() {
        for(let p in this._toParams) {
            this._activeParams[p] = true
        }
    }

    _complete() {
        if(!this._onCompleted) {
            this._onCompleted = true
            this._onComplete()
        }
    }

    _start() {
        if(!this._onStarted) {

            // Render initial fromParams if available.
            if(this._fromParams) {
                for(let p in this._fromParams) {
                    if(this._activeParams[p]) {
                        this._target[p] = this._fromParams[p]
                        this._initialTarget[p] = this._fromParams[p]
                    }
                }
            }

            // Is this needed or was it only here because of restart
            // render initial values
            // for(let p in this._toParams) {
            //     this._target[p] = this._initialTarget[p]
            // }

            this._onStarted = true
            this._onStart()
        }
    }
}