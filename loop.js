const owner = 'adwaith-anand-sr';
const repo = 'musicPlayer';
const path = 'Music';

async function loopThroughFolder() {
   
  try {
    const response = await fetch(`https://api.github.com/repos/${owner}/${repo}/contents/${path}`);
    const data = await response.json();

    for (const item of data) {
      console.log(item.name);
      // You can perform any operation you want with each item here
    }
  } catch (error) {
    console.error('Error fetching folder contents:', error);
  }
}

loopThroughFolder();
