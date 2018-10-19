/***************************************************
This file was created by Billy Timimi.
Other contributors include: *add you your name here if you were kind enough to help.*

The purpose of this file is to do unit testing of all the files in the
_CodingChallenges directory, in order to insure they are all valid.

If you are trying to read the source of the website and are unsure as to what
this file does/what unit testing is, I reccomend you check out the coding train's
video on it: https://www.youtube.com/watch?v=S3QwafQEvSs, it's where I learn't
everything needed to create this script.
***************************************************/
// import libraries.
const yaml = require('js-yaml'); // js-yaml helps us read yaml of files
const fs = require('fs'); // fs is file system package
const path = require('path');
// Use check-prop-types to turn PropTypes messages into errors
const { assertPropTypes } = require('check-prop-types');
// PropTypes of the documents are descibed in the formats.js file.
const formatDefinitions = require('./formats.js');
const {
  markdownFilenameToUrl,
} = require('./helpers');

// if verbose set to true script will log almost everything it does.
let verbose = false;

// Create variable with path to directories to check, and check them
// against their specified format
let directories = {
  _CodingChallenges: formatDefinitions.video,
  _Courses: formatDefinitions.video,
  _GuestTutorials: formatDefinitions.video,
  _Streams: formatDefinitions.stream,
  _Tutorials: formatDefinitions.video,
};

let knownVideos = {};
let linkedVideos = {};

function findVideos(src, obj) {
  if(typeof obj === 'string') {
    return;
  }
  for(let k of Object.keys(obj)) {
    if(k === 'video_id') {
      linkedVideos[obj[k]] = src;
    }
    findVideos(src, obj[k]);
  }
}

