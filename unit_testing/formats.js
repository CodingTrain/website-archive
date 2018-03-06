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
})

const video = module.exports.video = exact({
  title: PropTypes.string.isRequired,
  video_number: PropTypes.number.isRequired,
  date: PropTypes.instanceOf(Date).isRequired,
  video_id: PropTypes.string.isRequired,
  repository: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.oneOf([false]),
  ]),
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
  contributions: PropTypes.arrayOf(PropTypes.shape(link)),
});
