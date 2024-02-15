let backgroundImages = document.querySelector(".imageDisplay")
backgroundImages.style.backgroundImage = `url('Images/images (1).jpeg')`
let sourceArray = []
let song = document.querySelector("audio")
let list = document.querySelector(".list")


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
            <div class ="elem" id="${i}">
               <div class="img"></div>
               <h3 id="${i}">${item.replace("Music/","").replace(/_/g, " ")}</h3>
            </div>
         `
      })
   }, 1000);
}
listingSongs()

list.addEventListener("click", (e)=>{
   console.log(e.target.id);
   song.src = sourceArray[e.target.id]
   console.log(song.src);
   song.play()
   alert(song.src)
})