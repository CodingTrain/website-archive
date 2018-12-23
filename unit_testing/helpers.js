const path = require('path');

module.exports.urlToMarkdownFilename = function(url) {
  return `../_${url.slice(1)}.md`;
}

module.exports.urlToRepositoryDirectoryFilename = function(url) {
  return `../${url.slice(1)}/`;
}

module.exports.urlToDirectoryIndexFilename = function(url) {
  return `../_${url.slice(1)}/index.md`;
}

module.exports.markdownFilenameToUrl = function(filename) {
  return `/${filename.slice(4, -3)}`;
}

module.exports.resolveLocalUrl = function(url, currentPath) {
  if (url.startsWith('/')) {
    return url;
  }
  return path.join(currentPath, url);
}

module.exports.describeIf = function(test) {
  return test ? describe : describe.skip;
}

module.exports.itIf = function(test) {
  return test ? it : it.skip;
}
