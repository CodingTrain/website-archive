/**
 * @todo: Create a documentation for the usage
 */

const replace = require("replace-in-file");

//Specify the release you want to update to
const release = "0.7.3";

const paths = ["./**/index.html"];
const ignored_files = ["./_site/**/*.html"];

const p5_js = {
  name: "p5.js",
  files: paths,
  from: new RegExp(
    "https://cdnjs.cloudflare.com/ajax/libs/p5.js/[0-9].[0-9].[0-9]/p5.js"
  ),
  to: `https://cdnjs.cloudflare.com/ajax/libs/p5.js/${release}/p5.min.js`,
  ignore: ignored_files
};
const p5_sound_js = {
  name: "p5.sound.js",
  files: paths,
  from: new RegExp(
    "https://cdnjs.cloudflare.com/ajax/libs/p5.js/[0-9].[0-9].[0-9]/addons/p5.sound.js"
  ),
  to: `https://cdnjs.cloudflare.com/ajax/libs/p5.js/${release}/addons/p5.sound.min.js`,
  ignore: ignored_files
};
const p5_dom_js = {
  name: "p5.dom.js",
  files: paths,
  from: new RegExp(
    "https://cdnjs.cloudflare.com/ajax/libs/p5.js/[0-9].[0-9].[0-9]/addons/p5.dom.js"
  ),
  to: `https://cdnjs.cloudflare.com/ajax/libs/p5.js/${release}/addons/p5.dom.min.js`,
  ignore: ignored_files
};
const p5_min_js = {
  name: "p5.min.js",
  files: paths,
  from: new RegExp(
    "https://cdnjs.cloudflare.com/ajax/libs/p5.js/[0-9].[0-9].[0-9]/p5.min.js"
  ),
  to: `https://cdnjs.cloudflare.com/ajax/libs/p5.js/${release}/p5.min.js`,
  ignore: ignored_files
};
const p5_sound_min_js = {
  name: "p5.sound.min.js",
  files: paths,
  from: new RegExp(
    "https://cdnjs.cloudflare.com/ajax/libs/p5.js/[0-9].[0-9].[0-9]/addons/p5.sound.min.js"
  ),
  to: `https://cdnjs.cloudflare.com/ajax/libs/p5.js/${release}/addons/p5.sound.min.js`,
  ignore: ignored_files
};
const p5_dom_min_js = {
  name: "p5.dom.min.js",
  files: paths,
  from: new RegExp(
    "https://cdnjs.cloudflare.com/ajax/libs/p5.js/[0-9].[0-9].[0-9]/addons/p5.dom.min.js"
  ),
  to: `https://cdnjs.cloudflare.com/ajax/libs/p5.js/${release}/addons/p5.dom.min.js`,
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
      const changes = await replace(option);
      console.log(`${option.name}: `, changes.join(", "));
    } catch (error) {
      console.error("Error occurred:", error);
    }
  }
})();