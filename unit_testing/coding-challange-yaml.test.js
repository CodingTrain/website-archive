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

  test("Check no undefined properties of object from YAML of "+
    CodingChallangesDir+"/"+file, () => {
    let contents = fs.readFileSync(CodingChallangesDir+"/"+file, 'utf8');
    let yamlContents = contents.split("---")[1];
    const frontYaml = yaml.safeLoad(yamlContents);
    expect(checkHasUndefinedReccursive(frontYaml)).toBe(false);
  });

});
