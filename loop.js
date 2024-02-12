const owner = 'adwaith-anand-sr';
const repo = 'musicPlayer';
const path = 'Music';
let sourceArray = []
let index = 0
async function loopThroughFolder() {
   
  try {
    const response = await fetch(`https://api.github.com/repos/${owner}/${repo}/contents/${path}`);
    const data = await response.json();

    for (const item of data) {
       if (!sourceArray[index]) {
        sourceArray[index] = [];
      }
      sourceArray[index].push(item.name);
      index++;
      
      console.log(item.name);
    }
  } catch (error) {
    console.error('Error fetching folder contents:', error);
  }
}

loopThroughFolder();
