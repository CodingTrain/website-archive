/** The YouTube player on the current page. */
let CURRENT_PAGE_PLAYER = null;

/**
 * Skips the video to the timecode defined as the hash component of the URL.
 * This only happens if the timecode is bigger than zero.
 */
function skipVideoToHashTimecode() {
  const seconds = timecodeToSeconds(location.hash.substr(1));
  if (CURRENT_PAGE_PLAYER !== null && seconds > 0) 
    CURRENT_PAGE_PLAYER.seekTo(seconds);
  }

/**
 * Wait until the YouTube Iframe-API has loaded.
 */
function onYouTubeIframeAPIReady() {
  if (document.getElementById('video-player') === null) 
    return;
  
  CURRENT_PAGE_PLAYER = new YT.Player('video-player', {
    videoId: document
      .getElementById('video-player')
      .dataset
      .videoid,
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
    seconds += minutes * + timeComponents.pop();
    minutes *= 60;
  }

  return seconds;
}

class NavApplication {

  constructor() {
    this.navButton = document.getElementById('menu-button');
    this.navMenu = document.getElementById('global-nav');
    this.navLinks = [...(document.getElementsByClassName('top-link'))];
    this.mbBackdrop = document.getElementById('mobilenav-backdrop');
    this.ESCAPE_CODE = 27;

    this.escapeSubMenu = false;

    this.subMenuButtons = document.getElementsByClassName('submenu-button');
    this.subMenus = document.getElementsByClassName('submenu');

    this.handleKeydown = this
      .handleKeydown
      .bind(this);
    this.toggleMobileNav = this
      .toggleMobileNav
      .bind(this);
    this.toggleSubMenu = this
      .toggleSubMenu
      .bind(this);
    this.closeSubMenus = this
      .closeSubMenus
      .bind(this);
    this.enableNavLinks = this
      .enableNavLinks
      .bind(this);
    this.disableNavLinks = this
      .disableNavLinks
      .bind(this);

    this
      .navButton
      .addEventListener('click', this.toggleMobileNav);
    this
      .navMenu
      .addEventListener('keydown', this.handleKeydown);
    this
      .navButton
      .setAttribute('aria-label', 'Open navigation menu');
    this.setUpBackToTopButton();

    this.setupSubMenus();

    // if this changes sass needs to be updated too
    if (window.innerWidth <= 700) { // if in mobile
      this.disableNavLinks();
    }
  }

  setupSubMenus() {
    for (let i = 0; i < this.subMenuButtons.length; i++) {
      this
        .subMenuButtons[i]
        .addEventListener('click', this.toggleSubMenu);
    }

    this.closeSubMenus(); // sets the open text
  }

  toggleSubMenu(event) {
    const button = event.srcElement;
    const forAttribute = button.getAttribute('for');
    const subMenu = document.getElementById(forAttribute);
    const openMenu = !subMenu
      .classList
      .contains('active');
    this.closeSubMenus();
    if (openMenu) {
      this.escapeSubMenu = true;

      button.setAttribute('aria-label', `Close ${forAttribute.split('-')[0]} Submenu`);
      subMenu
        .classList
        .add('active');
      subMenu.removeAttribute('aria-hidden');

      ([...(subMenu.querySelectorAll('a'))]).forEach(el => {
        el.removeAttribute('tabIndex');
      });
    }
  }

  closeSubMenus() {
    for (let i = 0; i < this.subMenuButtons.length; i++) {
      const name = this
        .subMenuButtons[i]
        .getAttribute('for')
        .split('-')[0];
      this
        .subMenuButtons[i]
        .setAttribute('aria-label', `Open ${name} Submenu`);
    }
    for (let i = 0; i < this.subMenus.length; i++) {
      this
        .subMenus[i]
        .classList
        .remove('active');
      this
        .subMenus[i]
        .setAttribute('aria-hidden', 'true');

      ([...(this.subMenus[i].querySelectorAll('a'))]).forEach(el => {
        el.setAttribute('tabIndex', -1);
      });
    }
    this.escapeSubMenu = false;
  }

  handleKeydown(event) {
    if (event.keyCode === this.ESCAPE_CODE) {
      if (this.escapeSubMenu) {
        this.closeSubMenus();
      } else {
        this.disableNavLinks();
        this
          .navButton
          .focus();
      }
    }
  }

  toggleMobileNav() {
    if (this.mbBackdrop.classList.contains('active')) {
      this.disableNavLinks();
    } else {
      this.enableNavLinks();
    }
  }

  enableNavLinks() {
    this
      .navButton
      .setAttribute('aria-label', 'Close navigation menu');
    this
      .navMenu
      .classList
      .add('active');
    this
      .mbBackdrop
      .classList
      .add('active');
    this
      .navButton
      .classList
      .add('active');

    this
      .navMenu
      .removeAttribute('aria-hidden');
    this
      .navLinks
      .forEach((el) => {
        el.removeAttribute('tabIndex');
      });
    setTimeout(() => {
      this
        .navLinks[0]
        .focus();
    }, 200);
  }

  disableNavLinks() {
    this
      .navButton
      .setAttribute('aria-label', 'Open navigation menu');
    this
      .navMenu
      .classList
      .remove('active');
    this
      .mbBackdrop
      .classList
      .remove('active');
    this
      .navButton
      .classList
      .remove('active');

    this
      .navMenu
      .setAttribute('aria-hidden', 'true');
    this
      .navLinks
      .forEach((el) => {
        el.setAttribute('tabIndex', '-1');
      });
  }

  setUpBackToTopButton() {
    const backToTopButton = document.querySelector('.back-to-top-button');
    document.addEventListener('scroll', () => {
      if (window.scrollY > 1000) {
        backToTopButton
          .classList
          .add('active');
      } else {
        backToTopButton
          .classList
          .remove('active');
      }
    });
    backToTopButton.addEventListener('click', () => {
      window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
    });
  }

}

document
  .addEventListener('DOMContentLoaded', function (event) {
    const NavApp = new NavApplication();
  });