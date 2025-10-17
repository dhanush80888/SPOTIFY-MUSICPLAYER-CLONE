

console.log("Hey i am starting Javascript")
let currentsong = new Audio();
let songs;
let currFolder;
let index;
let songindex;
let ps;
async function getsongs(folder) {
    currFolder = folder;
    let a = await fetch(`http://127.0.0.1:5500/songs/${currFolder}/`);
    let response = await a.text();
    let div = document.createElement("div")
    div.innerHTML = response;
    let as = div.getElementsByTagName("a")
    songs = [];
    for (let index = 0; index < as.length; index++) {
        const element = as[index];
        if (element.href.endsWith(".mp3")) {
            songs.push(element.href)
        }
    }
    playMusic(songs[0].split(`/${currFolder}/`)[1].replaceAll("%20", " "), true)
    let songUL = document.querySelector(".songslist").getElementsByTagName("ul")[0];
    songUL.innerHTML = "";
    for (const song of songs) {
        songUL.innerHTML = songUL.innerHTML + `<li>
        <img src="img/music.svg" alt="">
        <div class="info">
            <div>${song.split(`/${currFolder}/`)[1].replaceAll("%20", " ")}</div>
            <div style="font-size: 11px;">Dhanush</div>
        </div>
        </li>`;
    }
    //attch eventlistener to all songs
    Array.from(document.querySelector(".songslist").getElementsByTagName("li")).forEach(e => {
        e.addEventListener("click", element => {
            let songname = e.querySelector(".info").firstElementChild.innerHTML.trim()
            playMusic(songname)
        })
    })
    return songs;

}

async function displayAlbumb() {
    let a = await fetch(`http://127.0.0.1:5500/songs`);
    let response = await a.text();
    let div = document.createElement("div")
    div.innerHTML = response;
    let as = div.getElementsByTagName("a")
    let card_container = document.querySelector(".cards");
    for (let i = 0; i < as.length; i++) {
        if (as[i].href.includes("/songs/")) {
            let folder = as[i].href.split("/songs/")[1].split("/")[0]

            //get the meta data from the folder
            let a = await fetch(`songs/${folder}/info.json`);
            let response = await a.json();
            card_container.innerHTML = card_container.innerHTML + `<div data-folder="${folder}" class="card ">
                            <svg class="greenplay" width="100" height="100" viewBox="0 0 100 100"
                                xmlns="http://www.w3.org/2000/svg">
                                <circle cx="50" cy="50" r="48" fill="#39DE74" />
                                <polygon points="40,30 70,50 40,70" fill="black" />
                            </svg>

                            <img src="http://127.0.0.1:5500/songs/${folder}/cover.jpg" alt="">
                            <h2 class="big-font">${response.title}</h2>
                            <p class="small-font light-color">${response.description}</p>
                        </div>`
        }

    }

    //add eventlistener to add songs from card_Albumb to songs_list whenever it is clicked
    Array.from(document.getElementsByClassName("card")).forEach(async e => {
        e.addEventListener("click", async () => {
            songs = await getsongs(e.dataset.folder);
            play.src = "img/play.svg"
            playMusic(songs[0].split(`/${currFolder}/`)[1].replaceAll("%20", " "))
        })
    })



}
displayAlbumb();
main()

function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
}

function playMusic(songname, pause = false) {

    if (ps) {
        songindex.style.color = "white"
    }
    currentsong.src = `/songs/${currFolder}/` + songname
    if (!pause) {
        currentsong.play()
        play.src = "img/pause.svg"
    }
    document.querySelector(".songinfo").innerHTML = songname

    index = songs.indexOf(currentsong.src)
    songindex = document.querySelector(".songslist").getElementsByTagName("ul")[0].getElementsByTagName("li")[index]
    songindex.style.color = "#fc6666"
    ps = songindex;
}

