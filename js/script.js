
window.addEventListener("load",() => {
    let controlButtons = document.querySelector(".controlButtons")
    let container = document.querySelector(".musics-container")
    let stopButton = document.querySelector(".stopButton")
    let pauseButton = document.querySelector(".playerButton")
    let currentMusicIndex = 0
    let album ={
        musics: [{
            music: "CountingCrows",
            label: "Counting Crows - Mr Jones"
        },{
            music: "MatchboxTwenty",
            label: "Matchbox Twenty - Push"
        }]
    }

    album.musics.map((music,key) => {
        // Set music container
        let musicContainer = document.createElement("div")
        musicContainer.className = "music-container"

        // Set Audio
        let sound = document.createElement("audio")
        sound.src = "./musics/" + music.music + ".mp3"
        sound.className = "music" + key

        // Set playButton
        let playButton = document.createElement("button")
        playButton.className = "playButton play" + key
        playButton.innerHTML = '<i class="fas fa-play"></i>Tocar'
        playButton.addEventListener("mouseover",() => {
            musicContainer.style.backgroundColor = "#754F3D"
        })
        playButton.addEventListener("mouseout",() => {
            musicContainer.style.backgroundColor = "transparent"
        })
        
        playButton.addEventListener("click",() => {
            sound.play()
            currentMusicIndex = key;
            pauseButton.innerHTML = '<i class="fas fa-pause"></i>Pausar'
            pauseButton.className = "playerButton pauseButton"
            if(document.querySelector(".musicName") === null){
                let labelName = document.createElement("label")
                labelName.className = "musicName"
                labelName.innerHTML = "Tocando: " + album.musics[currentMusicIndex].label
                controlButtons.appendChild(labelName)
            } else {
                document.querySelector(".musicName").innerHTML = "Tocando: " + album.musics[currentMusicIndex].label
            }
            album.musics.map((item,key) => {
                if(key === currentMusicIndex)
                    return
                document.querySelector(".music" + key).pause()
                document.querySelector(".music" + key).currentTime = 0
            })
        })

        // Add music container into pattern
        container.appendChild(musicContainer)

        // Set the music's name
        musicContainer.innerHTML = '<p class="music-name">' + music.label + '</p>'

        // Set the music container's child
        musicContainer.appendChild(sound)
        musicContainer.appendChild(playButton)

    })

    stopButton.addEventListener("click", () => {
        let currentMusic = document.querySelector(".music" + currentMusicIndex)
        currentMusic.currentTime = 0
        if(document.querySelector(".musicName") !== null)
            controlButtons.removeChild(document.querySelector(".musicName"))
        currentMusic.pause()
        
    })

    pauseMusic = () => {
        document.querySelector(".music" + currentMusicIndex).pause()
    }

    playMusic = () => {
        if(document.querySelector(".musicName") === null){
            let labelName = document.createElement("label")
            labelName.className = "musicName"
            labelName.innerHTML = "Tocando: " + album.musics[currentMusicIndex].label
            controlButtons.appendChild(labelName)
        } else {
            document.querySelector(".musicName").innerHTML = "Tocando: " + album.musics[currentMusicIndex].label
        }
        document.querySelector(".music" + currentMusicIndex).play()
    }


    pauseButton.addEventListener("click", () => {
            let currentMusic = document.querySelector(".music" + currentMusicIndex)
            if(pauseButton.className === "playerButton pauseButton"){
                pauseButton.innerHTML = '<i class="fas fa-play"></i>Tocar'
                pauseButton.className = "playerButton playButton"
                pauseButton.addEventListener("click", this.playMusic)
            } else {
                pauseButton.innerHTML = '<i class="fas fa-pause"></i>Pausar'
                pauseButton.className = "playerButton pauseButton"
                pauseButton.addEventListener("click", this.pauseMusic)
            }
        
    })
})