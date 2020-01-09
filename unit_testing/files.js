const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

const yamlFolders = [
  '_CodingChallenges',
  '_Courses',
  '_GuestTutorials',
  '_Streams',
  '_Tutorials',
  '_CodingInTheCabana',
  '_TeachableMachine',
  '_beginners',
];


const checkYAMLFormat = format => {

  /**
   * @type {Array<{
    *  error:string,
    *  line:number,
    *  index:number,
    *  example:string
    * }>}
    */
  const errors = [];

  const checkRegex = (regexString, errorDescription) => {
    let match;

    const regexp = RegExp(regexString, 'gm');

    while((match = regexp.exec(format)) !== null) {
      /**@type {string} */
      const indexString = format.substr(0, match.index);

      const lines = indexString.split('\n');

      //starts at 1 to fit with most editors
      const lineCount = lines.length;
      const index = lines[lines.length - 1].length;

      const encasedFormat =
        format.substring(0, match.index - 1) + "[" +
        format.substring(match.index, match.index + match[0].length) + "]" +
        format.substring(match.index + match[0].length);

      const globalLines = encasedFormat.split('\n');

      const example = "\n----------------------------------------\n" + globalLines.slice(lineCount - 2, lineCount + 1).join('\n') + "\n----------------------------------------";
      errors.push({
        error: errorDescription,
        line: lineCount,
        index,
        example
      });
    }
  }

  checkRegex(' \\n', 'Extra space at the end of line');

  checkRegex('\\n\\n\\n', 'Double blank lines in YAML');

  checkRegex('^\\n\\n', 'Blankline at top of YAML');

  //also match tabs that some editors add automatically
  checkRegex('\\n\\n$', 'Blankline at bottom of YAML');

  // Requires a single space after starting an entry with -
  checkRegex('\\n( *)-( {2,})?[^ ][^\\n]*\\n', `Incorrect spacing after entry '-'. Use one space`);


  if(errors.length > 0) {
    const stringified = JSON.stringify(errors, undefined, 4).replace(/\\n/gm, "\n")
    throw new Error(stringified);
  }
  let regex;

  // Indentation on consecutive lines, ignoring blank spacers
  regex = /\n( *)[^ \-\n][^\n]*[^:\n]\n+(\1 [^\n]*)\n/;
  if(format.match(regex)) {
    throw new Error(`Incorrect indentation (Expected ${format.match(regex)[1].length} spaces): '${format.match(regex)[2]}'`);
  }
  // Indentation on lines after ones starting with - need two extra spaces
  regex = /\n( *)- [^\n]*\n+(\1( {0,1}| {3,})[^ -][^\n]*)/;
  if(format.match(regex)) {
    throw new Error(`Incorrect indentation (Expected ${format.match(regex)[1].length + 2} spaces): '${format.match(regex)[2]}'`);
  }
  // Indentation on lines ending in : require two extra spaces
  regex = /\n( *)[^ \n][^\n]*:\n+(\1( {0,1}| {3,})[^\n ][^\n]*)/;
  if(format.match(regex)) {
    throw new Error(`Incorrect indentation (Expected ${format.match(regex)[1].length + 2} spaces): '${format.match(regex)[2]}'`);
  }
}

class YAMLFile {
  constructor(path) {
    this.path = path;
    this._data = null;
    this._error = null;
  }

  load() {
    try {
      const contents = fs.readFileSync(this.path, 'utf8');
      const splitContents = contents.split("---");
      if(splitContents.length !== 3) {
        throw new Error('Incorrect number of "---" deperators in file');
      }
      if(splitContents[0].length !== 0) {
        throw new Error('File should start with "---"');
      }
      const yamlContents = contents.split("---")[1];
      checkYAMLFormat(yamlContents);
      this._data = yaml.safeLoad(yamlContents);
    } catch(e) {
      this._error = e;
      throw e;
    }
  }

  isValid() {
    return this._error === null;
  }

  get content() {
    if(!this._data) {
      this.load();
    }
    return this._data;
  }

  unload() {
    this._data = null;
  }
}

const exploreDirectory = (folderName) => {
  const directories = {};
  const files = {};

  for(const filename of fs.readdirSync(folderName)) {
    let fullPath = path.join(folderName, filename);
    if(fs.lstatSync(fullPath).isDirectory()) {
      directories[filename] = exploreDirectory(fullPath);
    } else {
      files[filename] = new YAMLFile(fullPath);
    }
  }

  return {
    directories,
    files,
    folderName,
  };
}

let allFilesCache = null;

module.exports.getAllFiles = function() {
  if(!allFilesCache) {
    allFilesCache = {};
    for(const directory of yamlFolders) {
      allFilesCache[directory] = exploreDirectory(`../${directory}`);
    }
  }
  return allFilesCache;
};
