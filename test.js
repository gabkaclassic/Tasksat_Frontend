const l = [
    {
        id: 2,
        name: 'BOLE'
    },
    {
        id: 22,
        name: 'BOLE'
    },
    {
        music: 'ROCK',
        age: 12
    },
]

const o =     {
    music: 'ROCK',
    age: 12
}

const ind = l.indexOf(o)

l.splice(ind, 1)

console.log(l);