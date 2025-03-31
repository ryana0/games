const rappersList = ["2 Chainz","21 Savage","2Hollis","50 Cent","6ix9ine","A Boogie Wit Da Hoodie","A Tribe Called Quest","ASAP Rocky","Ab Soul","Andre 3K","Baby Keem","Biggie","Brent Faiyaz","Bryson Tiller","Busta Rhymes","Cardi B","Central Cee","Chance the Rapper","Chief Keef","Childish Gambino","Common","Cordae","Daniel Caesar","Dave Blunts","Denzel Curry","Destroy Lonely","Diddy","Doechii","Doja Cat","Don Toliver","Dr. Dre","Drake","Eminem","Fetty Wap","Fivio Foreign","Flo Rida","Frank Ocean","Freddie Gibbs","French Montana","Future","G-Eazy","Ghostface Killah","Giveon","Glorilla","Gucci Mane","Gunna","Ice Cube","Ice Spice","Island Boys","J. Cole","JID","Jack Harlow","Jay-Z","Juice Wrld","Kanye West","Ken Carson","Kendrick Lamar","Kid Cudi","Kodak Black","Latto","Lauryn Hill","Lil Baby","Lil Dicky","Lil Durk","Lil Mabu","Lil Mosey","Lil Nas X","Lil Pump","Lil Tecca","Lil Uzi Vert","Lil Wayne","Lil Xan","Lil Yachty","Logic","Ludacris","Lupe Fiasco","MF Doom","Mac Miller","Machine Gun Kelly","Meek Mill","Megan Thee Stallion","Mobb Deep","Moneybagg Yo","Mos Def","NBA Youngboy","NLE Choppa","Nardo Wick","Nas","Nelly","Nettspend","Nicki Minaj","Nipsey Hussle","Offset","PARTYNEXTDOOR","Pharrell Williams","Playboi Carti","Polo G","Pop Smoke","Pusha T","Quavo","Rakim","Rick Ross","Rihanna","Roddy Ricch","SZA","Schoolboy Q","Sexyy Red","Snoop Dogg","Soulja Boy","Steve Lacy","Summer Walker","Swae Lee","Takeoff","The Weeknd","Tom Macdonald","Travis Scott","Tupac","Ty Dolla Sign","Tyga","Vince Staples","Waka Flocka Flame","Westside Gunn","Will Smith","Wu Tang Clan","XXXTentacion","YG","Young Thug","Yuno Miles"]

function removeDuplicates(arr) {
    const nonRepeatingArray = [];

    arr.forEach(item => {
        if (!nonRepeatingArray.includes(item)) {
            nonRepeatingArray.push(item);
        }
    });

    return nonRepeatingArray;
}

function chooseRandomRappers() {
    randRappers = []
    randomRapperIndex = []

    for(i=0;i<5;i++) {
        randomRapperIndex.push(Math.floor(Math.random() * 126))
    }

    randomRapperIndex = removeDuplicates(randomRapperIndex)

    while(removeDuplicates(randomRapperIndex).length !== 5) {
        randomRapperIndex.push(Math.floor(Math.random() * 126))
    }

    for(j=0;j<randomRapperIndex.length;j++) {
        randRappers.push(rappersList[randomRapperIndex[j]])
    }

    return randRappers
}

const randomRappers = chooseRandomRappers()
let currentIndex = []

function nameToFile(name) {
    finalName = name.toLowerCase().split(' ').join('')
    return finalName.split('.').join('')
}

const name1 = document.getElementById('name1')
const name2 = document.getElementById('name2')
const name3 = document.getElementById('name3')
const name4 = document.getElementById('name4')
const name5 = document.getElementById('name5')

const pic1 = document.getElementById('pic1')
const pic2 = document.getElementById('pic2')
const pic3 = document.getElementById('pic3')
const pic4 = document.getElementById('pic4')
const pic5 = document.getElementById('pic5')

const pickName = document.getElementById('pickName')
const pick = document.getElementById('pick')

pickName.textContent = randomRappers[0]
pick.src = './assets/' + nameToFile(randomRappers[0]) + '.jpg'

pick.addEventListener('dragstart', (e) => {
    pick.classList.add('dragging')
})

pick.addEventListener('dragend', (e) => {
    pick.classList.remove('dragging')
})

const but1 = document.getElementById('but1')
const but2 = document.getElementById('but2')
const but3 = document.getElementById('but3')
const but4 = document.getElementById('but4')
const but5 = document.getElementById('but5')

const buts = document.getElementsByClassName('but')
Array.from(buts).forEach(but => {
    but.addEventListener('click', (e) => {
        if(!but.getAttribute('pressed')) {
            butNum = but.id.split('')[3]
            document.getElementById('pic'+ butNum).src = './assets/' + nameToFile(pickName.textContent) + '.jpg'
            document.getElementById('name' +butNum).textContent = pickName.textContent
    
            currentIndex.push('boiii')
    
            if(currentIndex.length == 5) {
                pickName.textContent = 'Play Again'
                pick.src = './assets/replay.png'
                pick.style = 'border: none; cursor: pointer;'
                pickName.style = 'cursor: pointer;'
                pickName.addEventListener('click', (e) => {
                    location.reload()
                })
                pick.addEventListener('click', (e) => {
                    location.reload()
                })
            } else {
                pickName.textContent = randomRappers[currentIndex.length]
                pick.src = './assets/' + nameToFile(randomRappers[currentIndex.length]) + '.jpg'
            }
            
            but.style = 'filter: none; transform: translate(0.4vh, 0.4vh)'
            but.setAttribute('pressed', true)
        }

    })
})

const containers = document.querySelectorAll('.pic')
containers.forEach(container => {
    container.addEventListener('dragover', (e) => {
        e.preventDefault()
    })

    container.addEventListener('drop', (e) => {
        e.preventDefault()
        const draggable = document.querySelector('.dragging')
        if (!document.getElementById('but' + container.id.split('')[3]).getAttribute('pressed')) {
            container.src = draggable.src
        
            currentIndex.push('boiii')

            if(currentIndex.length == 5) {
                pickName.textContent = 'Play Again'
                pick.src = './assets/replay.png'
                pick.style = 'border: none; cursor: pointer;'
                pickName.style = 'cursor: pointer;'
                pickName.addEventListener('click', (e) => {
                    location.reload()
                })
                pick.addEventListener('click', (e) => {
                    location.reload()
                })
            } else {
                document.getElementById('name' + container.id.split('')[3]).textContent = pickName.textContent
                pickName.textContent = randomRappers[currentIndex.length]
                pick.src = './assets/' + nameToFile(randomRappers[currentIndex.length]) + '.jpg'
                
            }
            document.getElementById('but' + container.id.split('')[3]).setAttribute('pressed', true)
            document.getElementById('but' + container.id.split('')[3]).style = 'filter: none; transform: translate(0.4vh, 0.4vh)'
        }
    })
})