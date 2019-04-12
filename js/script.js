
window.addEventListener("load",() => {
    let container = document.querySelector(".musics-container")
    let album ={
        musics: [{
            music: "CountingCrows",
            label: "Counting Crows - Mr Jones"
        },{
            music: "MatchboxTwenty",
            label: "Matchbox Twenty - Push"
        }]
    }
    for(music of album.musics){
        // Set music container
        let musicContainer = document.createElement("div")
        musicContainer.className = "music-container"

        // Set Audio
        let sound = document.createElement("audio")
        sound.src = "./musics/" + music.music + ".mp3"

        // Set playButton
        let playButton = document.createElement("button")
        playButton.className = "playButton"
        playButton.innerHTML = '<i class="fas fa-play"></i>Tocar'
        playButton.addEventListener("click",() => {
            sound.play();
        })

        // Add music container into pattern
        container.appendChild(musicContainer)

        // Set the music's name
        musicContainer.innerHTML = '<p class="music-name">' + music.label + '</p>'

        // Set the music container's child
        musicContainer.appendChild(sound)
        musicContainer.appendChild(playButton)
        musicContainer.appendChild(stopButton)
    }
})