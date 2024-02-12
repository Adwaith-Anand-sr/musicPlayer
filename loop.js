const owner = 'adwaith-anand-sr';
const repo = 'musicPlayer';
const path = 'Music';
let pathArray=[]
let index = 0
async function loopThroughFolder() {
   
  try {
    const response = await fetch(`https://api.github.com/repos/${owner}/${repo}/contents/${path}`);
    const data = await response.json();

    for (const item of data) {
      console.log(item.name);
      pathArray[index].push(item.name)
    }
  } catch (error) {
    console.error('Error fetching folder contents:', error);
  }
}

loopThroughFolder();
