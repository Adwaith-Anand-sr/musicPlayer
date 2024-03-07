let sourceArray = []
let song = document.querySelector("audio")
let list = document.querySelector(".list")
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

confirm("4")

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
            </div>
         `
      })
   }, 1000);
}
listingSongs()

let elemIndex, songsPlayed =0
function playingAnimSetting(id) {
   let elems = document.querySelectorAll(".elem")
   songsPlayed++
   if (songsPlayed >=2) {
      elem.forEach((item,i)=>{
         if(elemIndex == i){
            item.removeChild(document.querySelector(".playAnim-container"))
         }
      })
   }
    musicPlayLines.forEach((item,i)=>{
      item.style.left = ( i * 25) + "%"
      item.style.marginLeft = "1%"
   })
   
   elems.forEach((elem,i)=>{
      if(id== i){
         elem.innerHTML +=`
            <div class="playAnim-container">
               <span></span>
               <span></span>
               <span></span>
               <span></span>
            </div>
         `
      }
   })
   elemIndex= id
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
            changeSong(1)
         }else if(x1 - x2 > (swipeBound.width/2)){
            console.log("left")
            swipeControls.style.border = "1px solid green"
         }
      },1000)
   })
}
swipeControl()

function changeSong(a) {
   if (a==1) {
      song.src = sourceArray[(Number(currentSongId)+1)]
      song.play()
      currentPlaying= sourceArray[(currentSongId+1)].replace("Music/","").replace(/_/g," ")
      typeWriter()
   }
}