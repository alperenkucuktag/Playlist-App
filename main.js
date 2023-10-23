const prevButton=document.getElementById("prev")
const nextButton=document.getElementById("next")
const repeatButton=document.getElementById("repeat")
const shuffleButton=document.getElementById("shuffle")
const audio=document.getElementById("audio")
const songImage=document.getElementById("song-image")
const songName=document.getElementById("song-name")
const songArtist=document.getElementById("song-artist")
const pauseButton=document.getElementById("pause")
const playButton=document.getElementById("play")
const playlistButton=document.getElementById("playlist")
const maxDuration=document.getElementById("max-duration")
const currentTimeRef=document.getElementById("current-time")
const progressBar=document.getElementById("progress-bar")
const playlistContainer=document.getElementById("playlist-container")
const closeButton=document.getElementById("close-button")
const playlistSongs=document.getElementById("playlist-songs")
const currentProgress=document.getElementById("current-progress")
//indis

let index

//tekrar
let loop

//decode and parse
const songList=[
    {name:"Everything i wanted",
     link:"assets/billie eilish.mp3",
     artist:"Billie Eilish",
     image:"assets/bil.jpg"
    },
    {name:"Playing God",
     link:"assets/polyphia-playingGod.mp3",
     artist:"Polyphia",
     image:"assets/POLY.jpg"
    },
    {name:"Yalan",
     link:"assets/kiraç.mp3",
     artist:"Ali Tufan Kıraç",
     image:"assets/Kirac.jpg",
    },
    {name:"Chop Suey",
     link:"assets/Chop Suey System of Down.mp3",
     artist:"System Of Down",
     image:"assets/System oF down Album.jpg"
    },
    {name:"White Rabbit",
     link:"assets/White rabbit.mp3",
     artist:"Jeferson Airplane",
     image:"assets/jeffers.jpg",
    }



]

//events object
let events = {
    mouse:{
        click:"click"
    },
    touch:{
        click:"touchstart"
    }
}

let deviceType= ""

const isTouchDevice=()=>{
    try{
        document.createEvent("TouchEvent")
        deviceType="touch"
        return true

    }catch(error){
        deviceType="mouse"
        return false

    }
}

//Time Formatter java script özelliği 

const timeFormatter=(timeInput)=>{
    let minute=Math.floor(timeInput/60)

    minute=minute<10 ? "0" + minute : minute
    let second= Math.floor(timeInput % 60)
    second=second <10 ? "0" + second : second
    return `${minute}:${second}`
}

//set song

const setSong=(arrayIndex)=>{
   //All options
   console.log(arrayIndex)
   
   //destruction
   let{name,link,artist,image}=songList[arrayIndex]
   audio.src = link
   songName.innerHTML = name
   songArtist.innerHTML = artist
   songImage.src = image


   //show time

   audio.onloadedmetadata = () => {
    maxDuration.innerText=timeFormatter(audio.duration)//320saniye gibi

   }
   playlistContainer.classList.add("hide")
   playAudio()
  
}
//play audio

const playAudio = ()=>{
    audio.play()
    pauseButton.classList.remove("hide")//görün
    playButton.classList.add("hide") //kaybol
}

// song repeat

repeatButton.addEventListener("click",()=>{
    if (repeatButton.classList.contains("active")) {
        repeatButton.classList.remove("active")
        audio.loop=false
        console.log("tekrar kapalı");
    }else{
        repeatButton.classList.add("active")
        audio.loop=true
        console.log("tekrar acik");
    }
})
//next song
const nextSong=()=>{
    //eger döngü açık çalıyorsa
    if (loop) {
        if (index == (songList.length - 1)) {
            //sondaysa başa sar
            index=0
  
        }else{
            index += 1
        }

        setSong(index)
        
        
    }else{
        let randIndex=Math.floor(Math.random() *songList.length)
        console.log(randIndex);
        setSong(randIndex)

    }
    playAudio()
}

//şarkıyı durdur

const pauseAudio=()=>{
    audio.pause()
    pauseButton.classList.add("hide")
    playButton.classList.remove("hide")

}

//onceki sarkı

const previousSong=()=>{
    if (index > 0) {
        pauseAudio()
        index -= 1

        
    }else{
        index = songList.length - 1
    }
    setSong(index)
    playAudio()
}
//next song

audio.onended = () => {
    nextSong()
}

//shuffle songs

shuffleButton.addEventListener("click",()=>{
    if (shuffleButton.classList.contains("active")) {
        shuffleButton.classList.remove("active")
        loop=true
        console.log(("karistirma kapali"));

        
    }else{
        shuffleButton.classList.add("active")
        loop=false
        console.log(("karistirma acik"));
    }
})
//play button

playButton.addEventListener("click", playAudio)
//next button

nextButton.addEventListener("click",nextSong)

//prev button

prevButton.addEventListener("click",previousSong)

//pauseButton
pauseButton.addEventListener("click",pauseAudio)

isTouchDevice()
progressBar.addEventListener(events[deviceType].click, (event) => {
    let coordStart=progressBar.getBoundingClientRect().left

    //fare ile dokunma durumu

    let coordEnd = !isTouchDevice() ? event.clientX : event.touches[0].clientX
    let progress=(coordEnd - coordStart) /progressBar.offsetWidth

    //genisligi ata
    currentProgress.style.width=progress*100 + "%"

    //zamanı atama 
    audio.currentTime=progress*audio.duration

    //oynat

    audio.play()
    pauseButton.classList.remove("hide")
    playButton.classList.add("hide")
})

//zaman aktıkca gücelle
setInterval(()=>{
    currentTimeRef.innerHTML=timeFormatter(audio.currentTime)
    currentProgress.style.width=(audio.currentTime / audio.duration.toFixed(3))*100 + "%"
}, 1000)

//zaman güncellemesi

audio.addEventListener("timeupdate",()=>{
    currentTimeRef.innerText=timeFormatter(audio.currentTime)
})
window.onload = ()=>{
    index = 0
    setSong(index)
    initPlayList()
}
const initPlayList= ()=>{
  for (let i in songList) {
    playlistSongs.innerHTML += `<li class="playlistSong"
    onclick="setSong(${i})">
    <div class="playlist-image-container">

    <img src="${songList[i].image}"/>
    </div>
    <div class="playlist-song-details">
      <span id="palylist-song-name">
      ${songList[i].name}
      </span>
      <span id="playlist-song-album">
      ${songList[i].artist}
      </span>
    </div>
    
    </li>`
  
  }
    

}

//sarki listesini
playlistButton.addEventListener("click",()=>{
    playlistContainer.classList.remove("hide")
})
