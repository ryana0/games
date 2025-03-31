const fs = require('fs')
const kanye = JSON.parse(fs.readFileSync('./kanye.json'))
const discography = []

Object.keys(kanye).forEach((album) => {
    kanye[album].forEach((song) => {
        discography.push(song.trackName)
    })
})

fs.writeFileSync('./discography.json', JSON.stringify(discography))