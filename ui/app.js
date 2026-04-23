(function () {
  var body = document.body;

  function byId(id) {
    return document.getElementById(id);
  }

  function qsa(sel) {
    return Array.prototype.slice.call(document.querySelectorAll(sel));
  }

  function initYear() {
    var y = byId("yearNow");
    if (y) y.textContent = String(new Date().getFullYear());
  }

  function initMenu() {
    var toggle = byId("menuToggle");
    var nav = byId("siteNav");
    if (!toggle || !nav) return;

    var navLinks = qsa("#siteNav a");

    function normalizeHref(link) {
      var href = link.getAttribute("href") || "";
      if (href === "index.html" || href === "./" || href === "/") return "home";
      if (href.indexOf("#products") !== -1) return "products";
      if (href.indexOf("#mapSection") !== -1) return "store";
      return "other";
    }

    function syncActiveLink() {
      var path = window.location.pathname;
      var isIndexPage = /(^|\/)index\.html$/.test(path) || /\/ui\/?$/.test(path);
      var hash = window.location.hash;
      var key = isIndexPage ? "home" : null;
      if (isIndexPage && hash === "#products") key = "products";
      else if (isIndexPage && hash === "#mapSection") key = "store";

      navLinks.forEach(function (link) {
        if (key && normalizeHref(link) === key) {
          link.setAttribute("aria-current", "page");
        } else {
          link.removeAttribute("aria-current");
        }
      });
    }

    toggle.addEventListener("click", function () {
      var isOpen = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(isOpen));
    });

    navLinks.forEach(function (link) {
      link.addEventListener("click", function () {
        nav.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
        syncActiveLink();
      });
    });

    window.addEventListener("hashchange", syncActiveLink);
    syncActiveLink();
  }

  function initSlider() {
    var track = byId("heroTrack");
    if (!track) return;

    var slides = qsa(".hero-slide");
    var dotsWrap = byId("heroDots");
    var dots = [];
    var prev = document.querySelector("[data-slide-prev]");
    var next = document.querySelector("[data-slide-next]");
    if (!slides.length) return;

    if (dotsWrap) {
      dotsWrap.innerHTML = slides.map(function (_, i) {
        return '<button class="dot' + (i === 0 ? " active" : "") + '" type="button" data-slide-to="' + i + '" aria-label="Slayt ' + (i + 1) + '"></button>';
      }).join("");
      dots = qsa("#heroDots .dot");
    }
    var index = 0;
    var timer = null;

    function render() {
      slides.forEach(function (slide, i) {
        slide.classList.toggle("active", i === index);
      });
      dots.forEach(function (dot, i) {
        dot.classList.toggle("active", i === index);
      });
    }

    function go(to) {
      index = (to + slides.length) % slides.length;
      render();
    }

    function startAuto() {
      stopAuto();
      timer = window.setInterval(function () {
        go(index + 1);
      }, 4500);
    }

    function stopAuto() {
      if (timer) {
        window.clearInterval(timer);
        timer = null;
      }
    }

    if (prev) {
      prev.addEventListener("click", function () {
        go(index - 1);
        startAuto();
      });
    }

    if (next) {
      next.addEventListener("click", function () {
        go(index + 1);
        startAuto();
      });
    }

    dots.forEach(function (dot) {
      dot.addEventListener("click", function () {
        var to = Number(dot.getAttribute("data-slide-to"));
        if (!Number.isNaN(to)) {
          go(to);
          startAuto();
        }
      });
    });

    render();
    startAuto();
  }

  function initMobileTabs() {
    var track = byId("tabTrack");
    if (!track) return;

    var prev = document.querySelector("[data-tabs-prev]");
    var next = document.querySelector("[data-tabs-next]");
    var step = 220;

    function scrollBy(dx) {
      track.scrollBy({ left: dx, behavior: "smooth" });
    }

    if (prev) prev.addEventListener("click", function () { scrollBy(-step); });
    if (next) next.addEventListener("click", function () { scrollBy(step); });
  }

  function initProductViewModes() {
    var grid = byId("productGrid");
    if (!grid) return;

    var cards = qsa("#productGrid .product-card");
    var buttons = qsa("[data-view-mode]");
    var pager = byId("productsPager");
    var pagerInfo = byId("productsPagerInfo");
    var prevBtn = document.querySelector("[data-products-prev]");
    var nextBtn = document.querySelector("[data-products-next]");
    if (!cards.length || !buttons.length || !pager || !pagerInfo || !prevBtn || !nextBtn) return;

    var mode = "all";
    var page = 0;
    var chunkSize = 4;

    function totalPages() {
      return Math.max(1, Math.ceil(cards.length / chunkSize));
    }

    function syncButtons() {
      buttons.forEach(function (btn) {
        var active = btn.getAttribute("data-view-mode") === mode;
        btn.classList.toggle("active", active);
        btn.setAttribute("aria-pressed", String(active));
      });
    }

    function renderCards() {
      grid.classList.toggle("mode-list", mode === "list");
      pager.hidden = mode !== "four";

      cards.forEach(function (card, index) {
        var hidden = false;
        if (mode === "four") {
          var start = page * chunkSize;
          var end = start + chunkSize;
          hidden = index < start || index >= end;
        }
        card.classList.toggle("is-hidden", hidden);
      });

      if (mode === "four") {
        var pages = totalPages();
        pagerInfo.textContent = String(page + 1) + " / " + String(pages);
        prevBtn.disabled = page === 0;
        nextBtn.disabled = page >= pages - 1;
      }
    }

    buttons.forEach(function (btn) {
      btn.addEventListener("click", function () {
        mode = btn.getAttribute("data-view-mode") || "all";
        page = 0;
        syncButtons();
        renderCards();
      });
    });

    prevBtn.addEventListener("click", function () {
      if (page > 0) {
        page -= 1;
        renderCards();
      }
    });

    nextBtn.addEventListener("click", function () {
      if (page < totalPages() - 1) {
        page += 1;
        renderCards();
      }
    });

    syncButtons();
    renderCards();
  }

  function initHeaderSearch() {
    var toggles = qsa("[data-search-toggle]");
    if (!toggles.length) return;

    toggles.forEach(function (toggle) {
      var actions = toggle.closest(".header-actions");
      if (!actions) return;
      var input = actions.querySelector(".header-search-input");
      if (!input) return;

      function setOpen(isOpen) {
        actions.classList.toggle("search-open", isOpen);
        toggle.setAttribute("aria-expanded", String(isOpen));
        if (isOpen) {
          window.setTimeout(function () {
            input.focus();
          }, 120);
        }
      }

      toggle.addEventListener("click", function () {
        setOpen(!actions.classList.contains("search-open"));
      });

      input.addEventListener("keydown", function (e) {
        if (e.key === "Escape") {
          setOpen(false);
          toggle.focus();
        }
      });

      document.addEventListener("click", function (e) {
        if (!actions.contains(e.target)) {
          setOpen(false);
        }
      });
    });
  }

  function initCartDrawer() {
    var drawer = byId("cartDrawer");
    var overlay = byId("drawerOverlay");
    var openButtons = qsa("[data-cart-open]");
    var closeButtons = qsa("[data-cart-close]");
    if (!drawer || !overlay || !openButtons.length) return;

    var lastFocused = null;

    function drawerFocusable() {
      return qsa("#cartDrawer button, #cartDrawer a, #cartDrawer input, #cartDrawer select, #cartDrawer textarea").filter(function (el) {
        return !el.hasAttribute("disabled") && el.tabIndex !== -1;
      });
    }

    function trapFocus(e) {
      if (drawer.getAttribute("aria-hidden") === "true") return;
      if (e.key !== "Tab") return;

      var nodes = drawerFocusable();
      if (!nodes.length) return;

      var first = nodes[0];
      var last = nodes[nodes.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }

    function openDrawer(fromButton) {
      lastFocused = fromButton || document.activeElement;
      drawer.classList.add("open");
      drawer.setAttribute("aria-hidden", "false");
      overlay.hidden = false;
      body.classList.add("no-scroll");

      openButtons.forEach(function (btn) {
        btn.setAttribute("aria-expanded", "true");
      });

      var nodes = drawerFocusable();
      if (nodes.length) {
        nodes[0].focus();
      } else {
        drawer.focus();
      }
    }

    function closeDrawer() {
      drawer.classList.remove("open");
      drawer.setAttribute("aria-hidden", "true");
      overlay.hidden = true;
      body.classList.remove("no-scroll");

      openButtons.forEach(function (btn) {
        btn.setAttribute("aria-expanded", "false");
      });

      if (lastFocused && typeof lastFocused.focus === "function") {
        lastFocused.focus();
      }
    }

    openButtons.forEach(function (btn) {
      btn.addEventListener("click", function () {
        openDrawer(btn);
      });
    });

    closeButtons.forEach(function (btn) {
      btn.addEventListener("click", function () {
        closeDrawer();
      });
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && drawer.getAttribute("aria-hidden") === "false") {
        closeDrawer();
      }
      trapFocus(e);
    });
  }

  function initLoginForm() {
    var form = byId("loginForm");
    if (!form) return;

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var email = form.querySelector("#email");
      var password = form.querySelector("#password");

      if (!email || !password || !email.value.trim() || !password.value.trim()) {
        window.alert("Lütfen e-posta ve şifre alanlarını doldurun.");
        return;
      }

      window.alert("Demo giriş başarılı. Backend entegrasyonu bu aşamada dahil değildir.");
    });
  }

  function initRegisterForm() {
    var form = byId("registerForm");
    if (!form) return;

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var name = form.querySelector("#regName");
      var email = form.querySelector("#regEmail");
      var password = form.querySelector("#regPassword");

      if (!name || !email || !password || !name.value.trim() || !email.value.trim() || !password.value.trim()) {
        window.alert("Lütfen ad soyad, e-posta ve şifre alanlarını doldurun.");
        return;
      }

      window.alert("Demo üyelik oluşturuldu. Backend entegrasyonu bu aşamada dahil değildir.");
    });
  }

  function initChatKit() {
    var chat = byId("chatkit");
    var openBtn = document.querySelector("[data-chatkit-open]");
    var closeBtn = document.querySelector("[data-chatkit-close]");
    var form = byId("chatkitForm");
    var input = byId("chatkitText");
    var bodyEl = byId("chatkitBody");
    if (!chat || !openBtn || !closeBtn || !form || !input || !bodyEl) return;

    function setOpen(isOpen) {
      chat.classList.toggle("open", isOpen);
      chat.setAttribute("aria-hidden", String(!isOpen));
      if (isOpen) {
        input.focus();
      } else {
        openBtn.focus();
      }
    }

    function addMessage(text, who) {
      var wrap = document.createElement("div");
      wrap.className = "chatkit-msg " + who;

      var bubble = document.createElement("div");
      bubble.className = "bubble";
      bubble.textContent = text;

      var meta = document.createElement("div");
      meta.className = "meta";
      meta.textContent = (who === "user" ? "Siz" : "AYBU Store") + " • şimdi";

      wrap.appendChild(bubble);
      wrap.appendChild(meta);
      bodyEl.appendChild(wrap);
      bodyEl.scrollTop = bodyEl.scrollHeight;
    }

    openBtn.addEventListener("click", function () {
      setOpen(true);
    });

    closeBtn.addEventListener("click", function () {
      setOpen(false);
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && chat.classList.contains("open")) {
        setOpen(false);
      }
    });

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var text = input.value.trim();
      if (!text) return;
      input.value = "";
      addMessage(text, "user");

      window.setTimeout(function () {
        addMessage("Teşekkürler! Bu demo arayüzde mesajınız alındı. Birazdan dönüş yapacağız.", "bot");
      }, 450);
    });
  }

  initYear();
  initMenu();
  initSlider();
  initMobileTabs();
  initProductViewModes();
  initHeaderSearch();
  initCartDrawer();
  initLoginForm();
  initRegisterForm();
  initChatKit();
})();
