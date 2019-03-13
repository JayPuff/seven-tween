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
        this._killed = false // was the tween killed?

        this._target = target // Target Object. We are tweening params on this object.

        // Actual Tweening variables 
        this._duration = duration
        this._progress = 0
        this._timeEllapsed = 0
        this._easeFunction = easeFunction

        // Delay variables
        this._delay = toParams.delay || 0
        this._delayEllapsed = 0

        // Repeat Variables
        this._repeat = toParams.repeat || 0
        this._repeats = 0

        this._useless = true // Assume tween is useless by default, meaning no active params to tween (overridden), or no toParams that are not reserved keywords 

        // Keep initial params raw in case we need ...
        this._fromParams = fromParams
        this._toParams = toParams

        this._isDOM = false

        if(helpers.isDOMElement(target)) {
            this._isDOM = true
            // console.error('Invalid Tween: DOM Objects not yet supported', { target: target, duration: duration, params: toParams })
            // this._invalid = true
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

            // Determine what type of param is 'from'
            let fromBreakdown = helpers.breakdownSourceValue(fromParams[p])
            if(!fromBreakdown) fromBreakdown = helpers.breakdownSourceValue(this._isDOM ? this._target.style[p] : this._target[p]) // This is sloppy.
            if(!fromBreakdown) {
                fromBreakdown = { type: 'number', raw: 0, value: 0, suffix: '' }
                console.warn('Warning: Tweening a property which has no or invalid source value, defaulting to 0', { property: p, target: this._target, duration: this._duration, params: toParams })
            }


            let toBreakdown = helpers.breakdownSourceValue(toParams[p])
            if(!toBreakdown) {
                toBreakdown = { type: 'number', raw: 0, value: 0, suffix: '' }
                console.warn('Warning: Tweening a property which has no or invalid destination value, defaulting to 0', { property: p, target: this._target, duration: this._duration, params: toParams })
            }

            this._paramDetails[p] = {
                active: true,
                fromType: fromBreakdown.type,
                fromValue: fromBreakdown.value,
                fromSuffix: fromBreakdown.suffix,
                toType: toBreakdown.type,
                toValue: toBreakdown.value,
                toSuffix: toBreakdown.suffix,
            }

            if(this._isDOM) {
                if(this._paramDetails[p].toType == 'number') {
                    if( p == 'top' || p == 'left' || p == 'right' || p == 'bottom' || p == 'width' || p == 'height' ||
                        p == 'borderRightWidth' || p == 'borderLeftWidth' || p == 'borderBottomWidth' || p == 'borderTopWidth' ||
                        p == 'borderSpacing' || p == 'borderWidth' || p == 'columnGap' || p == 'columnRuleWidth' || p == 'fontSize' ||
                        p == 'letterSpacing' || p == 'lineHeight' || p == 'margin' || p == 'marginBottom' || p == 'marginTop' ||
                        p == 'marginLeft' || p == 'marginRight' || p == 'maxHeight' || p == 'minHeight' || p == 'maxWidth' || p == 'minWidth' ||
                        p == 'outlineWidth' || p == 'padding' || p == 'paddingTop' || p == 'paddingBottom' || p == 'paddingLeft' || p == 'paddingRight' ||
                        p == 'textIndent' || p == 'verticalAlign' || p == 'wordSpacing' || p == 'backgroundSize') {
                        this._paramDetails[p].toType = 'string'
                        this._paramDetails[p].toSuffix = 'px'
                    }
                }
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

    _tween() {
        if(this._killed) return
        if(this._onCompleted) return
        for(let p in this._paramDetails) {
            if(!this._paramDetails[p].active) continue; // If parameter is not active, do not tween it.

            // @TODO: depending on param type (to be implemented) convert to appropriate. Ex: string with px, hex/rgb colors
            this._render(
                p,
                this._easeFunction(this._progress, this._timeEllapsed, this._paramDetails[p].fromValue, (this._paramDetails[p].toValue - this._paramDetails[p].fromValue), this._duration * 1000),
                'to'
            )
        }
    }

    _render(property, renderValue, ref) {
        let formattedValue;
        if(this._paramDetails[property][ref + 'Type'] == 'number') {
            formattedValue = renderValue
        } else {
            formattedValue = '' + renderValue + this._paramDetails[property][ref + 'Suffix']
        }

        if(!this._isDOM) {
            this._target[property] = formattedValue
        } else {
            // Please take care of special cases or params that aren't actual css props.
            this._target.style[property] = formattedValue
        }
    }

    _complete() {
        if(this._killed) return
        if(!this._onCompleted) {
            this._onCompleted = true
            this._onComplete()
        }
    }

    _restart() {
        this._onStarted = false
        this._onCompleted = false
        this._delayEllapsed = 0
        this._timeEllapsed = 0
        this._progress = 0
        this._repeats += 1
    }

    _shouldRepeat() {
        // console.log(this, this._killed, this._useless, this._repeat, this._repeats)
        if(this._killed || this._useless) return false;
        if(this._repeat < 0) return true;
        if(this._repeats < this._repeat) return true;
        return false;
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
                this._render(p, this._paramDetails[p].fromValue, 'from')
            }
        }

        this._onStarted = true
        this._onStart()
    }
}