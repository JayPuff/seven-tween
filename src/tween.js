const emptyFunction = (() => {})

export default class Tween {
    constructor(id, target, tweenList, duration, fromParams, toParams, easeFunctions, defaultEase) {
        this._init(id, target,tweenList, duration, fromParams, toParams, easeFunctions, defaultEase)
    }

    _init(id, target,tweenList, duration, fromParams, toParams, easeFunctions, defaultEase) {
        if(!target) {
            console.warn('Created a tween with no target object assigned.', {target: target, duration: duration, params: toParams})
            target = {}
        }

        if(!duration || isNaN(duration) || typeof duration !== 'number' || duration < 0) {
            console.warn('Tween Duration not specified or invalid.', {target: target, duration: duration, params: toParams})
            duration = 0
        }

        this._id = id
        this._ejected = true
        this._tweenList = tweenList
        this._progress = 0
        this._timeEllapsed = 0
        this._target = target
        this._duration = duration
        this._durationMS = duration * 1000
        this._timeScale = 1
        this._fromParams = fromParams

        if(toParams.ease && typeof toParams.ease == 'function') {
            this._easeFunction = toParams.ease
        } else {
            this._easeFunction = easeFunctions[toParams.ease] || defaultEase
        }
        
        // https://stackoverflow.com/questions/122102/what-is-the-most-efficient-way-to-deep-clone-an-object-in-javascript
        // Copy basic object 
        // Only really care about numeric values to tween, not functions, date objects, etc.
        this._initialTarget = JSON.parse(JSON.stringify(target));

        this._toParams = toParams || {}
        this._activeParams = {}

        // Assign onUpdate and onComplete functions
        this._onStart = this._toParams.onStart 
        this._onUpdate = this._toParams.onUpdate 
        this._onComplete = this._toParams.onComplete 

        if (typeof this._onStart !== 'function') { this._onStart = emptyFunction }
        if (typeof this._onUpdate !== 'function') { this._onUpdate = emptyFunction }
        if (typeof this._onComplete !== 'function') { this._onComplete = emptyFunction }

        this._activate()
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
            // render initial values
            for(let p in this._toParams) {
                this._target[p] = this._initialTarget[p]
            }
            this._onStarted = true
            this._onStart()
        }
    }
}