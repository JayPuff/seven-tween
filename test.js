console.log(sevenTween)

let object = { x: 5, r: null }
object.r = object

let cancelTween = sevenTween.to(null, 5, { ease: 'easeInQuad' , x: 16, onUpdate: function (progress) {
    console.log(progress, object.x)
}, onComplete: () => {
    console.log('JAAAAAAAAA')
}, onStart: () => {
    console.log('UHHHHHHUI')
}})

// setTimeout( cancelTween, 2000 )
