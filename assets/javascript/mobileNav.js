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
        navButton.attr('aria-label', 'Menu expanded');
        navContainer.addClass('active');
        mbBackdrop.addClass('active');
        navButton.addClass('active');

        navMenu.removeAttr('aria-hidden');
        navLinks.removeAttr('tabIndex');
        setTimeout(function () {
            navLinks.eq(0).focus();
            //      navLinks.eq(0).css('outline', 'rgb(0, 0, 139) auto 2px'); // for consistency.
        }, 50);
    }

    function disableNavLinks() {
        navButton.attr('aria-label', 'Menu collapsed');
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