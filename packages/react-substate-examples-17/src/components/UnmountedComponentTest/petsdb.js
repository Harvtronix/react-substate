const petsDb = {
    dogs: { name: "Dogs", voice: "Woof!", avatar: "🐶" },
    cats: { name: "Cats", voice: "Miauuu", avatar: "🐱" }
}

function getPet(type) {
    return new Promise(resolve => {
        // simulate a fetch call
        setTimeout(() => {
            resolve(petsDb[type])
        }, 1000)
    })
}

export default petsDb

export {
    petsDb,
    getPet
}
