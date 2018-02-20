const fs = require('fs');
const path = require('path');
const markdownLinkCheck = require('markdown-link-check');

let walk = function(dir) {
  let results = []
  let list = fs.readdirSync(dir)
  list.forEach((file) => {
    file = dir + '/' + file
    if (dir.replace(/\.\//g, '') === '.git') return;
    if (dir.replace(/\.\//g, '') === 'node_modules') return;
    let stat = fs.statSync(file)
    if (stat && stat.isDirectory()) results = results.concat(walk(file))
    else if (path.extname(file) === '.md') results.push(file)
  })
  return results;
}


checkMd = (file) => {
  let text = fs.readFileSync(file, 'utf8');
  return p = new Promise(function(resolve) {
    markdownLinkCheck(text, (err, results) => {
      if (err) {
        return resolve({
          valid: false,
          links: null,
          file: file,
          err: err
        });
      }
      let brokenLinks = [];
      results.forEach(function(result) {
        if (result.status === 'dead') {
          console.log('%s is %s in file %s', result.link, result.status, file);
          brokenLinks.push(result.link);
        }
      })
      if (brokenLinks.length === 0) {
        return resolve({
          valid: true,
          links: null,
          file: file,
          err: null
        });
      } else {
        return resolve({
          valid: false,
          links: brokenLinks,
          file: file,
          err: null
        });
      }
    });
  });
}

checkUrls = () => {
  files = walk('.')

  //console.log('Files to be processed: ' + files.length)

  files.forEach((file) => {
    test('Testing URLs on ' + file, () => {
      expect.assertions(1);
      return checkMd(file).then(data => {
        //console.log('File Processed ' + data.file)
        expect(data.valid).toBe(true);
      });
    });
  })
}

checkUrls();