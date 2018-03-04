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

// if verbose set to true script will log almost everything it does.
let verbose = false;

// define all functions used later

/*
TODO: clear up this discription

checkHasUndefinedReccursive() checks if an object has undefined or null
properties, and if it doesn't but it has properties which are objects,
recursivly check the properties to see if the have an undefined property.

Is used to check if YAML has undeined feilds.
*/
function checkHasUndefinedReccursive(value) {
  if (value == null) { //this checks for undefined as undefined == null is true
    return true;
  }
  // If value is an object, test all of it's properties.
  if (value instanceof Object) {
    accumilator = false;
    for (let key in value) {
      accumilator = accumilator || checkHasUndefinedReccursive(value[key]);
    }
    return accumilator;
  }
  // if value is not an object or null or undefined (i.e. an int), return false.
  return false;
}

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
files.forEach((file) => {
  // First test if script can read file. Does this using fs.readFileSync() as
  // fs.readFile() is asynchronous so test passed when it shouldn't have.
  // Potential errors may include: wrong encoding, wrong privaliges.
  // TODO: create an example where this test fails, but directory path is
  // correct to check it works
  test("Check that we can read contents of "+CodingChallangesDir+"/"+file, () => {
    let contents = fs.readFileSync(CodingChallangesDir+"/"+file, 'utf8'); // will throw err if can't open file.
    if (verbose) {
      console.log("Successfully read contents of _CodingChallenges/"+file+":")
      console.log(contents);
    }
  });

  // Then check if file has oppening and closing "---"s. The "---"s contain the
  // YAML. Test does this by splitting the string by "---"s then getting the
  // number of "---"s by subtracting one from the number of resulting sections
  // (empty sections are returned even if a "---" is right at beggining of
  // string). If this doesn't make sense even after reading the code, I
  // reccomend looking at the MDN page on string splitting:
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/split
  test("Check that contents of "+CodingChallangesDir+"/"+file+" has oppening and closing '---'s", () => {
    let contents = fs.readFileSync(CodingChallangesDir+"/"+file, 'utf8');
    expect(contents.split("---").length-1).toBe(2);
    if (verbose) {
      console.log("YAML from " + CodingChallangesDir+"/"+file + " has oppening and closing '---'s");
    }
  });

  // Checks YAML section is at beggining. Not sure if causes error if this is
  // not the case. Does this by splitting contents by "---"s, then checking that
  // the first section (which will be everything before the first "---") has a
  // length of 0 (Nothing before first "---").
  test("Check that contents of "+CodingChallangesDir+"/"+file+" has YAML section at beggining", () => {
    let contents = fs.readFileSync(CodingChallangesDir+"/"+file, 'utf8');
    expect(contents.split("---")[0].length).toBe(0);
    if (verbose) {
      console.log("YAML from " + CodingChallangesDir+"/"+file + " is at beggining.");
    }
  });

  // Checks YAML section is not empty. Does this by splitting contents by
  // "---"s, then checking that the second section (which will be everything
  // in the YAML section) has a length greater than 0 (is not empty).
  test("Check that contents of "+CodingChallangesDir+"/"+file+" does not have empty YAML section", () => {
    let contents = fs.readFileSync(CodingChallangesDir+"/"+file, 'utf8');
    expect(contents.split("---")[1].length>0).toBe(true);
    if (verbose) {
      console.log("YAML from " + CodingChallangesDir+"/"+file + " has non zero length.");
    }
  });

  // Checks YAML is valid. Does this by reading YAML using yml-js library which
  // will cause error if yaml is invalid.
  test("Check that YAML contents of "+CodingChallangesDir+"/"+file+" valid", () => {
    let contents = fs.readFileSync(CodingChallangesDir+"/"+file, 'utf8');
    let yamlContents = contents.split("---")[1];
    const frontYaml = yaml.safeLoad(yamlContents);
    const indentedJson = JSON.stringify(frontYaml, null, 4);
    if (verbose) {
      console.log("YAML from " + CodingChallangesDir+"/"+file + " successfully converted to JSON.");
      console.log("Here is the JSON:");
      console.log(indentedJson);
    }
  });

  // Checks that the YAML page has the required properties. Does this by
  // oppening yaml, then using the "hasOwnProperty" method to check if it has
  // all the required properties.
  //    The required properties are: "title", "video_number", "date", "video_id"
  // these properties were found at the Content Contribution Guide:
  // https://github.com/CodingTrain/website/wiki/Content-Contribution-Guide
  // The required properties for the index.md page was set to be the properties
  // that apperead across all index.md pages in all directories.
  test("Check that YAML contents of "+CodingChallangesDir+"/"+file
  +" have required properties", () => {
    let contents = fs.readFileSync(CodingChallangesDir+"/"+file, 'utf8');
    let yamlContents = contents.split("---")[1];
    const frontYaml = yaml.safeLoad(yamlContents);
    let requiredProperties = ["title", "video_number", "date", "video_id"];
    if (file=="index.md") {
      requiredProperties = ["title", "layout"];
    }
    for (let key of requiredProperties) {
      expect(frontYaml.hasOwnProperty(key)).toBe(true);
    }
  });

  // Checks if object created from YAML has any undefined properties using
  // checkHasUndefinedReccursive function (defined line 32).
  //     I didn't cause an error to website when videos property was null. I
  // don't know if undefined properties will always be handled cleanly. if so,
  // maybe add a "strict" variable, and only run this test if trict is set to
  // true.
  test("Check no undefined properties of object from YAML of "+
    CodingChallangesDir+"/"+file, () => {
    let contents = fs.readFileSync(CodingChallangesDir+"/"+file, 'utf8');
    let yamlContents = contents.split("---")[1];
    const frontYaml = yaml.safeLoad(yamlContents);
    if (checkHasUndefinedReccursive(frontYaml)) {
      console.log("There was an undefined property in the object created from the YAML of "+
        CodingChallangesDir+"/"+file+" here is the object:");
      console.log(frontYaml);
    }
    expect(checkHasUndefinedReccursive(frontYaml)).toBe(false);
  });

  // Checks that all contributions have the required properties using
  // .hasOwnProperty method.
  test("Check that contributions of "+ CodingChallangesDir+"/"+file
  +" has required properties", () => {
    let contents = fs.readFileSync(CodingChallangesDir+"/"+file, 'utf8');
    let yamlContents = contents.split("---")[1];
    const frontYaml = yaml.safeLoad(yamlContents);
    if (frontYaml.hasOwnProperty("contributions")) {
      for (let contibutor of frontYaml["contributions"]) {
        expect(contibutor.hasOwnProperty("title")).toBe(true);
        expect(contibutor.hasOwnProperty("url")
        || contibutor.hasOwnProperty("source")).toBe(true);
        /************ IMPORTANT NOTE **********************
          The Community Contributions Guide
          (https://github.com/CodingTrain/website/wiki/Community-Contributions-Guide)
          specifies that a user should include the following feilds in their
          contribution: title, author.name and url. However when I tested that
          this was the case I found contributer "bobvoorneveld" had chosen not
          to include a url, but had chosen to include a link to his source code.
          This seems reasonable as his projects were made with xcode and so it
          would be hard to share an excecutable, and his decision didn't seem to
          break anything. In order to allow his and others decisions to omit the
          url but include source, I changed the test to allow for it. Maybe it
          should throw an error if a "strict" variable is set to true.
        ***************************************************/
        expect(contibutor.hasOwnProperty("author")).toBe(true);
        expect(contibutor["author"].hasOwnProperty("name")).toBe(true);
      }
    }
  });
});
