// Mobile nav toggle, back-to-top, and search — shared across all pages
document.addEventListener('DOMContentLoaded', function () {
  // ---- Mobile nav toggle ----
  var toggle = document.querySelector('.menu-toggle');
  var nav = document.querySelector('nav');
  var overlay = document.querySelector('.nav-overlay');

  function closeMenu() {
    if (nav) nav.classList.remove('open');
    if (toggle) toggle.classList.remove('open');
    if (overlay) overlay.classList.remove('open');
  }

  function openMenu() {
    if (nav) nav.classList.add('open');
    if (toggle) toggle.classList.add('open');
    if (overlay) overlay.classList.add('open');
  }

  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      if (nav.classList.contains('open')) {
        closeMenu();
      } else {
        openMenu();
      }
    });
    if (overlay) overlay.addEventListener('click', closeMenu);
    nav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', closeMenu);
    });
  }

  // ---- Back to top ----
  var backToTop = document.querySelector('.back-to-top');
  if (backToTop) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 500) {
        backToTop.classList.add('show');
      } else {
        backToTop.classList.remove('show');
      }
    });
    backToTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ---- Search ----
  var searchToggle = document.querySelector('.search-toggle');
  var searchPanel = document.querySelector('.search-panel');
  var searchForm = document.querySelector('.search-panel form');
  var searchInput = document.querySelector('.search-panel input');

  function closeSearch() {
    if (searchPanel) searchPanel.classList.remove('open');
  }

  if (searchToggle && searchPanel) {
    searchToggle.addEventListener('click', function (e) {
      e.stopPropagation();
      searchPanel.classList.toggle('open');
      if (searchPanel.classList.contains('open') && searchInput) {
        searchInput.focus();
      }
    });

    // Close when clicking anywhere outside the search panel
    document.addEventListener('click', function (e) {
      if (searchPanel.classList.contains('open') && !searchPanel.contains(e.target) && e.target !== searchToggle) {
        closeSearch();
      }
    });

    // Close on Escape
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeSearch();
    });
  }

  if (searchForm) {
    searchForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var query = searchInput ? searchInput.value.trim() : '';
      if (!query) return;
      var url = 'https://www.google.com/search?q=' + encodeURIComponent('site:theonlinetricks.com ' + query);
      window.open(url, '_blank');
      closeSearch();
      searchInput.value = '';
    });
  }
});
