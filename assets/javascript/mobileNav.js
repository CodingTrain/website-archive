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

    function handleKeydown() {
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

    function toggleActiveClass(el) {
        if (el.classList.contains('active')) {
            el.classList.remove('active');
        } else {
            el.classList.add('active');
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

document.addEventListener("DOMContentLoaded", function () {
    new NavApp.App.init();
});