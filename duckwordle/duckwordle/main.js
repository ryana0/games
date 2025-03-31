const discography = ["Fuck Your Ethnicity","Hol Up","A.D.H.D","No Make-Up (Her Vice)","Tammys Song (Her Evils)","Chapter Six","Ronald Reagan Era","Poe Mans Dreams (His Vice)","Chapter Ten","Keishas Song (Her Pain)","Rigamortus","Kush & Corinthians","Blow My High (Members Only)","Ab-Souls Outro","HiiiPower","Sherane a.k.a Master Splinters Daughter","Bitch, Dont Kill My Vibe","Backseat Freestyle","The Art of Peer Pressure","Money Trees","Poetic Justice","good kid","m.A.A.d city","Swimming Pools (Drank)","Sing About Me, Im Dying Of Thirst","Real","Compton","The Recipe","Black Boy Fly","Now Or Never","The Recipe (Black Hippy Remix)","Bitch, Dont Kill My Vibe (Remix)","Wesleys Theory","For Free? (Interlude)","King Kunta","Institutionalized","These Walls","u","Alright","For Sale? (Interlude)","Momma","Hood Politics","How Much A Dollar Cost","Complexion (A Zulu Love)","The Blacker The Berry","You Aint Gotta Lie (Momma Said)","i","Mortal Man","untitled 01| 08.19.2014","untitled 02| 06.23.2014","untitled 03| 05.28.2013","untitled 04| 08.14.2014","untitled 05| 09.21.2014","untitled 06| 06.30.2014","untitled 07| 2014-2016","untitled 08| 09.06.2014","BLOOD.","DNA.","YAH.","ELEMENT.","FEEL.","LOYALTY.","PRIDE.","HUMBLE.","LUST.","LOVE.","XXX","FEAR.","GOD.","DUCKWORTH.","United In Grief","N95","Worldwide Steppers","Die Hard"," Father Time","Rich (Interlude)","Rich Spirit","We Cry Together","Purple Hearts","Count Me Out","Crown","Silent Hill","Savior (Interlude)","Savior","Auntie Diaries","Mr. Morale","Mother I Sober","Mirror"]

function randomYeSong() {
    for(i = 0; i < 191; i++) {
        return discography[Math.floor(Math.random() * 191)]
    }
}

window.localStorage.setItem('guessCount', 0)

const yeSong = randomYeSong()
if(!JSON.parse(window.localStorage.getItem('guessCount'))) {
    window.localStorage.setItem('guessCount', 0)
}

console.log(yeSong)

function numStringToNum(string) {
    let stringArray = string.toString().split(',')
    stringArray = stringArray.join('')
    return parseInt(stringArray)
}

async function makeRow(trackName, trackNo, streams, features, album) {
    // console.log('guess: trackNo ' + trackNo, 'streams ' + streams)
    const row = document.createElement('div')
    row.classList.add('gameRow')
    const albumCover = document.createElement('img')
    albumCover.classList.add('cover')
    albumCover.style.content = 'url(./assets/' + album + '.jpg)'
    const tName = document.createElement('h1')
    tName.classList.add('songTitle')
    const tNo = document.createElement('h1')
    tNo.classList.add('trackNo')
    const streamNo = document.createElement('h1')
    streamNo.classList.add('trackLength')
    const featureList = document.createElement('h1')
    featureList.classList.add('features')
    tName.textContent = trackName
    tNo.textContent = trackNo.toString()
    streamNo.textContent = Intl.NumberFormat('en', {notation: 'compact'}).format(parseInt(numStringToNum(streams)))
    if (features == '') {
        featureList.textContent = 'N/A'
    } else {
        featureList.textContent = features
    }

    fetch('./assets/kendrick.json')
    .then((data) => data.json())
    .then((data) => {
        console.log('ohio')
        Object.keys(data).forEach((albumA) => {
            data[albumA].forEach((song) => {
                if(song.trackName == yeSong) { 
                    console.log('ohio')
                    const albumDir = document.createElement('h1')
                    albumDir.classList.add('arrow')
                    const streamsDir = document.createElement('span')
                    const trackNoDir = document.createElement('span')
                    const albumGuessIndex = Object.keys(data).indexOf(album)
                    const actualIndex = Object.keys(data).indexOf(albumA)
                    if (albumGuessIndex > actualIndex) {
                        albumDir.textContent = ' ↓'
                    } else if (albumGuessIndex < actualIndex) {
                        albumDir.textContent = ' ↑'
                    } else {
                        albumDir.textContent = '='
                        albumDir.style.color = '#3da03d'
                    }

                    if (numStringToNum(streams) > numStringToNum(song.streams)) {
                        streamsDir.textContent = ' ↓'
                    } else if (numStringToNum(streams) < numStringToNum(song.streams)) {
                        streamsDir.textContent = ' ↑'
                    } else {
                        streamsDir.textContent = '='
                        streamsDir.style.color = '#3da03d'
                    }

                    if (numStringToNum(trackNo) > numStringToNum(song.trackNo)) {
                        trackNoDir.textContent = ' ↓'
                    } else if (numStringToNum(trackNo) < numStringToNum(song.trackNo)) {
                        trackNoDir.textContent = ' ↑'
                    } else {
                        trackNoDir.textContent = '='
                        trackNoDir.style.color = '#3da03d'
                    }

                    tNo.appendChild(trackNoDir)
                    streamNo.appendChild(streamsDir)
                    row.appendChild(albumDir)
                }
            })
        })
    })

    row.appendChild(albumCover)
    row.appendChild(tName)
    row.appendChild(tNo)
    row.appendChild(streamNo)
    row.appendChild(featureList)

    document.getElementById('game').appendChild(row)
    songGuess.value = ''
}



