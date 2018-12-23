const PropTypes = require('prop-types');
const exact = require('prop-types-exact');
const fs = require('fs');
const {
  markdownfilenameToUrl,
  urlToMarkdownFilename,
  urlToDirectoryIndexFilename,
} = require('./helpers');

function linkUrl() {
  function check(isRequired, props, propName, componentName) {
    if(props[propName]) {
      let value = props[propName];
      if(typeof value !== 'string') {
        return new Error(`${propName} of ${componentName} is not a string.`);
      }
      if(value.match(/https?:\/\/(www\.)?(youtube\.com\/watch|youtu\.be\/)/)) {
        let playlistMatch = value.match(/(&|\?)list=([^&]*)/);
        if(playlistMatch) {
          return new Error(`${propName} of ${componentName} references a YouTube url that looks like a playlist. Perhaps use https://www.youtube.com/playlist?list=${playlistMatch[2]} instead`);
        }
        return new Error(`${propName} of ${componentName} references a YouTube url instead of video_id`);
      }
      if(value.startsWith('http://') || value.startsWith('https://')) {
        // TODO: Check external urls?
      } else if(value.startsWith('/')) {
        let mdFilename = urlToMarkdownFilename(value);
        let dirFilename = urlToDirectoryIndexFilename(value);
        if(!fs.existsSync(mdFilename) && !fs.existsSync(dirFilename)) {
          return new Error(`${propName} of ${componentName} references ${value} but the expected file ${mdFilename} or directory ${dirFilename} does not exist.`);
        }
      } else {
        return new Error(`${propName} of ${componentName} appears not to be a link: '${value}'`);
      }
    } else if(isRequired) {
      return new Error(`${propName} of ${componentName} is required.`);
    }
  }
  let ret = check.bind(null, false);
  ret.isRequired = check.bind(null, true);
  return ret;
}

const link = module.exports.link = exact({
  title: PropTypes.string.isRequired,
  author: PropTypes.oneOfType([
    PropTypes.shape(exact({
      name: PropTypes.string.isRequired,
      url: PropTypes.string,
    })),
    PropTypes.string,
  ]),
  time: PropTypes.string,
  url: linkUrl(),
  video_id: PropTypes.string,
  playlist_id: PropTypes.string,
  source: PropTypes.string,
});

const contribution = module.exports.contribution = exact({
  ...link,
  author: link.author.isRequired,
});

const customSection = module.exports.customSection = exact({
  title: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(PropTypes.shape(link)).isRequired,
});

const videoBase = module.exports.videoBase = exact({
  title: PropTypes.string.isRequired,
  redirect_from: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.String),
  ]),
  video_number: PropTypes.number.isRequired,
  date: PropTypes.instanceOf(Date).isRequired,
  video_id: PropTypes.string,
  live_example: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.oneOf([false]),
  ]),
  web_editor: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.oneOf([false]),
  ]),
  can_contribute: PropTypes.bool,
  topics: PropTypes.arrayOf(PropTypes.shape(link)),
  links: PropTypes.arrayOf(PropTypes.shape(link)),
  videos: PropTypes.arrayOf(PropTypes.shape(link)),
  books: PropTypes.arrayOf(PropTypes.shape(link)),
  tools: PropTypes.arrayOf(PropTypes.shape(link)),
  parts: PropTypes.arrayOf(PropTypes.shape(link)),
  contributions: PropTypes.arrayOf(PropTypes.shape(contribution)),
  custom_sections: PropTypes.arrayOf(PropTypes.shape(customSection)),
});

const video = module.exports.video = exact({
  ...videoBase,
  repository: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.oneOf([false]),
  ]),
  video_id: videoBase.video_id.isRequired,
});

const stream = module.exports.stream = exact({
  ...videoBase
});

const series = module.exports.series = exact({
  title: PropTypes.string.isRequired,
  redirect_from: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.String),
  ]),
  subtitle: PropTypes.string,
  layout: PropTypes.oneOf(['series-index']),
  series_number: PropTypes.number,
  reverse: PropTypes.bool,
});
