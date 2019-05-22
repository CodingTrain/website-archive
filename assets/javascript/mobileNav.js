var NavApp = {};
NavApp.App = (function () {
    var navButton = $('#menu-button');
    var navMenu = $('#global-nav');
    var navLinks = navMenu.find('a');
    var navContainer = $('#nav-container');
    var mbBackdrop = $('#mobilenav-backdrop');
    var ESCAPE_CODE = 27;

    function initApp() {
        navButton.on('click', toggleMobileNav);
        navMenu.on('keydown', handleKeydown);
        navButton.attr('aria-label', 'Open navigation menu');
    }

    function handleKeydown() {
        if (event.keyCode === ESCAPE_CODE) {
            navContainer.removeClass('active');
            mbBackdrop.removeClass('active');
            navButton.removeClass('active');
            disableNavLinks();
            navButton.focus();
        }
    }

    function toggleMobileNav() {
        if (mbBackdrop.hasClass('active')) {
            disableNavLinks();
        } else {
            enableNavLinks();
        }
    }

    function enableNavLinks() {
        navButton.attr('aria-label', 'Close navigation menu');
        navContainer.addClass('active');
        mbBackdrop.addClass('active');
        navButton.addClass('active');

        navMenu.removeAttr('aria-hidden');
        navLinks.removeAttr('tabIndex');
        setTimeout(function () {
            navLinks.eq(0).focus();
        }, 200);
    }

    function disableNavLinks() {
        navButton.attr('aria-label', 'Open navigation menu');
        navContainer.removeClass('active');
        mbBackdrop.removeClass('active');
        navButton.removeClass('active');

        navMenu.attr('aria-hidden', 'true');
        navLinks.attr('tabIndex', '-1');
    }
    return {
        init: function () {
            initApp();
        }
    }
})();

$(document).ready(function ($) {
    new NavApp.App.init();
});