function autocomplete(inp, arr) {
    var currentFocus;
    inp.addEventListener("input", function(e) {
        var a, b, i, val = this.value;
        closeAllLists();
        if (!val) { return false;}
        currentFocus = -1;
        a = document.createElement("DIV");
        a.setAttribute("id", this.id + "autocomplete-list");
        a.setAttribute("class", "autocomplete-items");
        this.parentNode.appendChild(a);
        for (i = 0; i < arr.length; i++) {
          if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
            b = document.createElement("DIV");
            b.innerHTML = arr[i].substr(0, val.length);
            b.innerHTML += arr[i].substr(val.length);
            b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
                b.addEventListener("click", function(e) {
                inp.value = this.getElementsByTagName("input")[0].value;
                closeAllLists();
            });
            a.appendChild(b);
          }
        }
    });
    inp.addEventListener("keydown", function(e) {
        var x = document.getElementById(this.id + "autocomplete-list");
        if (x) x = x.getElementsByTagName("div");
        if (e.keyCode == 40) {
          currentFocus++;
          addActive(x);
        } else if (e.keyCode == 38) { //up
          currentFocus--;
          addActive(x);
        } else if (e.keyCode == 13) {
          e.preventDefault();
          if (currentFocus > -1) {
            if (x) x[currentFocus].click();
          }
        }
    });
    function addActive(x) {
      if (!x) return false;
      removeActive(x);
      if (currentFocus >= x.length) currentFocus = 0;
      if (currentFocus < 0) currentFocus = (x.length - 1);
      x[currentFocus].classList.add("autocomplete-active");
    }
    function removeActive(x) {
      for (var i = 0; i < x.length; i++) {
        x[i].classList.remove("autocomplete-active");
      }
    }
    function closeAllLists(elmnt) {
      var x = document.getElementsByClassName("autocomplete-items");
      for (var i = 0; i < x.length; i++) {
        if (elmnt != x[i] && elmnt != inp) {
        x[i].parentNode.removeChild(x[i]);
      }
    }
  }
  document.addEventListener("click", function (e) {
      closeAllLists(e.target);
  });
  }

autocomplete(document.getElementById('songGuess'), discography)

const results = document.getElementById('resultsworl')
const yeTitle = document.getElementById('yeTitle')
const yeCover = document.getElementById('yeCover')
const numPlayed = document.getElementById('numPlayed')
const winPercent = document.getElementById('winPercent')

function gameEnd(win) {

    document.getElementById('gameEnd').style.display = 'grid'

    if(!JSON.parse(window.localStorage.getItem('gamesPlayed'))) {
        window.localStorage.setItem('gamesPlayed', JSON.stringify('1'))
    } else {
        window.localStorage.setItem('gamesPlayed', JSON.stringify(Number.parseInt(JSON.parse(window.localStorage.getItem('gamesPlayed'))) + 1))
    }

    if(!JSON.parse(window.localStorage.getItem('wins'))) {
        if (win) {
            window.localStorage.setItem('wins', JSON.stringify('1'))
        }
    } else if (JSON.parse(window.localStorage.getItem('wins')) && win) {
        window.localStorage.setItem('wins', JSON.stringify(Number.parseInt(JSON.parse(window.localStorage.getItem('wins'))) + 1))
    }

    if(!JSON.parse(window.localStorage.getItem('losses'))) {
        if(!win) {
            window.localStorage.setItem('losses', JSON.stringify('1'))
        }
    } else if (JSON.parse(window.localStorage.getItem('wins')) && !win) {
        window.localStorage.setItem('losses', JSON.stringify(Number.parseInt(JSON.parse(window.localStorage.getItem('losses'))) + 1))
    }

    numPlayed.textContent = JSON.parse(window.localStorage.getItem('gamesPlayed'))
    winPercent.textContent = (Number.parseInt(JSON.parse(window.localStorage.getItem('wins'))) / Number.parseInt(JSON.parse(window.localStorage.getItem('gamesPlayed')))).toFixed(1) * 100 + '%'

    if (win) {
        results.textContent = 'YOU WON!'
        results.style.color = '#3da03d'
    } else {
        results.textContent = 'YOU LOST!'
        results.style.color = '#fa5858'
    }

    yeTitle.textContent = yeSong


    fetch('./assets/kendrick.json')
    .then((data) => data.json())
    .then((data) => {
        Object.keys(data).forEach((albumA) => {
            data[albumA].forEach((song) => {
                if(song.trackName == yeSong) {
                    yeCover.style.content = 'url(./assets/' + albumA + '.jpg)'
                }
            })
        })
    })
}

const playAgain = document.getElementById('playAgain')
playAgain.addEventListener('click', () => {
    window.location.reload()
})

const submit = document.getElementById('submit')
submit.addEventListener('click', () => {
    fetch('./assets/kendrick.json')
    .then((data) => data.json())
    .then((data) => {
        Object.keys(data).forEach((album) => {
            data[album].forEach((song) => {
                if(song.trackName.toLowerCase() == songGuess.value.toLowerCase()) {
                    makeRow(song[Object.keys(song)[0]], song[Object.keys(song)[1]], song[Object.keys(song)[2]], song[Object.keys(song)[3]], album)
                }
            })
        })
    })
    if(JSON.parse(window.localStorage.getItem('guessCount')) == 7) {
        gameEnd(false)
    } else {
        window.localStorage.setItem('guessCount', JSON.parse(window.localStorage.getItem('guessCount')) + 1)

    }

    if(songGuess.value == yeSong) {
        gameEnd(true)
    }

})
