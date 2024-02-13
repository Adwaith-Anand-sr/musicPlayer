let backgroundImages = document.querySelector(".imageDisplay")
backgroundImages.style.backgroundImage = `url('Images/images (1).jpeg')`
let sourceArray = []
let song = document.querySelector("audio")


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

console.log(sourceArray[1]);
