//Load the library and specify options
const replace = require('replace-in-file');
const regex = new RegExp('https:\/\/cdnjs.cloudflare.com\/ajax\/libs\/p5.js\/[0-9]\.[0-9]\.[0-9]\/addons\/p5.sound.js');
const options = {
  files: ['./CodingChallenges/**/index.html'],
  from: regex,
  to: 'test',
};

(async () => {
  try {
    const changes = await replace(options)
    console.log('Modified files:', changes.join(', '));
  } catch (error) {
    console.error('Error occurred:', error);
  }
})();