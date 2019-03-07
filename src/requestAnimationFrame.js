// Get Current Time
import now from './now'

let _rAF;
let _cAF;

if(typeof window !== 'undefined') {
    let vendors = ['ms', 'moz', 'webkit', 'o']
    let x = vendors.length

    _rAF = window.requestAnimationFrame
    _cAF = window.cancelAnimationFrame
    
    while(x--) {
        if(_rAF || x < 0) break;
        _rAF = window[vendors[x]+'RequestAnimationFrame']
        _cAF = window[vendors[x]+'CancelAnimationFrame'] || window[vendors[x]+'CancelRequestAnimationFrame']
    }
}

// If we can't find requestAnimationFrame ...
// Use setTimeout internally but wrap it as if it was requestAnimationFrame
let lastTime = 0

if (!_rAF) {
    _rAF = (callback) => {
        let currTime = now()
        let timeToCall = Math.max(0, 16 - (currTime - lastTime))
        let id = setTimeout(() => { callback(currTime + timeToCall); }, timeToCall)
        lastTime = currTime + timeToCall
        return id
    }
}

if (!_cAF) {
    _cAF = (id) => {
        clearTimeout(id)
    }
}

export default {
    requestAnimationFrame: _rAF,
    cancelAnimationFrame: _cAF,
}