(function () {

  function byId(id) { return document.getElementById(id); }
  function qsa(sel) { return Array.prototype.slice.call(document.querySelectorAll(sel)); }

  // ===== ACTIVE NAV =====
  function initActiveNav() {
    var page = window.location.pathname.split('/').pop() || 'index.html';
    qsa('.site-nav a').forEach(function (a) {
      a.removeAttribute('aria-current');
      var href = (a.getAttribute('href') || '').split('?')[0].split('/').pop();
      if (href === page) a.setAttribute('aria-current', 'page');
    });
  }

  // ===== URL PARAMS =====
  function getParam(name) {
    return new URLSearchParams(window.location.search).get(name);
  }

  // ===== RENDER PRODUCTS =====
  function renderCard(p) {
    var mediaHtml = p.img
      ? '<img src="' + p.img + '" alt="' + p.name + '" loading="lazy">'
      : '<div class="product-emoji" style="font-size:64px;min-height:200px;display:grid;place-items:center">' + (p.emoji || '📦') + '</div>';

    return '<article class="product-card" data-cat="' + p.cat + '">'
      + '<span class="cat-badge ' + p.catClass + '">' + p.catLabel + '</span>'
      + '<div class="product-media">' + mediaHtml + '</div>'
      + '<div class="product-info">'
      + '<h3>' + p.name + '</h3>'
      + '<p class="price">₺ ' + p.price.toLocaleString('tr-TR') + '</p>'
      + '</div>'
      + '</article>';
  }

  function renderGrid(products) {
    var grid = byId('productGrid');
    var countEl = byId('productCount');
    if (!grid) return;

    if (products.length === 0) {
      grid.innerHTML = '<div class="no-results">'
        + '<div class="nr-icon">🔍</div>'
        + '<h3>Ürün bulunamadı</h3>'
        + '<p>Seçilen kategoride ürün yok. Başka bir kategori deneyin.</p>'
        + '</div>';
    } else {
      grid.innerHTML = products.map(renderCard).join('');
    }

    if (countEl) countEl.textContent = products.length + ' ürün';
  }

  var currentCat = 'all';
  var currentSort = 'default';

  function filterAndSort() {
    var list = AYBU_PRODUCTS.slice();

    // filter
    if (currentCat !== 'all') {
      list = list.filter(function (p) { return p.cat === currentCat; });
    }

    // sort
    if (currentSort === 'price-asc') {
      list.sort(function (a, b) { return a.price - b.price; });
    } else if (currentSort === 'price-desc') {
      list.sort(function (a, b) { return b.price - a.price; });
    } else if (currentSort === 'name') {
      list.sort(function (a, b) { return a.name.localeCompare(b.name, 'tr'); });
    }

    return list;
  }

  function applyFilter(cat) {
    currentCat = cat;

    // update chips
    qsa('.chip').forEach(function (c) {
      c.classList.toggle('active', c.getAttribute('data-cat') === cat);
    });

    // update breadcrumb + title
    var labels = {
      all: 'Tüm Ürünler', sweat: 'Sweatshirt & Hoodie',
      tshirt: 'T-Shirt', aksesuar: 'Aksesuar',
      mezun: 'Mezun', kirtasiye: 'Kırtasiye'
    };
    var descs = {
      all: 'AYBÜ resmi koleksiyonunun tamamı',
      sweat: 'Sweatshirt ve hoodie modelleri',
      tshirt: 'T-Shirt koleksiyonu',
      aksesuar: 'Kupa, termos, anahtarlık ve daha fazlası',
      mezun: 'Mezuniyet ürünleri',
      kirtasiye: 'Defter, kalem ve kırtasiye ürünleri'
    };

    var titleEl = byId('pageTitle');
    var descEl = byId('pageDesc');
    var bcEl = byId('breadcrumbCurrent');
    var label = labels[cat] || 'Ürünler';

    if (titleEl) titleEl.textContent = label;
    if (descEl) descEl.textContent = descs[cat] || '';
    if (bcEl) bcEl.textContent = label;

    // update tab active
    qsa('.tab-track .tab').forEach(function (t) {
      var href = t.getAttribute('href') || '';
      var tabCat = new URLSearchParams(href.split('?')[1] || '').get('cat') || 'all';
      var isActive = tabCat === cat || (cat === 'all' && href.indexOf('?') === -1 && href.indexOf('products') !== -1);
      t.classList.toggle('active', isActive);
      if (isActive) t.setAttribute('aria-current', 'page');
      else t.removeAttribute('aria-current');
    });

    renderGrid(filterAndSort());

    // update URL without reload
    var newUrl = window.location.pathname + (cat !== 'all' ? '?cat=' + cat : '');
    window.history.replaceState(null, '', newUrl);
  }

  function initProductsPage() {
    var grid = byId('productGrid');
    if (!grid) return; // not on products page

    // init chips
    qsa('.chip').forEach(function (chip) {
      chip.addEventListener('click', function () {
        applyFilter(chip.getAttribute('data-cat'));
      });
    });

    // init sort
    var sortSel = byId('sortSelect');
    if (sortSel) {
      sortSel.addEventListener('change', function () {
        currentSort = sortSel.value;
        renderGrid(filterAndSort());
      });
    }

    // read URL param
    var urlCat = getParam('cat') || 'all';
    applyFilter(urlCat);
  }

  // ===== YEAR =====
  function initYear() {
    var y = byId('yearNow');
    if (y) y.textContent = String(new Date().getFullYear());
  }

  initActiveNav();
  initYear();
  initProductsPage();

})();
