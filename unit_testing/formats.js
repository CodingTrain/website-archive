const PropTypes = require('prop-types');
const exact = require('prop-types-exact');

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
  url: PropTypes.string,
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
  video_number: PropTypes.number.isRequired,
  date: PropTypes.instanceOf(Date).isRequired,
  video_id: PropTypes.string,
  live_example: PropTypes.oneOfType([
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
  subtitle: PropTypes.string,
  layout: PropTypes.oneOf(['series-index']),
  series_number: PropTypes.number,
  reverse: PropTypes.bool,
});
