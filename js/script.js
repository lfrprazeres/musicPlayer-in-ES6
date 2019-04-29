

let container = document.querySelector(".musics-container")
let playerfooterButton = document.querySelector(".playerButton.footerButton")
let footer = document.querySelector("footer")
let nextButton = document.querySelector(".nextButton")
let previousButton = document.querySelector(".previousButton")
let stopButton = document.querySelector(".stopButton")
let currentMusicIndex = 0
let album = {
    musics: [{
        music: "CountingCrows",
        label: "Counting Crows - Mr Jones"
    }, {
        music: "MatchboxTwenty",
        label: "Matchbox Twenty - Push"
    }]
}

//generic play
function play(){
    // catching current Music
    let currentMusic = document.querySelector(".music" + currentMusicIndex)
    // catching the current music's button
    let currentButton = currentMusic.parentElement.querySelector("button")
    // stop the current music to change it
    currentMusic.play()
    updateLine(currentMusic,currentMusic.duration)
    currentButton.innerHTML = '<i class="fas fa-pause"></i>'
    currentButton.className = "playerButton pauseButton"
    playerfooterButton.className = "playerButton pauseButton"
    playerfooterButton.innerHTML = '<i class="fas fa-pause"></i>'
    // show the music name in the footer
    document.querySelector(".musicName").innerHTML = "Tocando: " + album.musics[currentMusicIndex].label
}

// function to update the footer line (music duration)
function updateLine(audioActual,audioDuration){
    setTimeout(() => {
    let line = document.querySelector(".musicDuration")
    // calculate the line percent
    let percent = (100 * audioActual.currentTime) / audioDuration
    line.style.width = `${percent}%`
    if(audioActual !== audioDuration && !document.querySelector(".music" + currentMusicIndex).paused){
        updateLine(audioActual,audioDuration)
    }
    },100)
}

//generic pause
function pause(){
    // catching current Music
    let currentMusic = document.querySelector(".music" + currentMusicIndex)
    // catching the current music's button
    let currentButton = currentMusic.parentElement.querySelector("button")
    // stop the current music to change it
    currentMusic.pause()
    currentButton.innerHTML = '<i class="fas fa-play"></i>'
    currentButton.className = "playerButton playButton footerButton"
    playerfooterButton.className = "playerButton playButton"
    playerfooterButton.innerHTML = '<i class="fas fa-play"></i>'
}


//generic stop
function stop(){
    // catching current Music
    let currentMusic = document.querySelector(".music" + currentMusicIndex)
    // catching the current music's button
    let currentButton = currentMusic.parentElement.querySelector("button")
    // stop the current music to change it
    currentMusic.pause()
    currentMusic.currentTime = 0
    currentButton.innerHTML = '<i class="fas fa-play"></i>'
    currentButton.className = "playerButton playButton footerButton"
    playerfooterButton.className = "playerButton playButton"
    playerfooterButton.innerHTML = '<i class="fas fa-play"></i>'
}

// footer stop
function footerStop(){
    stop()
    footer.style.display = "none"
}

class Music {
    constructor() {
        // Creating musicContainer
        this.musicContainer = document.createElement("div")
        this.musicContainer.className = "music-container"

        // Creating sound
        this.sound = document.createElement("audio")

        // Creating play Button
        this.button = document.createElement("button")
        this.button.innerHTML = '<i class="fas fa-play"></i>'

        // seting hover
        this.button.addEventListener("mouseover", () => {
            this.musicContainer.style.backgroundColor = "#333"
        })
        this.button.addEventListener("mouseout", () => {
            this.musicContainer.style.backgroundColor = "transparent"
        })

        // validation to playing
        this.playing = false

        // creating a p to put the music name
        this.musicName = document.createElement("p")

        this.musicContainer.appendChild(this.musicName)
        this.musicContainer.appendChild(this.button)
        this.musicContainer.appendChild(this.sound)

        // the key(number) of the music
        this.key

        // set button to play or pause the music
        this.button.addEventListener("click", (e) => {
            if (footer.style.display == "" || footer.style.display == "none") {
                footer.style.display = "flex"
            }

            if (this.playing === false) {
                // Reset previous button and pause previous music
                if (currentMusicIndex !== this.key) {
                    stop()
                    currentMusicIndex = this.key
                }
                // play the music
                play()
                this.playing = !this.playing

            } else {
                pause()
                this.playing = !this.playing
            }
        })
    }

    init = (music, name, key) => {
        // set the key(number) of the music
        this.key = key

        // set the sound tag className and source
        this.sound.className = "music" + key
        this.sound.src = "./musics/" + music + ".mp3"

        //Set PlayButton className
        this.button.className = "playButton play" + key

        // put a name in the musicContainer
        this.musicName.innerHTML = name

        // Add music container into pattern
        container.appendChild(this.musicContainer)
    }

}

// init the musics
album.musics.map((sound, key) => {
    let music = new Music()
    music.init(sound.music, sound.label, key)
})

// set the click event to pause or play the current music in the footer's player button
playerfooterButton.addEventListener("click", () => {
    let currentMusic = document.querySelector(".music" + currentMusicIndex)
    // validation: if music is playing, pause it
    if (!currentMusic.paused) {
        pause()

    } else {
        play()
    }

})

// set the click of stop button placed in the footer
stopButton.addEventListener("click", () => {
    footerStop()
})

// set the previous button event on the footer
previousButton.addEventListener("click", () => {
    stop()
    // validation: if is the first music change for the last
    if(currentMusicIndex === 0){
        currentMusicIndex = album.musics.length - 1
    } else {
        currentMusicIndex -= 1
    }
    play()
})

// set the next button event on the footer
nextButton.addEventListener("click", () => {
    stop()
    // validation: if is the first music change for the last
    if(currentMusicIndex === album.musics.length - 1){
        currentMusicIndex = 0
    } else {
        currentMusicIndex += 1
    }
    play()
})


// need to fix
console.log(document.querySelector(".musicName").style.width)
document.querySelector(".musicName").style.width = `calc(100% - ${window.getComputedStyle(document.querySelector(".controlButtons")).width}`
