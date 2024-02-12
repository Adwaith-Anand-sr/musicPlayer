const owner = 'adwaith-anand-sr';
const repo = 'musicPlayer';
const path = 'Music';

let index = 0
// looping through Music folder and getting names of each files
async function loopThroughFolder() {
   
  try {
    const response = await fetch(`https://api.github.com/repos/${owner}/${repo}/contents/${path}`);
    const data = await response.json();
    for (const item of data) {
       if (!sourceArray[index]) {
        sourceArray[index] = [];
      }
      sourceArray[index].push("Music/"+item.name);
      index++;
    }
  } catch (error) {
    console.error('Error fetching folder contents:', error);
  }
}
loopThroughFolder();
