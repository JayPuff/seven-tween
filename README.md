# Seven Tween
Ideally, the smallest possible useful library for tweening values on JS objects that works on both node, and browser.

Supports Basic CSS property tweening on DOM objects.
Unsupported as of now: transform properties such as scale, rotate, skew, different unit tweening such as 20px to 100%. For the former case you can manually render using the onUpdate function and setting style.transform of a DOM element to what you need while tweening a plain object. For the latter, make sure you always do a fromTo but this will be supported soon.

Also unsupported for now: Color tweens; use a simple object with a property for each color (r,g,b).

Also unsupported: Nested property tweening; Not on the roadmap before any of the other fixes.


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

## Delay option

If you want a tween to start after a specific delay in seconds, the parameter *delay*, can be set on the toParameters

```javascript
let person = {
    height: 1
}

// Tween person's height from its starting value 3 value to 6.
// The tween will take 5 seconds.
sevenTween.to(person, 5, { height: 6,
    delay: 3,
    onStart() => {
        console.log('Delayed Start by 3 seconds')
    },
    onUpdate: (progress) => {
        console.log(`The person is ${person.height}" tall!`)
        console.log(`Growth progress: ${progress * 100}%`)
    }
})
```

## Repeat option

If you want a tween to repeat, the parameter *repeat*, can be set on the toParameters; Setting it to a specific number will make the tween repeat that amount of times, setting it to to -1 will repeat the tween forever, the only thing that will stop this repeat behaviour is killing the tween (As shown in the next section)

```javascript
let person = {
    height: 1
}

// Tween person's height from its starting value 3 value to 6.
// The tween will take 5 seconds.
sevenTween.to(person, 5, { height: 6,
    repeat: -1,
    onStart() => {
        console.log('Started or Restarted the tween!')
    },
    onUpdate: (progress) => {
        console.log(`The person is ${person.height}" tall!`)
        console.log(`Growth progress: ${progress * 100}%`)
        console.log(`Time to re-do it!`)
    }
})
```


## Clear or kill a Tween

By storing the returning value of a *to()* or *fromTo()* call, we can kill/stop a tween whenever we want.
It will no longer tween values, or run any handlers such as onComplete or onUpdate.

```javascript
// Create a fromTo tween, and make sure it does not auto play.
let clearTween = sevenTween.fromTo(someObject, 10, {color: 0}, { color: 255, 
    onComplete: () => {
        console.log('Done! Value should be 255! ... ', someObject.color)
    }
})

// Tween will never Complete.
clearTween()
```


## Clear all tweens on an object

If you prefer to not keep references and make sure tweens are killed individually for a certain object, you can simple clear all tweens for a particular object.
```javascript

sevenTween.fromTo( anotherObject , 6.5, { length: 5 }, { length: 10})
sevenTween.fromTo( anotherObject , 2, { opacity:0.5 }, { opacity: 1})

// Kills the tweens defined above.
sevenTween.clear(anotherObject)

```


## Multiple Tweens tweening same property on same object

When it comes to tweens affecting the same object, whether it's a *fromTo*, a *to*, or even a *set*, priority regarding tweening a particular property always goes to the latest tween declared, even if an older tween had a delay.

That means: Old tweens will still keep running, their onUpdate handlers and onComplete handlers will still run, but they will no longer be mutating properties that have been taken over by newer declared tweens.

Important: If all the properties on a 'repeat' tween have been overriden, the tween will do one last onComplete call when it is done that iteration, and it will no longer repeat after that. even if repeat was set to *-1*



## Tabbed out behavior

By default on the browser environment, assuming we did not have to polyfill requestAnimationFrame, lagSmoothing will make sure that tweens stop animating when tabbed out or upon very sharp spikes of lag > 500ms

It is not recommended to turn off but if you know what you are doing or want specific behaviour, you can disable lagSmoothing which will continue all animations no matter what even when tabbed out (Will skip to wherever animation should be timeframe wise):

```javascript
sevenTween.lagSmoothing(false)
```


## Under Construction

...