async function main() {
    await getsongs("Dhanush_songs")


    //Attach eventlistener to play
    play.addEventListener("click", () => {
        if (currentsong.paused) {
            play.src = "img/pause.svg"
            currentsong.play()
        }
        else {
            play.src = "img/play.svg"
            currentsong.pause()
        }
    })

    // updating time of song and duration of song
    currentsong.addEventListener("timeupdate", () => {
        document.querySelector(".songtime").innerHTML = formatTime(currentsong.currentTime) + " / " + formatTime(currentsong.duration)
        document.querySelector(".circle").style.left = (currentsong.currentTime / currentsong.duration) * 100 + "%"
        document.querySelector(".circleseekbar").style.width = (currentsong.currentTime / currentsong.duration) * 100 + "%";
    })

    // add event listener to seekbar
    let seekbar = document.querySelector(".seekbar")
    seekbar.addEventListener("click", (e) => {
        let percent = (e.offsetX / seekbar.getBoundingClientRect().width) * 100
        document.querySelector(".circle").style.left = percent + "%";
        document.querySelector(".circleseekbar").style.width = percent + "%";
        currentsong.currentTime = ((currentsong.duration) * percent) / 100;
    })

    //add event listener to play the next song when the song is completed)
    currentsong.addEventListener("ended", (e) => {
        console.log("song is completed")
        let index = songs.indexOf(currentsong.src)
        index += 1
        if (index < songs.length) {

            playMusic(songs[index].split(`/${currFolder}/`)[1].replaceAll("%20", " "))
        }
        else {
            playMusic(songs[0].split(`/${currFolder}/`)[1].replaceAll("%20", " "))
        }
    })

    //marking red color text for song which is playing
    // currentsong.addEventListener("play", () => {
    //     let index = songs.indexOf(currentsong.src)
    //     let songindex = document.querySelector(".songslist").getElementsByTagName("ul")[0].getElementsByTagName("li")[index]
    //     songindex.style.color = "red"

    //     // document.querySelector(".songslist").style.color="red"
    // })

    //add event listener to hamburger
    document.querySelector(".hamburger").addEventListener("click", () => {
        document.querySelector(".left").style.left = "0";
    })

    //add event listener to cancel btn
    document.querySelector(".cross").addEventListener("click", () => {
        document.querySelector(".left").style.left = "-100%"
    })

    //add Eventlistener to previous button
    previous.addEventListener("click", () => {
        console.log("Previous clicked")
        let index = songs.indexOf(currentsong.src)
        index -= 1
        if (index >= 0) {
            playMusic(songs[index].split(`/${currFolder}/`)[1].replaceAll("%20", " "))

        }
    })
    //add Eventlistener to next button
    next.addEventListener("click", () => {
        console.log("Next clicked")
        let index = songs.indexOf(currentsong.src)
        index += 1
        if (index < songs.length) {

            playMusic(songs[index].split(`/${currFolder}/`)[1].replaceAll("%20", " "))
        }
    })

    //add event listener to volume
    let inputrange = document.querySelector(".range").getElementsByTagName("input")[0];
    inputrange.addEventListener("change", (e) => {
        console.log("volume changed to " + e.target.value)
        currentsong.volume = (e.target.value) / 100
        if(e.target.value==0){
            mute.src="img/mute.svg"
        }
        else{
            mute.src="img/volume.svg"
        }
    })

    //add event listener to mute the volume
    let mute = document.querySelector(".volume img")
    mute.addEventListener("click", () => {
        if (mute.src.includes("volume.svg")) {
            mute.src = "img/mute.svg"
            inputrange.value = 0
            currentsong.volume = 0
        }
        else {
            mute.src = "img/volume.svg"
            inputrange.value = 40
            currentsong.volume = 0.4
        }
    })

    // currentsong.addEventListener("change", (e) => {
    //     console.log(currentsong.volume)
    // })

    //add eventlistener to add songs from card_Albumb to songs_list whenever it is clicked
    // Array.from(document.getElementsByClassName("card")).forEach(async e => {
    //     e.addEventListener("click", async () => {
    //         console.log(e.dataset.folder)
    //         await getsongs(e.dataset.folder);

    //     })
    // })


}



