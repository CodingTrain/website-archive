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
const fetch = require('node-fetch');
// Use check-prop-types to turn PropTypes messages into errors
const { assertPropTypes } = require('check-prop-types');
// PropTypes of the documents are descibed in the formats.js file.
const formatDefinitions = require('./formats.js');
const {
  markdownFilenameToUrl,
  resolveLocalUrl,
  urlToRepositoryDirectoryFilename,
  describeIf,
  itIf,
} = require('./helpers');
const {
  getAllFiles
} = require('./files');

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
  _CodingInTheCabana: formatDefinitions.video,
  _TeachableMachine: formatDefinitions.video,
  _beginners: formatDefinitions.video,
};

let knownVideos = {};
let linkedVideos = {};

// For both of the below, it is an error for the second level object to have more than 1 key.
// This is a map of repository -> webEditor -> files with that specific combination
let repositoryToWebEditorMapping = {};
// This is a map of webEditor -> repository -> files with that specific combination
let webEditorToRepositoryMapping = {};

const checkFolder = (videoFormat, name, { directories, files }) => describe(name, () => {
  for (const [ folderName, subDirectory ] of Object.entries(directories)) {
    checkFolder(videoFormat, folderName, subDirectory);
  }

  it('index.md is valid', () => {
    expect(files['index.md']).not.toBeUndefined();
    assertPropTypes(formatDefinitions.series, files['index.md'].content, "YAML", 'index.md');
  });

  it('files are uniquely numbered', () => {
    let numbers = Object.keys(files).map(fileName => fileName.split('-')[0]);
    let numberSet = new Set(numbers);
    expect(numbers).toHaveLength(numberSet.size);
  });

  for (const [fileName, file] of Object.entries(files)) {
    if (fileName === 'index.md') {
      // We handled that already.
      continue;
    }

    describe(fileName, () => {
      try {
        file.load();
      } catch(e) {};

      const valid = file.isValid();

      // Set up global state needed for all tests, these get run before any tests.
      if (valid) {
        const {
          video_id,
          web_editor,
          repository,
        } = file.content;
        const resolvedRepository = repository ? resolveLocalUrl(repository, path.dirname(markdownFilenameToUrl(file.path))) : repository ;

        if (video_id) {
          knownVideos[video_id] = knownVideos[video_id] || [];
          knownVideos[video_id].push(file);
        }

        if (repository) {
          const repoToEditor = repositoryToWebEditorMapping[resolvedRepository] = repositoryToWebEditorMapping[resolvedRepository] || {};
          const editorSources = repoToEditor[web_editor] = repoToEditor[web_editor] || [];
          editorSources.push(file);
        }

        if (web_editor) {
          const editorToRepo = webEditorToRepositoryMapping[web_editor] = webEditorToRepositoryMapping[web_editor] || {};
          const repoSources = editorToRepo[resolvedRepository] = editorToRepo[resolvedRepository] || [];
          repoSources.push(file);
        }
        // Unload for the first pass, will be reloaded when required
        file.unload();
      }

      afterAll(() => file.unload());

      it('is formatted correctly', () => {
        file.load();
      });

      itIf(valid)('has valid YAML layout and types', () => {
        assertPropTypes(videoFormat, file.content, "YAML", fileName);
      });


      itIf(valid)('title matches internal numbering', () => {
        // Get file name with leading zeros stripped
        let fileNumber = fileName.split('-')[0];
        fileNumber = fileNumber.replace(/^0+/, '');

        // Gets internal representation as a string
        let videoString = file.content.video_number.toString();
        // If we're in a standalone
        if (videoString === fileNumber) return;
        // If the video has parts, check we match the last one only.
        let parts = fileNumber.split('.');
        if (videoString === parts[parts.length - 1] || file.content.ignore_filename) return;
        throw new Error('Expected file numbering to match internal numbering');
      });

      itIf(valid && file.content.video_id)('Has a unique video_id', () => {
        const fileList = knownVideos[file.content.video_id];
        if (fileList.length !== 1) {
          throw new Error(`video_id is shared with: ${fileList.filter(f => f !== file).map(f => f.path).join(', ')}`)
        }
      });

      describeIf(valid)('YouTube links', () => {
        function findVideos(obj) {
          if (typeof obj === 'string') {
            return;
          }
          for (let [ k, videoId ] of Object.entries(obj)) {
            if (k === 'video_id') {
              it(`linked video ID: ${videoId} is not a local link`, () => {
                if (videoId in knownVideos) {
                  throw new Error(`Video ${videoId} linked in ${file.path} should point to ${markdownFilenameToUrl(knownVideos[videoId][0].path)}`)
                }
              })
            }
            findVideos(obj[k]);
          }
        }
        const { video_id, ...remainingEntries } = file.content;
        findVideos(remainingEntries);
      });

      itIf(valid)('has a valid repository to web_editor mapping', () => {
        // This only checks that for an unset web_editor that should be set
        const {
          repository,
          web_editor,
        } = file.content;
        if (repository && !web_editor) {
          let resolvedRepository = resolveLocalUrl(repository, path.dirname(markdownFilenameToUrl(file.path)));
          const webEditors = repositoryToWebEditorMapping[resolvedRepository];
          const webEditorList = Object.keys(webEditors);
          if (webEditorList.length === 2) {
            const correct = webEditorList[0] === 'undefined' ? webEditorList[1] : webEditorList[0];
            throw new Error(`should have web_editor = ${correct}\n - The relationship of ${resolvedRepository} <-> ${correct} is defined in ${webEditors[correct].map(f => f.path).join(', ')}`);
          }
        }
      });

      itIf(valid)('has a valid web_editor to repository mapping', () => {
        // This only checks that for an unset repository that should be set
        const {
          repository,
          web_editor,
        } = file.content;
        if (web_editor && !repository) {
          const repositories = webEditorToRepositoryMapping[web_editor];
          const repositoryList = Object.keys(repositories);
          if (repositoryList.length === 2) {
            const correct = repositoryList[0] === 'undefined' ? repositoryList[1] : repositoryList[0];
            throw new Error(`should have repository = ${correct}\n - The relationship of ${correct} <-> ${web_editor} is defined in ${repositories[correct].map(f => f.path).join(', ')}`);
          }
        }
      });
    });
  }
});

