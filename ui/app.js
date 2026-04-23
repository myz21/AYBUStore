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

  function initHeaderScrollCollapse() {
    var header = byId("siteHeader");
    if (!header) return;

    var reduced =
      window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    var lastY = window.scrollY || 0;
    var ticking = false;
    var revealTop = 28;
    var collapseAfter = 56;
    var deltaThreshold = 6;

    function update() {
      ticking = false;
      var nav = byId("siteNav");
      if (nav && nav.classList.contains("open")) {
        body.classList.remove("site-header-collapsed");
        lastY = window.scrollY || 0;
        return;
      }

      var y = window.scrollY || 0;
      var delta = y - lastY;
      lastY = y;

      if (y < revealTop) {
        body.classList.remove("site-header-collapsed");
        return;
      }

      if (delta > deltaThreshold && y > collapseAfter) {
        body.classList.add("site-header-collapsed");
      } else if (delta < -deltaThreshold) {
        body.classList.remove("site-header-collapsed");
      }
    }

    function onScroll() {
      if (!ticking) {
        ticking = true;
        window.requestAnimationFrame(update);
      }
    }

    window.addEventListener("scroll", onScroll, { passive: true });
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
      if (href.indexOf("bolumler.html") !== -1) return "departments";
      if (href.indexOf("#mapSection") !== -1) return "store";
      return "other";
    }

    function syncActiveLink() {
      var path = window.location.pathname;
      var isIndexPage = /(^|\/)index\.html$/.test(path) || /\/ui\/?$/.test(path);
      var isDepartmentsPage = /(^|\/)bolumler\.html$/.test(path);
      var hash = window.location.hash;
      var key = null;

      if (isDepartmentsPage) {
        key = "departments";
      } else if (isIndexPage) {
        key = "home";
        if (hash === "#products") key = "products";
        else if (hash === "#mapSection") key = "store";
      }

      navLinks.forEach(function (link) {
        if (key && normalizeHref(link) === key) {
          link.setAttribute("aria-current", "page");
        } else {
          link.removeAttribute("aria-current");
        }
      });
    }

    function getHashFromHref(href) {
      if (!href) return "";
      if (href.charAt(0) === "#") return href;
      var indexHash = href.indexOf("#");
      if (indexHash === -1) return "";
      return href.slice(indexHash);
    }

    function isSamePageHashLink(link) {
      var href = link.getAttribute("href") || "";
      var hash = getHashFromHref(href);
      if (!hash) return false;
      if (href.charAt(0) === "#") return true;

      var path = window.location.pathname;
      var isIndexPage = /(^|\/)index\.html$/.test(path) || /\/ui\/?$/.test(path);
      return isIndexPage && /(^|\/)index\.html#/.test(href);
    }

    function smoothScrollToHash(hash) {
      var target = document.querySelector(hash);
      if (!target) return;

      var header = byId("siteHeader");
      var headerOffset = header ? header.offsetHeight + 14 : 96;
      var targetTop = target.getBoundingClientRect().top + window.scrollY - headerOffset;
      var prefersReduced = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      window.scrollTo({
        top: Math.max(0, targetTop),
        behavior: prefersReduced ? "auto" : "smooth"
      });
    }

    function smoothScrollToTop() {
      var prefersReduced = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      window.scrollTo({
        top: 0,
        behavior: prefersReduced ? "auto" : "smooth"
      });
    }

    function isIndexHomeLink(link) {
      var href = link.getAttribute("href") || "";
      if (href !== "index.html" && href !== "./" && href !== "/") return false;
      var path = window.location.pathname;
      return /(^|\/)index\.html$/.test(path) || /\/ui\/?$/.test(path);
    }

    function isModifiedClick(event) {
      return event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0;
    }

    function isExternalLink(href) {
      if (!href) return false;
      try {
        var parsed = new URL(href, window.location.href);
        return parsed.origin !== window.location.origin;
      } catch (err) {
        return false;
      }
    }

    function isSectionsPageLink(href) {
      return /(^|\/)bolumler\.html($|[#?])/.test(href || "");
    }

    function isHomePageLink(href) {
      return /(^|\/)index\.html($|[#?])/.test(href || "") || href === "./" || href === "/";
    }

    function runPageLeaveTransition(onDone) {
      var prefersReduced = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (prefersReduced) {
        onDone();
        return;
      }
      if (body.classList.contains("page-leave")) return;
      body.classList.add("page-leave");
      window.setTimeout(onDone, 230);
    }

    toggle.addEventListener("click", function () {
      var isOpen = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(isOpen));
    });

    navLinks.forEach(function (link) {
      link.addEventListener("click", function (event) {
        var href = link.getAttribute("href") || "";
        var hash = getHashFromHref(href);
        if (isModifiedClick(event)) return;

        if (isIndexHomeLink(link)) {
          event.preventDefault();
          smoothScrollToTop();
          if (window.location.hash) {
            window.history.pushState(null, "", window.location.pathname + window.location.search);
          }
        } else if (isSamePageHashLink(link) && hash) {
          event.preventDefault();
          smoothScrollToHash(hash);
          if (window.location.hash !== hash) {
            window.history.pushState(null, "", hash);
          }
        } else if (href && !isExternalLink(href) && href.charAt(0) !== "#") {
          event.preventDefault();
          if (isSectionsPageLink(href) || isHomePageLink(href)) {
            window.location.assign(href);
          } else {
            runPageLeaveTransition(function () {
              window.location.assign(href);
            });
          }
        }

        nav.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
        window.setTimeout(syncActiveLink, 0);
      });
    });

    window.addEventListener("hashchange", syncActiveLink);
    window.addEventListener("popstate", syncActiveLink);
    syncActiveLink();
  }

  function initSlider() {
    var track = byId("heroTrack");
    if (!track) return;

    var slides = qsa(".hero-slide");
    var dots = qsa(".dot");
    var prev = document.querySelector("[data-slide-prev]");
    var next = document.querySelector("[data-slide-next]");
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

  function initSectionReveal() {
    var sections = qsa("#products, #mapSection, .departments-content");
    if (!sections.length) return;

    var prefersReduced = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced || !("IntersectionObserver" in window)) {
      sections.forEach(function (section) {
        section.classList.add("is-visible");
      });
      return;
    }

    sections.forEach(function (section) {
      section.classList.add("section-reveal");
    });

    var observer = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        obs.unobserve(entry.target);
      });
    }, {
      threshold: 0.18,
      rootMargin: "0px 0px -8% 0px"
    });

    sections.forEach(function (section) {
      observer.observe(section);
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

  function initDesignModal() {
    var modal = byId("designModal");
    var overlay = byId("designOverlay");
    var openButtons = qsa("[data-design-open]");
    var closeButtons = qsa("[data-design-close]");
    var form = byId("designForm");
    var fileInput = byId("designFileInput");
    var previewBox = byId("designPreviewBox");
    var previewImage = byId("designPreviewImage");
    var previewReset = byId("designPreviewReset");
    var previewLabel = byId("designPreviewLabel");
    var placementSelect = byId("designPlacement");
    var placementBadge = byId("designPlacementBadge");
    var scaleInput = byId("designScale");
    var rotateInput = byId("designRotate");
    if (!modal || !overlay || !openButtons.length || !closeButtons.length || !form) return;

    var lastFocused = null;
    var defaultPreviewSrc = previewImage && previewImage.getAttribute("data-default-src") ? previewImage.getAttribute("data-default-src") : "";
    var defaultPreviewAlt = previewImage && previewImage.getAttribute("data-default-alt") ? previewImage.getAttribute("data-default-alt") : "Tasarım yüklenmedi";
    var defaultPreviewLabel = "Henüz dosya yüklenmedi";

    function setPreviewState(isLoaded, imageSrc, labelText) {
      if (!previewImage || !previewLabel || !previewBox) return;
      previewBox.classList.toggle("is-loaded", isLoaded);
      if (imageSrc) previewImage.src = imageSrc;
      previewImage.alt = isLoaded ? "Yüklenen tasarım önizlemesi" : defaultPreviewAlt;
      previewLabel.textContent = labelText;
      if (previewReset) {
        previewReset.hidden = !isLoaded;
      }
    }

    function resetPreview() {
      if (fileInput) {
        fileInput.value = "";
      }
      setPreviewState(false, defaultPreviewSrc, defaultPreviewLabel);
      if (scaleInput) scaleInput.value = "100";
      if (rotateInput) rotateInput.value = "0";
      applyPreviewTransform();
    }

    function applyPreviewTransform() {
      if (!previewBox) return;
      var scaleValue = scaleInput ? Number(scaleInput.value || 100) : 100;
      var rotateValue = rotateInput ? Number(rotateInput.value || 0) : 0;
      var scale = Math.max(0.6, Math.min(1.8, scaleValue / 100));
      previewBox.style.setProperty("--design-scale", String(scale));
      previewBox.style.setProperty("--design-rotate", String(rotateValue) + "deg");
    }

    function syncPlacementBadge() {
      if (!placementSelect || !placementBadge) return;
      placementBadge.textContent = placementSelect.value;
    }

    function setOpen(isOpen, source) {
      modal.classList.toggle("open", isOpen);
      modal.setAttribute("aria-hidden", String(!isOpen));
      overlay.hidden = !isOpen;
      body.classList.toggle("no-scroll", isOpen);

      if (isOpen) {
        lastFocused = source || document.activeElement;
        modal.focus();
      } else if (lastFocused && typeof lastFocused.focus === "function") {
        lastFocused.focus();
      }
    }

    openButtons.forEach(function (btn) {
      btn.addEventListener("click", function () {
        setOpen(true, btn);
      });
    });

    closeButtons.forEach(function (btn) {
      btn.addEventListener("click", function () {
        setOpen(false);
      });
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && modal.classList.contains("open")) {
        setOpen(false);
      }
    });

    if (fileInput && previewImage && previewLabel) {
      fileInput.addEventListener("change", function () {
        var file = fileInput.files && fileInput.files[0];
        if (!file) {
          resetPreview();
          return;
        }

        var reader = new FileReader();
        reader.onload = function (event) {
          var nextSrc = String(event.target && event.target.result ? event.target.result : previewImage.src);
          setPreviewState(true, nextSrc, file.name);
        };
        reader.readAsDataURL(file);
      });
    }

    if (fileInput && previewBox) {
      ["dragenter", "dragover"].forEach(function (eventName) {
        previewBox.addEventListener(eventName, function (event) {
          event.preventDefault();
          previewBox.classList.add("drag-over");
        });
      });

      ["dragleave", "drop"].forEach(function (eventName) {
        previewBox.addEventListener(eventName, function (event) {
          event.preventDefault();
          previewBox.classList.remove("drag-over");
        });
      });

      previewBox.addEventListener("drop", function (event) {
        var files = event.dataTransfer && event.dataTransfer.files;
        var droppedFile = files && files[0];
        if (!droppedFile || !/^image\//.test(droppedFile.type)) return;

        var reader = new FileReader();
        reader.onload = function (loadEvent) {
          var src = String(loadEvent.target && loadEvent.target.result ? loadEvent.target.result : previewImage.src);
          setPreviewState(true, src, droppedFile.name);
        };
        reader.readAsDataURL(droppedFile);
      });
    }

    if (previewReset) {
      previewReset.addEventListener("click", function () {
        resetPreview();
      });
    }

    if (placementSelect) {
      placementSelect.addEventListener("change", syncPlacementBadge);
    }

    if (scaleInput) {
      scaleInput.addEventListener("input", applyPreviewTransform);
    }

    if (rotateInput) {
      rotateInput.addEventListener("input", applyPreviewTransform);
    }

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var product = byId("designProduct");
      var placement = byId("designPlacement");
      var note = byId("designNote");

      window.alert(
        "Tasarım talebiniz alındı. Ürün: " +
        (product ? product.value : "-") +
        ", Konum: " +
        (placement ? placement.value : "-") +
        (note && note.value.trim() ? ", Not: " + note.value.trim() : "") +
        "."
      );
      setOpen(false);
    });

    syncPlacementBadge();
    applyPreviewTransform();
    resetPreview();
  }

  function initLoginForm() {
    var form = byId("loginForm");
    if (!form) return;
    if (form.getAttribute("data-auth-mode") === "firebase") return;

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
    if (form.getAttribute("data-auth-mode") === "firebase") return;

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
  initHeaderScrollCollapse();
  initMenu();
  initSlider();
  initMobileTabs();
  initHeaderSearch();
  initSectionReveal();
  initDesignModal();
  initCartDrawer();
  initLoginForm();
  initRegisterForm();
  initChatKit();
})();
