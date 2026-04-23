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

  function initThemeToggle() {
    var toggle = document.querySelector("[data-theme-toggle]");
    if (!toggle) return;

    var bodyEl = document.body;
    var label = toggle.querySelector(".theme-toggle-label");
    var storageKey = "aybu-theme";

    function applyTheme(theme) {
      bodyEl.setAttribute("data-theme", theme);
      if (label) {
        label.textContent = theme === "dark" ? "Açık Tema" : "Koyu Tema";
      }
      toggle.setAttribute("aria-pressed", String(theme === "dark"));
    }

    var savedTheme = null;
    try {
      savedTheme = window.localStorage.getItem(storageKey);
    } catch (err) {
      savedTheme = null;
    }

    applyTheme(savedTheme === "dark" ? "dark" : "light");

    toggle.addEventListener("click", function () {
      var nextTheme = bodyEl.getAttribute("data-theme") === "dark" ? "light" : "dark";
      applyTheme(nextTheme);
      try {
        window.localStorage.setItem(storageKey, nextTheme);
      } catch (err) {
        // Ignore storage failures in demo mode.
      }
    });
  }

  function initMenu() {
    var toggle = byId("menuToggle");
    var nav = byId("siteNav");
    if (!toggle || !nav) return;

    toggle.addEventListener("click", function () {
      var isOpen = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(isOpen));
    });

    qsa("#siteNav a").forEach(function (link) {
      link.addEventListener("click", function () {
        nav.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
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
    var previewImage = byId("designPreviewImage");
    var previewLabel = byId("designPreviewLabel");
    if (!modal || !overlay || !openButtons.length || !closeButtons.length || !form) return;

    var lastFocused = null;

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
        if (!file) return;

        var reader = new FileReader();
        reader.onload = function (event) {
          previewImage.src = String(event.target && event.target.result ? event.target.result : previewImage.src);
          previewLabel.textContent = file.name;
        };
        reader.readAsDataURL(file);
      });
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
  initThemeToggle();
  initMenu();
  initSlider();
  initMobileTabs();
  initHeaderSearch();
  initDesignModal();
  initCartDrawer();
  initLoginForm();
  initRegisterForm();
  initChatKit();
})();
