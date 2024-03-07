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