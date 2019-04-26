


window.addEventListener("load", () => {
    let container = document.querySelector(".musics-container")
    let playerfooterButton = document.querySelector(".playerButton.footerButton")
    let stopButton = document.querySelector(".stopButton")
    let currentMusicIndex = 0
    let album = {
        musics: [{
            music: "CountingCrows",
            label: "Counting Crows - Mr Jones"
        },{
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
            this.button.innerHTML = '<i class="fas fa-play"></i>Tocar'

            // seting hover
            this.button.addEventListener("mouseover", () => {
                this.musicContainer.style.backgroundColor = "#754F3D"
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
                if(document.querySelector(".footerButton").style.display == ""){
                    Array.prototype.map.call(document.querySelectorAll(".footerButton"), (item) => {
                        item.style = "display: flex"
                    })
                }
                
                if(this.playing === false){
                    // Reset previous button and pause previous music
                   if(currentMusicIndex !== this.key){
                    let previousMusic = document.querySelector(".music" + currentMusicIndex)
                    previousMusic.pause()
                    previousMusic.currentTime = 0
                    let previousButton = previousMusic.parentElement.querySelector("button")
                    previousButton.className = this.button.className = "playerButton playButton"
                    previousButton.innerHTML = this.button.innerHTML = '<i class="fas fa-play"></i>Tocar'
                    currentMusicIndex = this.key
                   }
                    // play the music
                    e.target.parentElement.querySelector("audio").play()
                    this.playing = !this.playing
                    this.button.innerHTML = '<i class="fas fa-pause"></i>Pausar'
                    this.button.className = "playerButton pauseButton"

                    playerfooterButton.innerHTML = '<i class="fas fa-pause"></i>Pausar'
                    playerfooterButton.className = "playerButton pauseButton footerButton"

                    // show the music name in the footer
                    document.querySelector(".musicName").innerHTML = "Tocando: " + album.musics[currentMusicIndex].label
                    
                } else {
                    e.target.parentElement.querySelector("audio").pause()
                    this.button.innerHTML = '<i class="fas fa-play"></i>Tocar'
                    this.button.className = "playerButton playButton"
                    this.playing = !this.playing

                    playerfooterButton.innerHTML = '<i class="fas fa-play"></i>Tocar'
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

    album.musics.map((sound, key) => {
        let music = new Music()
        music.init(sound.music, sound.label, key)
    })

    playerfooterButton.addEventListener("click", () => {
        let currentMusic = document.querySelector(".music" + currentMusicIndex)
        // validation: if music is playing, pause it
        if(!currentMusic.paused){
            currentMusic.pause()
            playerfooterButton.innerHTML = '<i class="fas fa-play"></i>Tocar'
            playerfooterButton.className = "playerButton playButton footerButton"
        } else {
            currentMusic.play()
            playerfooterButton.innerHTML = '<i class="fas fa-pause"></i>Pausar'
            playerfooterButton.className = "playerButton pauseButton footerButton"
        }

    })

    // set the click of stop button placed in the footer
    stopButton.addEventListener("click", () => {
        let currentMusic = document.querySelector(".music" + currentMusicIndex)
        let currentButton = currentMusic.parentElement.querySelector("button")
        if(!currentMusic.paused){
            currentButton.className = "playerButton playButton"
            currentButton.innerHTML = '<i class="fas fa-play"></i>Tocar'
            playerfooterButton.innerHTML = '<i class="fas fa-play"></i>Tocar'
            playerfooterButton.className = "playerButton playButton footerButton"
        }
        currentMusic.currentTime = 0
        currentMusic.pause()
    })
})