const owner = 'adwaith-anand-sr';
const repo = 'musicPlayer';
const path = 'Music';

// looping through Music folder and getting names of each files
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


setTimeout(function() {
   song.src = sourceArray[0]
   console.log(sourceArray[0]);
   console.log(song);
}, 100);