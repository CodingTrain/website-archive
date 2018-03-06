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
// Use check-prop-types to turn PropTypes messages into errors
const { assertPropTypes } = require('check-prop-types');
// PropTypes of the documents are descibed in the formats.js file.
const formatDefinitions = require('./formats.js');

// if verbose set to true script will log almost everything it does.
let verbose = false;

// Create variable with path to _CodingChallenges directory
let CodingChallangesDir = "../_CodingChallenges";

// test that  script can read _CodingChallanges directory with fs.readdirSync
// as it will imediatly throw an error if can't read directory (fs.readdir is
// asyncronous and so test will pass despite not being able to read directory).
test('Check that script can read _CodingChallanges directory.', () => {
  let files = fs.readdirSync(CodingChallangesDir);
  if (verbose) {
    console.log("_CodingChallanges directory successfully read, here are all the files:");
    files.forEach((file) => console.log("\t" + file));
  }
});

// Assuming _CodingChallanges directory readable, go on to run a bunch of tests
// on each file in the directory to check that all files are valid.
// TODO: only run this if first test readable.
let files = fs.readdirSync(CodingChallangesDir);
files.forEach((file) => describe("Coding Challenge " + file, () => {
  // First test if script can read file. Does this using fs.readFileSync() as
  // fs.readFile() is asynchronous so test passed when it shouldn't have.
  // Potential errors may include: wrong encoding, wrong privaliges.
  // TODO: create an example where this test fails, but directory path is
  // correct to check it works
  let contents = fs.readFileSync(CodingChallangesDir+"/"+file, 'utf8');
  if (verbose) {
    console.log("Successfully read contents of _CodingChallenges/"+file+":")
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
      console.log("YAML from " + CodingChallangesDir+"/"+file + " has oppening and closing '---'s");
    }
  });

  // Checks YAML section is at beggining. Not sure if causes error if this is
  // not the case. Does this by splitting contents by "---"s, then checking that
  // the first section (which will be everything before the first "---") has a
  // length of 0 (Nothing before first "---").
  test("has YAML section at beggining", () => {
    expect(contents.split("---")[0].length).toBe(0);
    if (verbose) {
      console.log("YAML from " + CodingChallangesDir+"/"+file + " is at beggining.");
    }
  });

  // Checks YAML section is not empty. Does this by splitting contents by
  // "---"s, then checking that the second section (which will be everything
  // in the YAML section) has a length greater than 0 (is not empty).
  test("does not have an empty YAML section", () => {
    expect(contents.split("---")[1].length>0).toBe(true);
    if (verbose) {
      console.log("YAML from " + CodingChallangesDir+"/"+file + " has non zero length.");
    }
  });

  // Checks YAML is valid. Does this by reading YAML using yml-js library which
  // will cause error if yaml is invalid.
  test("has valid YAML contents", () => {
    let yamlContents = contents.split("---")[1];
    const frontYaml = yaml.safeLoad(yamlContents);
    const indentedJson = JSON.stringify(frontYaml, null, 4);
    if (verbose) {
      console.log("YAML from " + CodingChallangesDir+"/"+file + " successfully converted to JSON.");
      console.log("Here is the JSON:");
      console.log(indentedJson);
    }
  });

  // Uses PropTypes to validate the structure and types of all of the
  // parts of the YAML, including if there are keys that don't exist
  // in the definition
  test("has valid YAML layout and types", () => {
    if(file === "index.md") return;
    let yamlContents = contents.split("---")[1];
    const frontYaml = yaml.safeLoad(yamlContents);
    assertPropTypes(formatDefinitions.video, frontYaml, "YAML", file);
  });
}));
