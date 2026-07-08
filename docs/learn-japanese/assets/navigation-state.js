(function () {
  var bookKey = "jgb-book-location";
  var pagePrefix = "jgb-page-location:";
  var knownPages = {
    "vocabulary.html": "vocabulary",
    "practice.html": "practice",
    "exam.html": "exam",
    "review.html": "review"
  };

  var pagePaths = {
    "vocabulary.html": "pages/vocabulary.html",
    "practice.html": "pages/practice.html",
    "exam.html": "pages/exam.html",
    "review.html": "pages/review.html"
  };

  function readJSON(key) {
    try {
      return JSON.parse(localStorage.getItem(key) || "null");
    } catch (error) {
      return null;
    }
  }

  function writeJSON(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (error) {
      return false;
    }
  }

  function pageName() {
    return location.pathname.split("/").pop() || "index.html";
  }

  function relativePrefix() {
    var path = location.pathname;
    return path.indexOf("/pages/") !== -1 ? "../" : "";
  }

  function pageHref(file) {
    return relativePrefix() + (pagePaths[file] || file);
  }

  function hashValue() {
    return decodeURIComponent((location.hash || "").replace(/^#/, ""));
  }

  function pageKey(page) {
    return pagePrefix + page;
  }

  function savedPageForFile(file) {
    return knownPages[file] ? readJSON(pageKey(knownPages[file])) : null;
  }

  function savedHrefForFile(file, fallbackHref) {
    var saved = savedPageForFile(file);
    if (saved && saved.hash) return pageHref(file) + "#" + encodeURIComponent(saved.hash);
    return fallbackHref;
  }

  function decorateLinks() {
    var current = pageName();
    document.querySelectorAll("a[href]").forEach(function (link) {
      var rawHref = link.getAttribute("href") || "";
      var file = rawHref.split("#")[0].split("?")[0];
      var targetFile = file.split("/").pop();
      var isCurrent = targetFile === current || (!targetFile && current === "index.html");

      if (link.hasAttribute("data-book-return")) {
        link.setAttribute("href", window.JGB_NAV.bookHref());
      } else if (knownPages[targetFile] && rawHref.indexOf("#") === -1) {
        link.setAttribute("href", savedHrefForFile(targetFile, rawHref));
      }

      if (isCurrent && (link.classList.contains("book-link") || link.classList.contains("resource-link"))) {
        link.classList.add("active");
        link.setAttribute("aria-current", "page");
      }
    });
  }

  function savePage(page, extra) {
    var payload = Object.assign({
      hash: hashValue(),
      scrollY: Math.max(0, Math.round(window.scrollY || 0)),
      savedAt: Date.now()
    }, extra || {});
    writeJSON(pageKey(page), payload);
  }

  function trackPage(page, getExtra) {
    var timeout = null;
    function saveSoon() {
      if (timeout) window.clearTimeout(timeout);
      timeout = window.setTimeout(saveNow, 250);
    }
    function saveNow() {
      savePage(page, typeof getExtra === "function" ? getExtra() : {});
    }
    window.addEventListener("scroll", saveSoon, { passive: true });
    window.addEventListener("hashchange", saveNow);
    window.addEventListener("pagehide", saveNow);
    document.addEventListener("visibilitychange", function () {
      if (document.visibilityState === "hidden") saveNow();
    });
    saveNow();
  }

  function restorePageHash(page, isAllowed) {
    var saved = readJSON(pageKey(page));
    if (!saved || !saved.hash || location.hash) return false;
    if (typeof isAllowed === "function" && !isAllowed(saved.hash)) return false;
    location.replace(location.pathname + "#" + encodeURIComponent(saved.hash));
    return true;
  }

  function restorePageScroll(page) {
    var saved = readJSON(pageKey(page));
    if (!saved || typeof saved.scrollY !== "number") return false;
    if (saved.hash && saved.hash !== hashValue()) return false;
    window.requestAnimationFrame(function () {
      window.requestAnimationFrame(function () {
        window.scrollTo(0, saved.scrollY);
      });
    });
    return true;
  }

  function saveBookLocation(id) {
    writeJSON(bookKey, {
      id: id || hashValue() || "ch00",
      scrollY: Math.max(0, Math.round(window.scrollY || 0)),
      savedAt: Date.now()
    });
  }

  function trackBook(getId) {
    var timeout = null;
    function saveNow() {
      saveBookLocation(typeof getId === "function" ? getId() : hashValue());
    }
    function saveSoon() {
      if (timeout) window.clearTimeout(timeout);
      timeout = window.setTimeout(saveNow, 250);
    }
    window.addEventListener("scroll", saveSoon, { passive: true });
    window.addEventListener("hashchange", saveNow);
    window.addEventListener("pagehide", saveNow);
    document.addEventListener("visibilitychange", function () {
      if (document.visibilityState === "hidden") saveNow();
    });
    saveNow();
  }

  function restoreBookHash() {
    var saved = readJSON(bookKey);
    if (!saved || !saved.id || location.hash) return false;
    location.replace(location.pathname + "#" + encodeURIComponent(saved.id));
    return true;
  }

  function restoreBookScroll() {
    var saved = readJSON(bookKey);
    if (!saved || typeof saved.scrollY !== "number") return false;
    if (saved.id && saved.id !== hashValue()) return false;
    window.requestAnimationFrame(function () {
      window.requestAnimationFrame(function () {
        window.scrollTo(0, saved.scrollY);
      });
    });
    return true;
  }

  function bookHref() {
    var saved = readJSON(bookKey);
    var id = saved && saved.id ? saved.id : "ch00";
    return relativePrefix() + "index.html#" + encodeURIComponent(id);
  }

  window.JGB_NAV = {
    bookHref: bookHref,
    decorateLinks: decorateLinks,
    readPage: function (page) { return readJSON(pageKey(page)); },
    restoreBookHash: restoreBookHash,
    restoreBookScroll: restoreBookScroll,
    restorePageHash: restorePageHash,
    restorePageScroll: restorePageScroll,
    saveBookLocation: saveBookLocation,
    savePage: savePage,
    trackBook: trackBook,
    trackPage: trackPage
  };
}());
