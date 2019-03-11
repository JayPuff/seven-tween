console.log(sevenTween)

let person = {
    height: 1
}

person.self = person

sevenTween.fromTo(person, 2, {height: 2}, {height: 6, 
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

// sevenTween.clear(person)

// console.log(person.height)

// sevenTween.setEase('easeInCustom', (x, t, b, c, d) => { return c*t/d + b })

// // Then later...
// sevenTween.to(person, 1.5, {height: 100, ease: 'easeInCustom', onComplete: () => {
//     console.warn(person.height)
// }})

// setTimeout( cancelTween, 2000 )