const files = getAllFiles();
for (const [name, directory] of Object.entries(files)) {
  checkFolder(directories[name], name, directory);
}

xdescribe('Repositories', () => {
  describe('Web Editor mappings', () => {
    for (const [repository, web_editors] of Object.entries(repositoryToWebEditorMapping)) {
      const nonBlankKeys = Object.keys(web_editors).filter(x => x !== 'undefined');
      if (nonBlankKeys.length === 0) {
        continue;
      }
      it(`${repository} is mapped uniquely`, () => {
        if (nonBlankKeys.length > 1) {
          let string = `Repo ${repository} is matched with multiple web editors:`;
          for (const [web_editor, sources] of Object.entries(web_editors)) {
            string += `\n ${web_editor} from: ${sources.map(x => x.path).map(x => `\n  ${x}`).join(',')}`
          }
          throw new Error(string);
        }
      });
    }
  });

  describe('FS checks', () => {
    for (const repository of Object.keys(repositoryToWebEditorMapping)) {
      describe(repository, () => {
        const files = [];
        for (const sourceList of Object.values(repositoryToWebEditorMapping[repository])) {
          files.push(...sourceList);
        }
        //console.log(`This repository was found in the following files: ${files.map(f => f.path).join(', ')}`)
        it('should exist', async () => {

          //If repository contains 'github.com' let the test pass
          if (repository.match(/.*github\.com\/CodingTrain\/.*/)) return;

          // Allow external links for guest tutorials folder.
          for (file of files) {
            if (file.path.match(/.*\/_GuestTutorials\/.*/)) return;
          }

          const stat = fs.statSync(urlToRepositoryDirectoryFilename(repository));
          if (!stat.isDirectory) {
            throw new Error('Repository is not a directory');
          }
        });
      });
    }
  });
});

describe('Web Editors', () => {
  describe('Repository mappings', () => {
    for (const [web_editor, repositories] of Object.entries(webEditorToRepositoryMapping)) {
      const nonBlankKeys = Object.keys(repositories).filter(x => x !== 'undefined');
      if (nonBlankKeys.length === 0) {
        continue;
      }
      it(`${web_editor} is mapped uniquely`, () => {
        if (nonBlankKeys.length > 1) {
          let string = `Web Editor ${web_editor} is matched with multiple repos:`;
          for (const [repository, sources] of Object.entries(repositories)) {
            string += `\n ${repository} from: ${sources.map(x => x.path).map(x => `\n  ${x}`).join(',')}`
          }
          throw new Error(string);
        }
      });
    }
  });

  describe('Metadata', () => {
    for (const web_editor of Object.keys(webEditorToRepositoryMapping)) {
      describe(web_editor, () => {
        let webEditorData;

        beforeAll(async () => {
          const resp = await fetch(`https://editor.p5js.org/api/projects/${web_editor}`);
          webEditorData = await resp.json();
        });

        it('has the right user', () => {
          // Check that all web editor versions are on the right user
          expect(webEditorData.user.id).toBe('5b8578c76d67b5757e541f74');
        })
      });
    }
  })
});
