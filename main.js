// Mobile nav toggle — shared across all pages
document.addEventListener('DOMContentLoaded', function () {
  var toggle = document.querySelector('.menu-toggle');
  var nav = document.querySelector('nav');
  var overlay = document.querySelector('.nav-overlay');

  if (!toggle || !nav) return;

  function closeMenu() {
    nav.classList.remove('open');
    toggle.classList.remove('open');
    if (overlay) overlay.classList.remove('open');
  }

  function openMenu() {
    nav.classList.add('open');
    toggle.classList.add('open');
    if (overlay) overlay.classList.add('open');
  }

  toggle.addEventListener('click', function () {
    if (nav.classList.contains('open')) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  if (overlay) {
    overlay.addEventListener('click', closeMenu);
  }

  // Close menu when a nav link is tapped
  nav.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', closeMenu);
  });
});
