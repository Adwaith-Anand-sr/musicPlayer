let backgroundImages = document.querySelector(".imageDisplay")
backgroundImages.style.backgroundImage = `url('Images/images (1).jpeg')`
let sourceArray = []
let song = document.querySelector("audio")
let list = document.querySelector(".list")
let currentPlaying
let textIndex=0

const scroll = new LocomotiveScroll({
    el: document.querySelector('.list'),
    smooth: true
});

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
      console.log(sourceArray);
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

list.addEventListener("click", (e)=>{
   song.src = sourceArray[e.target.id]
   song.play()
   document.querySelector(".imageDisplay .songName").textContent=""
   textIndex=0
   currentPlaying= sourceArray[e.target.id].replace("Music/","").replace(/_/g," ")
   typeWriter()
   song.addEventListener("canplay", ()=>{
      console.log("song is playing");
   })
})

function typeWriter() {
   const container = document.querySelector(".imageDisplay .songName");
   if (textIndex < currentPlaying.length) {
     container.textContent += currentPlaying.charAt(textIndex);
     textIndex++;
     setTimeout(typeWriter, 25); // Adjust typing speed here (milliseconds)
   }
}

