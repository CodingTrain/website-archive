/** The YouTube player on the current page. */
let CURRENT_PAGE_PLAYER = null;


/**
 * Skips the video to the timecode defined as the hash component of the URL.
 * This only happens if the timecode is bigger than zero.
 */
function skipVideoToHashTimecode() {
  const seconds = timecodeToSeconds(location.hash.substr(1));
  if (CURRENT_PAGE_PLAYER !== null && seconds > 0) CURRENT_PAGE_PLAYER.seekTo(seconds);
}


/**
 * Wait until the YouTube Iframe-API has loaded.
 */
function onYouTubeIframeAPIReady() {
  if (document.getElementById('video-player') === null) return;

  CURRENT_PAGE_PLAYER = new YT.Player('video-player', {
    videoId: document.getElementById('video-player').dataset.videoid,
    events: {
      onReady: skipVideoToHashTimecode
    }
  });
}


/**
 * Skip the video when the hash component of the URL changes.
 */
window.addEventListener('hashchange', skipVideoToHashTimecode);


/**
 * Convert youtube time codes (format: HH:MM:SS or MM:SS or SS) to seconds.
 *
 * @param {string} timecode   The youtube time code.
 */
function timecodeToSeconds(timecode) {
  let timeComponents = timecode.split(':');
  let seconds = 0;
  let minutes = 1;

  while (timeComponents.length > 0) {
    seconds += minutes * +timeComponents.pop();
    minutes *= 60;
  }

  return seconds;
}


// When the window has finished loading ...
window.addEventListener('load', () => {

  // ... attach and onClick listener to the navigation (background) to close the mobile navigation drawer.
  document.querySelector('.navigation')
    .addEventListener('click', e => document.querySelector('#nav-toggle').checked = false);

  // ... attach an onClick listener to the navigation child elements to prevent event propagation.
  // (childrens' onClick event doesn't trigger parent's onClick event)
  document.querySelectorAll('.navigation nav .links a')
    .forEach(
      node => node.addEventListener(
        'click', e => e.stopPropagation()
      )
    );
});
