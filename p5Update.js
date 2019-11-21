/**
 * @todo: Create a documentation for the usage
 */

const replace = require("replace-in-file");

//Specify the release you want to update to
const release = "0.10.2";

const paths = ["./**/index.html"];
const ignored_files = ["./_site/**/*.html"];

const p5_js = {
  name: "p5.js",
  files: paths,
  from: new RegExp(
    `https:\/\/cdn.jsdelivr.net\/npm\/p5@[0-99].[0-99].[0-99]\/lib\/p5.js`
  ),
  to: `https://cdn.jsdelivr.net/npm/p5@${release}/lib/p5.min.js`,
  ignore: ignored_files
};
const p5_sound_js = {
  name: "p5.sound.js",
  files: paths,
  from: new RegExp(
    `https:\/\/cdn.jsdelivr.net\/npm\/p5@[0-99].[0-99].[0-99]\/lib\/addons\/p5.sound.js`
  ),
  to: `https://cdn.jsdelivr.net/npm/p5@${release}/lib/addons/p5.sound.min.js`,
  ignore: ignored_files
};
const p5_dom_js = {
  name: "p5.dom.js",
  files: paths,
  from: new RegExp(
    `https:\/\/cdn.jsdelivr.net\/npm\/p5@[0-99].[0-99].[0-99]\/lib\/addons\/p5.dom.js`
  ),
  to: ``,
  ignore: ignored_files
};
const p5_min_js = {
  name: "p5.min.js",
  files: paths,
  from: new RegExp(
    `https:\/\/cdn.jsdelivr.net\/npm\/p5@[0-99].[0-99].[0-99]\/lib\/p5.min.js`
  ),
  to: `https://cdn.jsdelivr.net/npm/p5@${release}/lib/p5.min.js`,
  ignore: ignored_files
};
const p5_sound_min_js = {
  name: "p5.sound.min.js",
  files: paths,
  from: new RegExp(
    `https:\/\/cdn.jsdelivr.net\/npm\/p5@[0-99].[0-99].[0-99]\/lib\/addons\/p5.sound.min.js`
  ),
  to: `https://cdn.jsdelivr.net/npm/p5@${release}/lib/addons/p5.sound.min.js`,
  ignore: ignored_files
};
const p5_dom_min_js = {
  name: "p5.dom.min.js",
  files: paths,
  from: new RegExp(
    `https:\/\/cdn.jsdelivr.net\/npm\/p5@[0-99].[0-99].[0-99]\/lib\/addons\/p5.dom.min.js`
  ),
  to: ``,
  ignore: ignored_files
};
const options = [
  p5_js,
  p5_sound_js,
  p5_dom_js,
  p5_min_js,
  p5_sound_min_js,
  p5_dom_min_js
];

(async () => {
  for (const option of options) {
    try {
      await replace(option);
    } catch (error) {
      console.error("Error occurred:", error);
    }
  }
})();