const checkFolder = (videoFormat, previousPath, folder) => describe(folder, () => {
  expect(videoFormat).toBeDefined();
  expect(previousPath).toBeDefined();
  expect(folder).toBeDefined();
  // Assuming _CodingChallanges directory readable, go on to run a bunch of tests
  // on each file in the directory to check that all files are valid.
  // TODO: only run this if first test readable.
  let currentPath = path.join(previousPath, folder);
  let directories = [];
  let files = [];
  fs.readdirSync(currentPath).forEach(fileName => {
    let fullPath = path.join(currentPath, fileName);
    if(fs.lstatSync(fullPath).isDirectory()) {
      directories.push(fileName);
    } else {
      files.push(fileName);
    }
  });

  directories.forEach(dir => checkFolder(videoFormat, currentPath, dir));

  expect(files).toContain('index.md');
  let indexPosition = files.indexOf('index.md');
  files.splice(indexPosition, 1);


  test('index.md is valid', () => {
    let filePath = path.join(currentPath, 'index.md');
    let contents = fs.readFileSync(filePath, 'utf8');
    let yamlContents = contents.split("---")[1];
    const frontYaml = yaml.safeLoad(yamlContents);
    assertPropTypes(formatDefinitions.series, frontYaml, "YAML", 'index.md');
  });

  test('files are uniquely numbered', () => {
    let numbers = files.map(fileName => fileName.split('-')[0]);
    let numberSet = new Set(numbers);
    expect(numbers).toHaveLength(numberSet.size);
  });

  files.forEach((fileName) => describe(fileName, () => {
    let filePath = path.join(currentPath, fileName);
    let yamlContents;
    let decodedYaml;
    // First test if script can read file. Does this using fs.readFileSync() as
    // fs.readFile() is asynchronous so test passed when it shouldn't have.
    // Potential errors may include: wrong encoding, wrong privaliges.
    // TODO: create an example where this test fails, but directory path is
    // correct to check it works
    let contents = fs.readFileSync(filePath, 'utf8');
    if (verbose) {
      console.log("Successfully read contents of " + filePath + ":")
      console.log(contents);
    }

    // Then check if file has oppening and closing "---"s. The "---"s contain the
    // YAML. Test does this by splitting the string by "---"s then getting the
    // number of "---"s by subtracting one from the number of resulting sections
    // (empty sections are returned even if a "---" is right at beggining of
    // string). If this doesn't make sense even after reading the code, I
    // reccomend looking at the MDN page on string splitting:
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/split
    test("has oppening and closing '---'s", () => {
      expect(contents.split("---").length-1).toBe(2);
      if (verbose) {
        console.log("YAML from " + filePath + " has oppening and closing '---'s");
      }
    });

    // Checks YAML section is at beggining. Not sure if causes error if this is
    // not the case. Does this by splitting contents by "---"s, then checking that
    // the first section (which will be everything before the first "---") has a
    // length of 0 (Nothing before first "---").
    test("has YAML section at beggining", () => {
      expect(contents.split("---")[0].length).toBe(0);
      if (verbose) {
        console.log("YAML from " + filePath + " is at beggining.");
      }
    });

    // Checks YAML section is not empty. Does this by splitting contents by
    // "---"s, then checking that the second section (which will be everything
    // in the YAML section) has a length greater than 0 (is not empty).
    test("does not have an empty YAML section", () => {
      expect(contents.split("---")[1].length>0).toBe(true);
      if (verbose) {
        console.log("YAML from " + filePath + " has non zero length.");
      }
    });

    test('has valid YAML', () => {
      yamlContents = contents.split("---")[1];
      if(yamlContents.match(/ \n/)) {
        throw new Error(`Extra space at the end of line: '${yamlContents.match(/[^\n]* \n/)[0].slice(0, -1)}'`);
      }
      if(yamlContents.match(/\n\n\n/)) {
        throw new Error('Double blank lines in YAML');
      }
      if(yamlContents.match(/^\n\n/)) {
        throw new Error('Blankline at top of YAML');
      }
      if(yamlContents.match(/\n\n$/)) {
        throw new Error('Blankline at bottom of YAML');
      }
      // Requires a single space after starting an entry with -
      let regex = /\n( *)-( {2,})?[^ ][^\n]*\n/;
      if(yamlContents.match(regex)) {
        throw new Error(`Incorrect spacing after entry '-'. Use one space: '${yamlContents.match(regex)[0].slice(1, -1)}'`);
      }
      // Indentation on consecutive lines, ignoring blank spacers
      regex = /\n( *)[^ \-\n][^\n]*[^:\n]\n+(\1 [^\n]*)\n/;
      if(yamlContents.match(regex)) {
        throw new Error(`Incorrect indentation (Expected ${yamlContents.match(regex)[1].length} spaces): '${yamlContents.match(regex)[2]}'`);
      }
      // Indentation on lines after ones starting with - need two extra spaces
      regex = /\n( *)- [^\n]*\n+(\1( {0,1}| {3,})[^ -][^\n]*)/;
      if(yamlContents.match(regex)) {
        throw new Error(`Incorrect indentation (Expected ${yamlContents.match(regex)[1].length + 2} spaces): '${yamlContents.match(regex)[2]}'`);
      }
      // Indentation on lines ending in : require two extra spaces
      regex = /\n( *)[^ \n][^\n]*:\n+(\1( {0,1}| {3,})[^\n ][^\n]*)/;
      if(yamlContents.match(regex)) {
        throw new Error(`Incorrect indentation (Expected ${yamlContents.match(regex)[1].length + 2} spaces): '${yamlContents.match(regex)[2]}'`);
      }
      decodedYaml = yaml.safeLoad(yamlContents);
      if(decodedYaml.video_id) {
        let previous = knownVideos[decodedYaml.video_id];
        if(previous) {
          throw new Error(`Duplicate video_id. Original file: ${previous}`)
        }
        knownVideos[decodedYaml.video_id] = filePath;
      }
      for(let k in decodedYaml) {
        let value = decodedYaml[k];
        findVideos(filePath, value);
      }
    });

    // Uses PropTypes to validate the structure and types of all of the
    // parts of the YAML, including if there are keys that don't exist
    // in the definition
    test("has valid YAML layout and types", () => {
      if(!decodedYaml) {
        return;
      }
      assertPropTypes(videoFormat, decodedYaml, "YAML", fileName);
    });

    test('title matches internal numbering', () => {
      if(!decodedYaml) {
        return;
      }
      // Get file name with leading zeros stripped
      let fileNumber = fileName.split('-')[0];
      fileNumber = fileNumber.replace(/^0+/, '');

      // Gets internal representation as a string
      let videoString = decodedYaml.video_number.toString();
      // If we're in a standalone
      if(videoString === fileNumber) return;
      // If the video has parts, check we match the last one only.
      let parts = fileNumber.split('.');
      if(videoString === parts[parts.length - 1]) return;
      throw new Error('Expected file numbering to match internal numbering');
    });

    test('has no contributions if it\'s in a multi-part video but not the first part', () => {
      if(!decodedYaml) {
        return;
      }
      let videoStringParts = decodedYaml.video_number.toString().split('.');
      if(videoStringParts.length > 1) {
        if(videoStringParts[videoStringParts.length - 1] !== '1') {
          expect(decodedYaml.contributions).toBeUndefined();
        }
      }
    });
  }));
});

// Do the checks
Object.entries(directories)
  .map(([directory, videoFormat]) => checkFolder(videoFormat, "../", directory));

test('Youtube links', () => {
  Object.entries(linkedVideos)
    .map(([videoId, src]) => {
      if (videoId in knownVideos) {
        throw new Error(`${videoId} linked in ${src} should point to ${markdownFilenameToUrl(knownVideos[videoId])}`)
      }
    });
});
