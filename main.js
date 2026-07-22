// Site-wide search index — title, url, and category tag for every real content page
var SEARCH_INDEX = [
  { title: "boAt Rockerz 371 Bluetooth Headphones", url: "deal-wireless-headphones.html", tag: "Electronics" },
  { title: "Havells Prolife Stellar Air Fryer, 5.5L", url: "deal-air-fryer.html", tag: "Home & Kitchen" },
  { title: "Noise Twist Smartwatch with BT Calling", url: "deal-smartwatch.html", tag: "Wearables" },
  { title: "SKIN1004 Madagascar Centella Travel Kit", url: "deal-skincare-set.html", tag: "Beauty" },
  { title: "Lightweight Mesh Running Shoes for Men", url: "deal-running-shoes.html", tag: "Fashion" },
  { title: "1-Year Antivirus + VPN Bundle License", url: "deal-antivirus-vpn.html", tag: "Software & Apps" },
  { title: "Amazon Pay Gift Card — Instant Delivery", url: "deal-amazon-gift-card.html", tag: "Gift Cards" },
  { title: "Bestselling Self-Help Book Bundle, 3 Titles", url: "deal-book-bundle.html", tag: "Books" },
  { title: "6-Month OTT Streaming Subscription Bundle", url: "deal-streaming-subscription.html", tag: "Movies & Music" },
  { title: "Portable Waterproof Bluetooth Speaker", url: "deal-bluetooth-speaker.html", tag: "Electronics" },
  { title: "5 Signs It's Time to Upgrade Your Smartphone", url: "blog-smartphone-upgrade-signs.html", tag: "Blog" },
  { title: "How to Spot a Fake Discount Before You Buy", url: "blog-spot-fake-discounts.html", tag: "Blog" },
  { title: "SSD vs HDD: Which Do You Actually Need in 2026", url: "blog-ssd-vs-hdd.html", tag: "Blog" },
  { title: "How to Extend Your Laptop's Battery Life", url: "blog-laptop-battery-life.html", tag: "Blog" },
  { title: "Wired vs Wireless Earbuds: Which Should You Buy", url: "blog-wired-vs-wireless-earbuds.html", tag: "Blog" },
  { title: "Warranty vs Extended Warranty: What's Worth Paying For", url: "blog-warranty-vs-extended-warranty.html", tag: "Blog" },
  { title: "How to Safely Buy Refurbished Electronics Online", url: "blog-buying-refurbished-electronics.html", tag: "Blog" },
  { title: "5 Smartphone Settings You Should Change Today", url: "blog-smartphone-settings-to-change.html", tag: "Blog" },
  { title: "Air Fryer vs OTG: Which Kitchen Appliance Wins", url: "blog-air-fryer-vs-otg.html", tag: "Blog" },
  { title: "How to Protect Your Online Shopping Accounts From Fraud", url: "blog-protect-shopping-accounts-fraud.html", tag: "Blog" },
  { title: "Electronics Deals", url: "category-electronics.html", tag: "Category" },
  { title: "Fashion Deals", url: "category-fashion.html", tag: "Category" },
  { title: "Home & Kitchen Deals", url: "category-home-kitchen.html", tag: "Category" },
  { title: "Wearables Deals", url: "category-wearables.html", tag: "Category" },
  { title: "Beauty Deals", url: "category-beauty.html", tag: "Category" },
  { title: "Software & Apps Deals", url: "category-software-apps.html", tag: "Category" },
  { title: "Gift Cards Deals", url: "category-gift-cards.html", tag: "Category" },
  { title: "Books Deals", url: "category-books.html", tag: "Category" },
  { title: "Movies & Music Deals", url: "category-movies-music.html", tag: "Category" },
  { title: "All Deals", url: "deals.html", tag: "Page" },
  { title: "Blog", url: "blog.html", tag: "Page" },
  { title: "Reviews", url: "reviews.html", tag: "Page" },
  { title: "About Us", url: "about.html", tag: "Page" },
  { title: "Contact Us", url: "contact.html", tag: "Page" },
  { title: "Advertise With Us", url: "advertise.html", tag: "Page" },
  { title: "Privacy Policy", url: "privacy-policy.html", tag: "Page" },
  { title: "Affiliate Disclosure", url: "affiliate-disclosure.html", tag: "Page" },
  { title: "Terms & Conditions", url: "terms.html", tag: "Page" }
];
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
  var searchInput = document.querySelector('.search-panel input');
  var searchResults = document.querySelector('.search-results');

  function closeSearch() {
    if (searchPanel) searchPanel.classList.remove('open');
    if (searchResults) searchResults.innerHTML = '';
  }

  function runSearch(query) {
    if (!searchResults) return;
    query = query.trim().toLowerCase();
    if (!query) { searchResults.innerHTML = ''; return; }

    var matches = SEARCH_INDEX.filter(function (item) {
      return item.title.toLowerCase().indexOf(query) !== -1 || item.tag.toLowerCase().indexOf(query) !== -1;
    }).slice(0, 8);

    if (matches.length === 0) {
      searchResults.innerHTML = '<div class="search-empty">No results — try a different word.</div>';
      return;
    }

    searchResults.innerHTML = matches.map(function (item) {
      return '<a href="' + item.url + '" class="search-result-item">' +
        '<span class="sr-title">' + item.title + '</span>' +
        '<span class="sr-tag">' + item.tag + '</span></a>';
    }).join('');
  }

  if (searchToggle && searchPanel) {
    searchToggle.addEventListener('click', function (e) {
      e.stopPropagation();
      searchPanel.classList.toggle('open');
      if (searchPanel.classList.contains('open') && searchInput) {
        searchInput.focus();
      }
    });

    document.addEventListener('click', function (e) {
      if (searchPanel.classList.contains('open') && !searchPanel.contains(e.target) && e.target !== searchToggle) {
        closeSearch();
      }
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeSearch();
    });
  }

  if (searchInput) {
    searchInput.addEventListener('input', function () {
      runSearch(searchInput.value);
    });
  }

  var searchFormEl = document.querySelector('.search-panel form');
  if (searchFormEl) {
    searchFormEl.addEventListener('submit', function (e) {
      e.preventDefault();
      if (searchResults && searchResults.firstElementChild && searchResults.firstElementChild.href) {
        window.location.href = searchResults.firstElementChild.href;
      }
    });
  }

  // ---- Dark / light mode toggle ----
  var themeToggle = document.querySelector('.theme-toggle');
  if (themeToggle) {
    var sunIcon = themeToggle.querySelector('.theme-icon-sun');
    var moonIcon = themeToggle.querySelector('.theme-icon-moon');

    function updateToggleIcon() {
      var isDark = document.documentElement.getAttribute('data-theme') === 'dark';
      if (sunIcon) sunIcon.style.display = isDark ? 'none' : 'block';
      if (moonIcon) moonIcon.style.display = isDark ? 'block' : 'none';
    }
    updateToggleIcon();

    themeToggle.addEventListener('click', function () {
      var isDark = document.documentElement.getAttribute('data-theme') === 'dark';
      if (isDark) {
        document.documentElement.removeAttribute('data-theme');
        localStorage.setItem('tot-theme', 'light');
      } else {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('tot-theme', 'dark');
      }
      updateToggleIcon();
    });
  }

  // ---- Share widget ----
  var shareWidget = document.querySelector('.share-widget');
  if (shareWidget) {
    var pageUrl = encodeURIComponent(window.location.href);
    var pageTitle = encodeURIComponent(document.title);
    var waLink = shareWidget.querySelector('.share-wa');
    var xLink = shareWidget.querySelector('.share-x');
    var fbLink = shareWidget.querySelector('.share-fb');
    var liLink = shareWidget.querySelector('.share-li');
    if (waLink) waLink.href = 'https://wa.me/?text=' + pageTitle + '%20' + pageUrl;
    if (xLink) xLink.href = 'https://twitter.com/intent/tweet?text=' + pageTitle + '&url=' + pageUrl;
    if (fbLink) fbLink.href = 'https://www.facebook.com/sharer/sharer.php?u=' + pageUrl;
    if (liLink) liLink.href = 'https://www.linkedin.com/sharing/share-offsite/?url=' + pageUrl;

    var shareToggle = shareWidget.querySelector('.share-toggle');
    if (shareToggle) {
      shareToggle.addEventListener('click', function (e) {
        e.stopPropagation();
        shareWidget.classList.toggle('open');
      });
      document.addEventListener('click', function (e) {
        if (!shareWidget.contains(e.target)) shareWidget.classList.remove('open');
      });
    }
  }
});
