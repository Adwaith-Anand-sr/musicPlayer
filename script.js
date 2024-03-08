let sourceArray = []
let song = document.querySelector("audio")
let list = document.querySelector(".list")
let elems = document.querySelectorAll(".list .elem")
let playBtn = document.querySelector(".playBtn")
let pauseBtn = document.querySelector(".pauseBtn")
let playPause = document.querySelector(".playPause")
let playAnimContainer = document.querySelector(".playAnim-container")
let musicPlayLines = document.querySelectorAll(".playAnim-container span")
let swipeControls = document.querySelector(".swipe-controls")
let swipeBound = swipeControls.getBoundingClientRect()
let numberOfSongs 
let currentPlaying , currentSongId
let textIndex=0
const scroll = new LocomotiveScroll({
    el: document.querySelector('.list'),
    smooth: true
});

confirm("3")

function randomBgImg() {
   let array=[
      "Images/images (1).jpeg",
      "Images/images (2).jpeg",
      "Images/images (3).jpeg"
   ]
   let random = Math.floor(Math.random()*3)
   let backgroundImages = document.querySelector(".imageDisplay")
   backgroundImages.style.backgroundImage = `url('${array[random]}')`
}
randomBgImg()

function loop() {
   // looping through Music folder and getting names of each files
   const owner = 'adwaith-anand-sr';
   const repo = 'musicPlayer';
   const path = 'Music';
   
   async function loopThroughFolder() {
      
     try {
       const response = await fetch(`https://api.github.com/repos/${owner}/${repo}/contents/${path}`);
       const data = await response.json();
       for (const item of data) {
         sourceArray.push("Music/"+item.name);
       }
     } catch (error) {
       console.error('Error fetching folder contents:', error);
     }
   }
   loopThroughFolder();

}
loop()

function listingSongs() {
   setTimeout(function() {
      numberOfSongs= sourceArray.length
      sourceArray.forEach((item,i)=>{
         list.innerHTML += `
            <div class ="elem ${i}" id="${i}">
               <div class="img" id="${i}"></div>
               <h3 id="${i}">${item.replace("Music/","").replace(/_/g, " ")}</h3>
               <div class="playAnim-container">
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
               </div>
            </div>
         `
      })
   }, 1000);
}
listingSongs()

let oldElemIndex, songsPlayed =0, animStarted = false

function playingAnimSetting(id) {
   let playAnimCont = document.querySelectorAll(".playAnim-container")
   playAnimCont.forEach((item,i)=>{
      item.style.display="none"
      if (i==id) {
         item.style.display="flex"
      }
   })
   musicPlayLines.forEach((item,i)=>{
      item.style.left = ( i * 25) + "%"
      item.style.marginLeft = "1%"
   })
   elems.forEach((item,i)=>{
      item.style.color = "white"
      if (i==id) {
         item.style.color = "#c40505"
      }
   })
   
}

list.addEventListener("click", (e)=>{
   song.src = sourceArray[e.target.id]
   currentSongId = e.target.id
   song.play()
   playBtn.style.display= "none"
   pauseBtn.style.display= "block"
   document.querySelector(".imageDisplay .songName").textContent=""
   textIndex=0
   currentPlaying= sourceArray[e.target.id].replace("Music/","").replace(/_/g," ")
   typeWriter()
   playingAnimSetting(e.target.id)
})

function typeWriter() {
   const container = document.querySelector(".imageDisplay .songName");
   if (textIndex < currentPlaying.length) {
    container.textContent += currentPlaying.charAt(textIndex);
    textIndex++;
    setTimeout(typeWriter, 25); // Adjust typing speed here (milliseconds)
   }
}

function playPlauseEvent() {
   playPause.addEventListener("click", ()=>{
      if (song.src.includes("/null")) {
         let r = Math.floor(Math.random()* (numberOfSongs-1))
         song.src = sourceArray[r]
         song.play()
         currentSongId = r
         playBtn.style.display= "none"
         pauseBtn.style.display= "block"
         document.querySelector(".imageDisplay .songName").textContent=""
         currentPlaying= sourceArray[r].replace("Music/","").replace(/_/g," ")
         typeWriter()
         playingAnimSetting(r)
      }
      else if (song.paused) {
         console.log('Audio is not playing.');
         playBtn.style.display= "none"
         pauseBtn.style.display= "block"
         song.play()
      } else {
         playBtn.style.display= "block"
         pauseBtn.style.display= "none"
         song.pause()
      }
   });
}
playPlauseEvent()

function swipeControl(){
   let x1 , x2
   swipeControls.addEventListener("touchstart", (e)=>{
      x1 = e.touches[0].screenX
   })
   swipeControls.addEventListener("touchend", (e)=>{
      x2 = e.changedTouches[0].screenX
      setTimeout(()=>{
         if(x1 - x2 < -(swipeBound.width/2)){
            changeSong(1) //next song
         }else if(x1 - x2 > (swipeBound.width/2)){
            changeSong(-1) //previus song
         }
      },1000)
   })
}
swipeControl()

// function changeSong(a) {
//    if (a==1) {
//       let id = Number(currentSongId) +1
//       song.src = sourceArray[id]
//       song.play()
//       currentPlaying= sourceArray[id].replace("Music/","").replace(/_/g," ")
//       currentSongId = id
//       document.querySelector(".imageDisplay .songName").textContent=""
//       textIndex=0
//       typeWriter()
//       playingAnimSetting(id)
//    }else {
//       alert(id)
//       if (id == 0) {
//          id = sourceArray.length-1
//          confim(id)
//       }else {
//          let id = Number(currentSongId) -1
//       }
//       song.src = sourceArray[id]
//       song.play()
//       currentPlaying= sourceArray[id].replace("Music/","").replace(/_/g," ")
//       currentSongId = id
//       document.querySelector(".imageDisplay .songName").textContent=""
//       textIndex=0
//       typeWriter()
//       playingAnimSetting(id)
//    }
// }

function changeSong(a) {
   if (a==1) {
      let id = Number(currentSongId) +1
   }else if(a==-1){
      let id = Number(currentSongId) -1
   }
   setTimeout(function() {
      song.src = sourceArray[id]
      song.play()
      currentPlaying= sourceArray[id].replace("Music/","").replace(/_/g," ")
      currentSongId = id
      document.querySelector(".imageDisplay .songName").textContent=""
      textIndex=0
      typeWriter()
      playingAnimSetting(id)
      setTimeout(function() {
         if (audio.readyState !== 4) { // Check if song is not fully loaded (4 represents HAVE_ENOUGH_DATA)
            changeSong(1)
         }
      }, 5000);
   }, 100);
}


song.addEventListener("ended", ()=>{
   changeSong(1)//forward
})