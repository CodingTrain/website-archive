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

document.addEventListener('DOMContentLoaded', function (event) {
  var NavApp = {};
  NavApp.App = (function () {
    var navButton = document.getElementById('menu-button');
    var navMenu = document.getElementById('global-nav');
    var navLinks = Array.from(document.querySelectorAll('#global-nav a'));
    var navContainer = document.getElementById('nav-container');
    var mbBackdrop = document.getElementById('mobilenav-backdrop');
    var ESCAPE_CODE = 27;

    function initApp() {
      navButton.addEventListener('click', toggleMobileNav);
      navMenu.addEventListener('keydown', handleKeydown);
      navButton.setAttribute('aria-label', 'Open navigation menu');
    }

    function handleKeydown(event) {
      if (event.keyCode === ESCAPE_CODE) {
        navContainer.classList.remove('active');
        mbBackdrop.classList.remove('active');
        navButton.classList.remove('active');
        disableNavLinks();
        navButton.focus();
      }
    }

    function toggleMobileNav() {
      if (mbBackdrop.classList.contains('active')) {
        disableNavLinks();
      } else {
        enableNavLinks();
      }
    }

    function enableNavLinks() {
      navButton.setAttribute('aria-label', 'Close navigation menu');
      navContainer.classList.add('active');
      mbBackdrop.classList.add('active');
      navButton.classList.add('active');

      navMenu.removeAttribute('aria-hidden');
      navLinks.forEach(function (el) {
        el.removeAttribute('tabIndex');
      });
      setTimeout(function () {
        navLinks[0].focus();
      }, 200);
    }

    function disableNavLinks() {
      navButton.setAttribute('aria-label', 'Open navigation menu');
      navContainer.classList.remove('active');
      mbBackdrop.classList.remove('active');
      navButton.classList.remove('active');

      navMenu.setAttribute('aria-hidden', 'true');
      navLinks.forEach(function (el) {
        el.setAttribute('tabIndex', '-1');
      });

    }
    return {
      init: function () {
        initApp();
      }
    }
  })();
  new NavApp.App.init();
});