# Seven Tween
Ideally, the smallest possible useful library for tweening values on JS objects that works on both node, and browser.
Anything extra should be left to some sort of plugin like system: CSS, timelines, etc

Disclaimer: This library is in development.
Considered Features: Delay, Repeat, Overwrite Mode, Tween between colors and %s, Take HTMLElements as targets, Take Array targets, Don't run step unless we have tweens queued / ongoing ?

# Installation
Installing Package
```javascript
npm install -D seven-tween
```

Importing in node
```javascript
let sevenTween = require('seven-tween')
```

Importing in Webpack
```javascript
import sevenTween from 'seven-tween'
```

Importing through script tag  
*To be found in the release folder*
```html
<script type="text/javascript" src="seven-tween.min.js"> 
```


# Usage

## Simple linear tweens

```javascript
let target = {
    x: 100,
    y: 200
}

// - Will tween the y and x values on target object to 400, and 105
// - Will take a duration of 5 seconds
sevenTween.to(target, 5, {y: 400, x: 105})

```


## Callback methods

```javascript
let person = {
    height: 1
}

// Tween person's height from its current value to 6.
// The tween will take 2 seconds.
sevenTween.to(person, 2, {height: 6, 
    onStart: () => {
        console.log(`The person initial height is ${person.height}"!`)
    },
    onUpdate: (progress) => {
        console.log(`The person is ${person.height}" tall!`)
        console.log(`Growth progress: ${progress * 100}%`)
    },
    onComplete: () => {
        console.log('Person has reached their max height!')
    }
})
```


## Set
In order to immediately set properties on an object, and have it overwrite any other tweens currently tweening that property:

```javascript
// sets height to 10, and stops any prior tween using the person object from modiying the height property.
sevenTween.set(person, {height: 10})
```



## Specifiying starting parameters

```javascript
let person = {
    height: 1
}

// Tween person's height from its starting value 3 value to 6.
// The tween will take 5 seconds.
sevenTween.fromTo(person, 5, {height: 3}, {height: 6, 
    onStart: () => {
        console.log(`The person initial height is ${person.height}"!`)
    },
    onUpdate: (progress) => {
        console.log(`The person is ${person.height}" tall!`)
        console.log(`Growth progress: ${progress * 100}%`)
    },
    onComplete: () => {
        console.log('Person has reached their max height!')
    }
})
```


## Easing functions

Seven tween comes with most easing functions built in already, the parameter *ease*, can be set on the toParameters

```javascript
let person = {
    height: 1
}

// Tween person's height from its starting value 3 value to 6.
// The tween will take 5 seconds.
sevenTween.fromTo(person, 5, {height: 3}, { ease: 'easeInExpo', height: 6, 
    onUpdate: (progress) => {
        console.log(`The person is ${person.height}" tall!`)
        console.log(`Growth progress: ${progress * 100}%`)
    }
})
```


## Built-in ease functions

- linear
- easeInQuad, easeOutQuad, easeInOutQuad
- easeInCubic, easeOutCubic, easeInOutCubic
- easeInQuart, easeOutQuart, easeInOutQuart
- easeInQuint, easeOutQuint, easeInOutQuint
- easeInCirc, easeOutCirc, easeInOutCirc
- easeInSine, easeOutSine, easeInOutSine
- easeInExpo, easeOutExpo, easeInOutExpo
- easeInBack, easeOutBack, easeInOutBack
- easeInElastic, easeOutElastic, easeInOutElastic
- easeInBounce, easeOutBounce, easeInOutBounce


## Using your own custom functions

All the supplied functions take the following parameters: (x, t, b, c ,d) where:  
 - x = progress [0.0, 1.0]
 - t = total time ellapsed of tween.
 - b = initial tween value
 - c = difference from initial tween value and the final tween value
 - d = total duration of tween

You can use the progress x variable, or the t,b,c,d variables to define your ease function.
To assign an ease function or overwrite an existing one like

```javascript
sevenTween.setEase('easeInCustom', (x, t, b, c, d) => { return c*t/d + b })

// Then later...
sevenTween.to(someObject, 1.5, {value: 100, ease: 'easeInCustom'})
```


## Cancel or Kill a Tween

By storing the returning value of a *to()* or *fromTo()* call, we can kill/stop a tween whenever we want.

```javascript
// Create a fromTo tween, and make sure it does not auto play.
let killTween = sevenTween.fromTo(someObject, 10, {color: 0}, { color: 255, 
    onComplete: () => {
        console.log('Done! Value should be 255! ... ', someObject.color)
    }
})

// Tween will never Complete.
killTween()

```

## Tabbed out behavior

By default on the browser environment, assuming we did not have to polyfill requestAnimationFrame, lagSmoothing will make sure that tweens stop animating when tabbed out or upon very sharp spikes of lag > 500ms

To continue all animations no matter what even when tabbed out (Will skip to wherever animation should be timeframe wise):

```javascript
sevenTween.lagSmoothing(false)
```


## Under Construction

...



