console.log(sevenTween)

let object = { x: 5 }

let cancelTween = sevenTween.to(object, 5, { ease: 'easeInQuad' , x: 16, onUpdate: function (progress) {
    console.log(progress, object.x)
}, onComplete: () => {
    console.log('JAAAAAAAAA')
}, onStart: () => {
    console.log('UHHHHHHUI')
}})

// setTimeout( cancelTween, 2000 )
