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

const yaml = require('js-yaml');
const fs = require('fs');
let verbose = false;

function checkHasUndefinedReccursive(value) {
  // check if object has undefined or null properties
  // if it doesn't and it has properties which are objects,
  // recursivly check if they are undefined
  if (value == null) { //this checks for undefined as undefined == null is true
    return true
  }
  if (value instanceof Object) {
    accumilator = false;
    for (let key in value) {
      accumilator = accumilator || checkHasUndefinedReccursive(value[key]);
    }
    return accumilator;
  }
  return false;
}

let CodingChallangesDir = "../_CodingChallenges";

test('Check that we can read _CodingChallanges directory.', () => {
  let files = fs.readdirSync(CodingChallangesDir);
  if (verbose) {
    console.log("_CodingChallanges directory successfully read, here are all the files:");
    files.forEach((file)=>console.log("\t" + file));
  }
});

let files = fs.readdirSync(CodingChallangesDir);
files.forEach((file)=>{
  test("Check that we can read contents of "+CodingChallangesDir+"/"+file, () => {
    let contents = fs.readFileSync(CodingChallangesDir+"/"+file, 'utf8');
    if (verbose) {
      console.log("Successfully read contents of _CodingChallenges/"+file+":")
      console.log(contents);
    }
  });

  test("Check that contents of "+CodingChallangesDir+"/"+file+" has oppening and closing '---'s", () => {
    let contents = fs.readFileSync(CodingChallangesDir+"/"+file, 'utf8');
    expect(contents.split("---").length-1).toBe(2);
    if (verbose) {
      console.log("YAML from " + CodingChallangesDir+"/"+file + " has oppening and closing '---'s");
    }
  });

  test("Check that contents of "+CodingChallangesDir+"/"+file+" has YAML section at beggining", () => {
    let contents = fs.readFileSync(CodingChallangesDir+"/"+file, 'utf8');
    expect(contents.split("---")[0].length).toBe(0);
    if (verbose) {
      console.log("YAML from " + CodingChallangesDir+"/"+file + " is at beggining.");
    }
  });

  test("Check that contents of "+CodingChallangesDir+"/"+file+" does not have empty YAML section", () => {
    let contents = fs.readFileSync(CodingChallangesDir+"/"+file, 'utf8');
    expect(contents.split("---")[1].length>0).toBe(true);
    if (verbose) {
      console.log("YAML from " + CodingChallangesDir+"/"+file + " has non zero length.");
    }
  });

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

  // didn't cause an error to website when videos property was null
  // don't know if undefined properties will always be handled cleanly.
  // if so, maybe add a "strict" variable, and only run this test if
  // strict is set to true.
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
