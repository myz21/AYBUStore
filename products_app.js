<!DOCTYPE html>
<html lang="tr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>AYBÜ Store | Ürünler</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&family=Space+Grotesk:wght@500;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="style.css">
  <script src="app.js" defer></script>
  <script src="products_data.js"></script>
  <script src="products_app.js" defer></script>
</head>
<body>
  <a class="skip-link" href="#mainContent">İçeriğe Geç</a>

  <div class="top-strip">
    AYBÜ Resmi Mağaza — Kampüs ruhunu taşıyan ürünler burada &nbsp;·&nbsp; Ücretsiz kargo 1000₺ üzeri!
  </div>

  <header class="site-header" id="siteHeader">
    <div class="header-inner">
      <a class="brand" href="index.html" aria-label="AYBU Store">
        <img class="brand-mark" src="../images/aybustore_logo.png" alt="AYBÜ Store Logo">
      <div class="brand-divider"></div>
      <div class="brand-text-block">
        <span class="brand-name">AYBÜ STORE</span>
        <span class="brand-sub">Resmi Mağaza</span>
      </div>
      </a>
      <button class="menu-toggle" id="menuToggle" aria-label="Menü" aria-expanded="false" aria-controls="siteNav">☰</button>
      <nav class="site-nav" id="siteNav" aria-label="Ana menü">
        <a href="index.html">Ana Sayfa</a>
        <a href="products.html" aria-current="page">Ürünler</a>
        <a href="index.html#mapSection">Mağaza</a>
      </nav>
      <div class="header-actions">
        <a class="link-btn" href="register.html">Üyelik</a>
        <div class="header-search" data-header-search>
          <input id="headerSearchInput" class="header-search-input" type="search" placeholder="Ürün ara..." aria-label="Ürün ara">
        </div>
        <button class="icon-btn" type="button" aria-expanded="false" data-search-toggle aria-label="Arama">
          <svg viewBox="0 0 24 24"><path d="M10 18a8 8 0 1 1 5.293-14.001A8 8 0 0 1 10 18Zm11.707 2.293-5.1-5.1a10 10 0 1 0-1.414 1.414l5.1 5.1a1 1 0 0 0 1.414-1.414Z"/></svg>
        </button>
        <button class="cart-btn" data-cart-open aria-label="Sepetim" aria-controls="cartDrawer" aria-expanded="false">SEPETİM</button>
      </div>
    </div>
  </header>

  <nav class="mobile-tabs" aria-label="Kategori sekmeleri">
    <button class="tab-arrow" type="button" data-tabs-prev>‹</button>
    <div class="tab-track" id="tabTrack">
      <a class="tab" href="index.html">Mağaza Ana Sayfa</a>
      <a class="tab active" href="products.html" aria-current="page">Tüm Ürünler</a>
      <a class="tab" href="products.html?cat=sweat">Sweatshirt</a>
      <a class="tab" href="products.html?cat=tshirt">T-Shirt</a>
      <a class="tab" href="products.html?cat=aksesuar">Aksesuar</a>
      <a class="tab" href="products.html?cat=mezun">Mezun</a>
    </div>
    <button class="tab-arrow" type="button" data-tabs-next>›</button>
  </nav>

  <main id="mainContent">

    <!-- PAGE HEADER -->
    <div class="page-header-bar">
      <div class="page-header-inner">
        <div>
          <nav class="breadcrumb" aria-label="Konum">
            <a href="index.html">Ana Sayfa</a>
            <span aria-hidden="true">›</span>
            <span id="breadcrumbCurrent">Tüm Ürünler</span>
          </nav>
          <h1 id="pageTitle">Tüm Ürünler</h1>
          <p id="pageDesc" class="page-desc">AYBÜ resmi koleksiyonunun tamamı</p>
        </div>
      </div>
    </div>

    <!-- FILTER BAR -->
    <div class="filter-bar-wrap">
      <div class="filter-bar-inner">
        <div class="filter-chips" id="filterChips">
          <button class="chip active" data-cat="all">Tümü</button>
          <button class="chip" data-cat="sweat">Sweatshirt & Hoodie</button>
          <button class="chip" data-cat="tshirt">T-Shirt</button>
          <button class="chip" data-cat="aksesuar">Aksesuar</button>
          <button class="chip" data-cat="mezun">Mezun</button>
          <button class="chip" data-cat="kirtasiye">Kırtasiye</button>
        </div>
        <div class="filter-right">
          <span class="product-count" id="productCount">— ürün</span>
          <select class="sort-select" id="sortSelect" aria-label="Sırala">
            <option value="default">Önerilen</option>
            <option value="price-asc">Fiyat: Düşük → Yüksek</option>
            <option value="price-desc">Fiyat: Yüksek → Düşük</option>
            <option value="name">İsme Göre</option>
          </select>
        </div>
      </div>
    </div>

    <!-- PRODUCT GRID -->
    <section class="products products--page" id="products" aria-labelledby="pageTitle">
      <div class="product-grid product-grid--4" id="productGrid">
        <!-- JS ile doldurulacak -->
      </div>
    </section>

  </main>

  <footer class="site-footer">
    <div class="footer-inner footer-grid">
      <section class="footer-col">
        <h3>AYBÜ Store</h3>
        <p>Ankara Yıldırım Beyazıt Üniversitesi resmi ürün mağazası.</p>
        <nav class="footer-links">
          <a href="index.html#mapSection">Hakkımızda</a>
          <a href="#">Sıkça Sorulan Sorular</a>
          <a href="#">Kargo Bilgisi</a>
          <a href="#">İade ve Değişim</a>
        </nav>
      </section>
      <section class="footer-col">
        <h3>Bize Ulaşın</h3>
        <p class="footer-contact-row"><span>📞</span><a href="tel:+903120000000">+90 312 000 00 00</a></p>
        <p class="footer-contact-row"><span>✉️</span><a href="mailto:magaza@aybu.edu.tr">magaza@aybu.edu.tr</a></p>
      </section>
      <section class="footer-col">
        <h3>Hesabım</h3>
        <nav class="footer-links">
          <a href="login.html">Oturum Aç</a>
          <a href="register.html">Kayıt Ol</a>
          <a href="#">Sipariş Geçmişi</a>
        </nav>
      </section>
      <section class="footer-col">
        <h3>Güvenli Alışveriş</h3>
        <div class="pay-row">
          <span class="pay-badge">TROY</span>
          <span class="pay-badge pay-master">MASTER</span>
          <span class="pay-badge pay-visa">VISA</span>
          <span class="pay-badge pay-amex">AMEX</span>
        </div>
      </section>
    </div>
    <div class="copy copy-row">
      <p>© <span id="yearNow"></span> AYBÜ Store — Ankara Yıldırım Beyazıt Üniversitesi</p>
    </div>
  </footer>

  <nav class="bottom-nav">
    <a class="bn-item" href="index.html"><span class="bn-ico"><svg viewBox="0 0 24 24"><path d="M3 10.5 12 3l9 7.5V21a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1v-10.5Z"/></svg></span><span class="bn-label">Ana Sayfa</span></a>
    <a class="bn-item active" href="products.html" aria-current="page"><span class="bn-ico"><svg viewBox="0 0 24 24"><path d="M4 6h16v2H4V6Zm0 5h16v2H4v-2Zm0 5h16v2H4v-2Z"/></svg></span><span class="bn-label">Ürünler</span></a>
    <a class="bn-item bn-center" href="#" data-cart-open><span class="bn-center-btn"><svg viewBox="0 0 24 24"><path d="M7 7V6a5 5 0 0 1 10 0v1h3l-1.2 14.2A2 2 0 0 1 16.8 23H7.2a2 2 0 0 1-1.99-1.8L4 7h3Zm2 0h6V6a3 3 0 0 0-6 0v1Z"/></svg></span><span class="bn-label">Sepet</span></a>
    <a class="bn-item" href="index.html#mapSection"><span class="bn-ico"><svg viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg></span><span class="bn-label">Mağaza</span></a>
    <a class="bn-item" href="login.html"><span class="bn-ico"><svg viewBox="0 0 24 24"><path d="M12 12a5 5 0 1 0-5-5 5 5 0 0 0 5 5Zm0 2c-5 0-9 2.5-9 5.5V22h18v-2.5C21 16.5 17 14 12 14Z"/></svg></span><span class="bn-label">Profil</span></a>
  </nav>

  <aside class="chatkit" id="chatkit" aria-hidden="true" role="dialog" aria-modal="true" tabindex="-1">
    <div class="chatkit-header"><div><strong id="chatkitTitle">Canlı Destek</strong><small>1-2 dk içinde yanıt</small></div><button class="chatkit-close" type="button" data-chatkit-close>×</button></div>
    <div class="chatkit-body" id="chatkitBody"><div class="chatkit-msg bot"><div class="bubble">Merhaba! Size nasıl yardımcı olabilirim?</div><div class="meta">AYBÜ Store • şimdi</div></div></div>
    <form class="chatkit-input" id="chatkitForm"><input id="chatkitText" type="text" placeholder="Mesajınızı yazın..."><button type="submit" class="chatkit-send"><svg viewBox="0 0 24 24"><path d="M2 21 23 12 2 3v7l15 2-15 2v7Z"/></svg></button></form>
  </aside>
  <button class="chatkit-fab" type="button" data-chatkit-open><svg viewBox="0 0 24 24"><path d="M4 4h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H9l-5 4v-4H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z"/></svg></button>

  <div class="drawer-overlay" id="drawerOverlay" data-cart-close hidden></div>
  <aside class="cart-drawer" id="cartDrawer" aria-hidden="true" role="dialog" aria-modal="true" tabindex="-1">
    <div class="drawer-header"><h2 id="cartTitle">Sepetim</h2><button class="drawer-close" type="button" data-cart-close>×</button></div>
    <p class="drawer-note">AYBÜ resmi ürünleri güvenli ödeme adımına hazır.</p>
    <div class="drawer-item"><img src="../images/black_tshirt.png" alt="Tişört"><div><h3>AYBÜ Siyah Tişört</h3><p>Adet: 1</p><strong>₺ 690</strong></div></div>
    <div class="drawer-summary"><div><span>Ara Toplam</span><strong>₺ 690</strong></div><div><span>Kargo</span><strong>₺ 0</strong></div><div class="total"><span>Toplam</span><strong>₺ 690</strong></div></div>
    <button class="checkout-btn" type="button">ALIŞVERİŞİ TAMAMLA</button>
    <button class="continue-btn" type="button" data-cart-close>ALIŞVERİŞE DEVAM ET</button>
  </aside>
</body>
</html>
