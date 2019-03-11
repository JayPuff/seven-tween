const emptyFunction = (() => {})
import helpers from './helpers'
import reservedWords from './reserved'

export default class Tween {
    constructor(id, target, duration, fromParams, toParams, easeFunction) {
        this._init(id, target, duration, fromParams, toParams, easeFunction)
    }

    _init(id, target, duration, fromParams, toParams, easeFunction) {

        if(!duration || isNaN(duration) || typeof duration !== 'number' || duration < 0) {
            console.warn('Warning: Tween Duration not specified or invalid. Setting duration to 0', { target: target, duration: duration, params: toParams })
            duration = 0
        }

        this._id = id // SevenTween internal ID assigned to this tween
        this._invalid = false // Flag to know if this tween is valid and should be started

        this._target = target // Target Object. We are tweening params on this object.

        // Actual Tweening variables 
        this._duration = duration
        this._progress = 0
        this._timeEllapsed = 0
        this._easeFunction = easeFunction

        this._useless = true // Assume tween is useless by default, meaning no active params to tween (overridden), or no toParams that are not reserved keywords 

        // Keep initial params raw in case we need ...
        this._fromParams = fromParams
        this._toParams = toParams

        this._isDOM = false

        if(helpers.isDOMElement(target)) {
            this._isDOM = true
            console.error('Invalid Tween: DOM Objects not yet supported', { target: target, duration: duration, params: toParams })
            this._invalid = true
            // console.log('Target for Tween: DOM Element')
        } else {
            // console.log('Target for Tween: JS Object')
        }

        

        this._paramDetails = {}

        // Assign onUpdate and onComplete functions
        this._onStart =toParams.onStart 
        this._onUpdate = toParams.onUpdate 
        this._onComplete = toParams.onComplete 

        if (typeof this._onStart !== 'function') { this._onStart = emptyFunction }
        if (typeof this._onUpdate !== 'function') { this._onUpdate = emptyFunction }
        if (typeof this._onComplete !== 'function') { this._onComplete = emptyFunction }

        if(!this._invalid) {
            this._defineParamsDetails(fromParams || {}, toParams)
            if(this._useless) {
                console.error('Invalid Tween: No parameters to tween indicated', { target: target, duration: duration, params: toParams })
                this._invalid = true
            }
        }
    }


    _defineParamsDetails(fromParams, toParams) {
        for(let p in toParams) {

            // Don't keep reserved words as tweening params
            let reserved = false
            for(let r in reservedWords) {
                if(reservedWords[r] == p) {
                    reserved = true
                }
            }
            if(reserved) continue;

            this._paramDetails[p] = {
                active: true,
                fromType: 'number',
                fromValue: fromParams[p] || this._target[p] || 0, 
                toType: 'number', // Only value right now.
                toValue: toParams[p]
            }

            // Found something to tween at least.
            this._useless = false
        }
        
    }

    _deactivateParam(param) {
        this._paramDetails[param].active = false

        // Prove you are useful, dumb tween. or SevenTween will kill you
        this._useless = true
        for(let p in this._paramDetails) {
            if(this._paramDetails[p].active) {
                this._useless = false
            }
        }
    }

    _kill() {
        this._killed = true
    }

    _render() {
        if(this._killed) return
        if(this._onCompleted) return
        for(let p in this._paramDetails) {
            if(!this._paramDetails[p].active) continue; // If parameter is not active, do not tween it.

            // @TODO: depending on param type (to be implemented) convert to appropriate. Ex: string with px, hex/rgb colors
            this._target[p] = this._easeFunction(this._progress, this._timeEllapsed, this._paramDetails[p].fromValue, (this._paramDetails[p].toValue - this._paramDetails[p].fromValue), this._duration * 1000)
        }
    }

    _complete() {
        if(this._killed) return
        if(!this._onCompleted) {
            this._onCompleted = true
            this._onComplete()
        }
    }

    _update() {
        if(this._killed) return
        if(this._onCompleted) return
        this._onUpdate(this._progress)
    }

    _start() {
        if(this._killed) return
        if(this._onCompleted) return
        if(this._onStarted) return


        for(let p in this._paramDetails) {
            if(this._paramDetails[p].active) {
                this._target[p] = this._paramDetails[p].fromValue
                // this._initialTarget[p] = this._paramDetails[p].fromValue
            }
        }

        this._onStarted = true
        this._onStart()
    }
}