const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

const yamlFolders = [
  '_CodingChallenges',
  '_Courses',
  '_GuestTutorials',
  '_Streams',
  '_Tutorials',
];

const checkYAMLFormat = format => {
  if(format.match(/ \n/)) {
    throw new Error(`Extra space at the end of line: '${format.match(/[^\n]* \n/)[0].slice(0, -1)}'`);
  }
  if(format.match(/\n\n\n/)) {
    throw new Error('Double blank lines in YAML');
  }
  if(format.match(/^\n\n/)) {
    throw new Error('Blankline at top of YAML');
  }
  if(format.match(/\n\n$/)) {
    throw new Error('Blankline at bottom of YAML');
  }
  // Requires a single space after starting an entry with -
  let regex = /\n( *)-( {2,})?[^ ][^\n]*\n/;
  if(format.match(regex)) {
    throw new Error(`Incorrect spacing after entry '-'. Use one space: '${format.match(regex)[0].slice(1, -1)}'`);
  }
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
      if (splitContents.length !== 3) {
        throw new Error('Incorrect number of "---" deperators in file');
      }
      if (splitContents[0].length !== 0) {
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
    if (!this._data) {
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

  for (const filename of fs.readdirSync(folderName)) {
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
  if (!allFilesCache) {
    allFilesCache = {};
    for (const directory of yamlFolders) {
      allFilesCache[directory] = exploreDirectory(`../${directory}`);
    }
  }
  return allFilesCache;
};
