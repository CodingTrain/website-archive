/**
 * @todo: Create a documentation for the usage
 */

const replace = require('replace-in-file');

//Specify the release you want to update to
const release = '0.7.3';

const p5_js = {
  files: ['./CodingChallenges/**/index.html'],
  from: new RegExp('https:\/\/cdnjs.cloudflare.com\/ajax\/libs\/p5.js\/[0-9]\.[0-9]\.[0-9]\/p5.js'),
  to: `https://cdnjs.cloudflare.com/ajax/libs/p5.js/${release}/p5.min.js`
};
const p5_sound_js = {
  files: ['./CodingChallenges/**/index.html'],
  from: new RegExp('https:\/\/cdnjs.cloudflare.com\/ajax\/libs\/p5.js\/[0-9]\.[0-9]\.[0-9]\/addons\/p5.sound.js'),
  to: `https://cdnjs.cloudflare.com/ajax/libs/p5.js/${release}/addons/p5.sound.min.js`
};
const p5_dom_js = {
  files: ['./CodingChallenges/**/index.html'],
  from: new RegExp('https:\/\/cdnjs.cloudflare.com\/ajax\/libs\/p5.js\/[0-9]\.[0-9]\.[0-9]\/addons\/p5.dom.js'),
  to: `https://cdnjs.cloudflare.com/ajax/libs/p5.js/${release}/addons/p5.dom.min.js`
};
const p5_min_js = {
  files: ['./CodingChallenges/**/index.html'],
  from: new RegExp('https:\/\/cdnjs.cloudflare.com\/ajax\/libs\/p5.js\/[0-9]\.[0-9]\.[0-9]\/p5.min.js'),
  to: `https://cdnjs.cloudflare.com/ajax/libs/p5.js/${release}/p5.min.js`
};
const p5_sound_min_js = {
  files: ['./CodingChallenges/**/index.html'],
  from: new RegExp('https:\/\/cdnjs.cloudflare.com\/ajax\/libs\/p5.js\/[0-9]\.[0-9]\.[0-9]\/addons\/p5.sound.min.js'),
  to: `https://cdnjs.cloudflare.com/ajax/libs/p5.js/${release}/addons/p5.sound.min.js`
};
const p5_dom_min_js = {
  files: ['./CodingChallenges/**/index.html'],
  from: new RegExp('https:\/\/cdnjs.cloudflare.com\/ajax\/libs\/p5.js\/[0-9]\.[0-9]\.[0-9]\/addons\/p5.dom.min.js'),
  to: `https://cdnjs.cloudflare.com/ajax/libs/p5.js/${release}/addons/p5.dom.min.js`
};
const options = [p5_js, p5_sound_js, p5_dom_js, p5_min_js, p5_sound_min_js, p5_dom_min_js];

(() => {
  options.forEach(async (option) => {
    try {
      const changes = await replace(option)
      console.log('Modified files:', changes.join(', '));
    } catch (error) {
      console.error('Error occurred:', error);
    }
  });
})();