const yaml = require('js-yaml');
const fs = require('fs');
let verbose = false;

let CodingChallangesDir = "../_CodingChallenges";

test('Check that we can read _CodingChallanges directory.', () => {
  var files = fs.readdirSync(CodingChallangesDir);
  if (verbose) {
    console.log("_CodingChallanges directory successfully read, here are all the files:");
    files.forEach((file)=>console.log("\t" + file));
  }
});

var files = fs.readdirSync(CodingChallangesDir);
files.forEach((file)=>{
  test("Check that we can read contents of _CodingChallenges/"+file, () => {
    var contents = fs.readFileSync(CodingChallangesDir+"/"+file, 'utf8');
    if (verbose) {
      console.log("Successfully read contents of _CodingChallenges/"+file+":")
      console.log(contents);
    }
  });

  test("Check that contents of _CodingChallenges/"+file+" has oppening and closing '---'s", () => {
    var contents = fs.readFileSync(CodingChallangesDir+"/"+file, 'utf8');
    expect(contents.split("---").length-1).toBe(2);
  });

  test("Check that contents of _CodingChallenges/"+file+" has YAML section at beggining", () => {
    var contents = fs.readFileSync(CodingChallangesDir+"/"+file, 'utf8');
    expect(contents.split("---")[0].length).toBe(0);
  });

  test("Check that contents of _CodingChallenges/"+file+" does not have empty YAML section", () => {
    var contents = fs.readFileSync(CodingChallangesDir+"/"+file, 'utf8');
    expect(contents.split("---")[1].length>0).toBe(true);
  });

  test("Check that YAML contents of _CodingChallenges/"+file+" valid", () => {
    var contents = fs.readFileSync(CodingChallangesDir+"/"+file, 'utf8');
    var yamlContents = contents.split("---")[1];
    const frontYaml = yaml.safeLoad(yamlContents);
    const indentedJson = JSON.stringify(frontYaml, null, 4);
    if (verbose) {
      console.log("YAML from " + "test.yml" + "successfully converted to JSON.");
      console.log("Here is the JSON:");
      console.log(indentedJson);
    }
  });

});
