

let container = document.querySelector(".musics-container")
let playerfooterButton = document.querySelector(".playerButton.footerButton")
let footer = document.querySelector("footer")
let nextButton = document.querySelector(".nextButton")
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
                    let previousMusic = document.querySelector(".music" + currentMusicIndex)
                    previousMusic.pause()
                    previousMusic.currentTime = 0
                    let previousButton = previousMusic.parentElement.querySelector("button")
                    previousButton.className = this.button.className = "playerButton playButton"
                    previousButton.innerHTML = this.button.innerHTML = '<i class="fas fa-play"></i>'
                    currentMusicIndex = this.key
                }
                // play the music
                e.target.parentElement.querySelector("audio").play()
                this.playing = !this.playing
                this.button.innerHTML = '<i class="fas fa-pause"></i>'
                this.button.className = "playerButton pauseButton"

                playerfooterButton.innerHTML = '<i class="fas fa-pause"></i>'
                playerfooterButton.className = "playerButton pauseButton footerButton"

                // show the music name in the footer
                document.querySelector(".musicName").innerHTML = "Tocando: " + album.musics[currentMusicIndex].label

            } else {
                e.target.parentElement.querySelector("audio").pause()
                this.button.innerHTML = '<i class="fas fa-play"></i>'
                this.button.className = "playerButton playButton"
                this.playing = !this.playing

                playerfooterButton.innerHTML = '<i class="fas fa-play"></i>'
                playerfooterButton.className = "playerButton playButton footerButton"
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
    let currentButton = currentMusic.parentElement.querySelector("button")
    // validation: if music is playing, pause it
    if (!currentMusic.paused) {
        currentMusic.pause()
        playerfooterButton.innerHTML = '<i class="fas fa-play"></i>'
        playerfooterButton.className = "playerButton playButton footerButton"
        currentButton.innerHTML = '<i class="fas fa-play"></i>'
        currentButton.className = "playerButton playButton footerButton"

    } else {
        currentMusic.play()
        playerfooterButton.innerHTML = '<i class="fas fa-pause"></i>'
        playerfooterButton.className = "playerButton pauseButton footerButton"
        currentButton.innerHTML = '<i class="fas fa-pause"></i>'
        currentButton.className = "playerButton pauseButton footerButton"
    }

})

// set the click of stop button placed in the footer
stopButton.addEventListener("click", () => {
    // catching current Music
    let currentMusic = document.querySelector(".music" + currentMusicIndex)
    // catching the current music's button
    let currentButton = currentMusic.parentElement.querySelector("button")
    // validation: if current music is playing
    currentButton.className = "playerButton playButton"
    currentButton.innerHTML = '<i class="fas fa-play"></i>'
    footer.style.display = "none"
    currentMusic.pause()
    currentMusic.currentTime = 0
})


// want to fix
console.log(document.querySelector(".musicName").style.width)
document.querySelector(".musicName").style.width = `calc(100% - ${window.getComputedStyle(document.querySelector(".controlButtons")).width}`
