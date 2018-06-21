module.exports.urlToMarkdownFilename = function(url) {
  return `../_${url.slice(1)}.md`;
}

module.exports.urlToDirectoryFilename = function(url) {
  return `../_${url.slice(1)}/index.md`;
}

module.exports.markdownFilenameToUrl = function(filename) {
  return `/${filename.slice(4, -3)}`;
}
