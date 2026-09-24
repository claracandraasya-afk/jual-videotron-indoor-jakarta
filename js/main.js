/* ==========================================================================
   Jual Videotron Indoor Jakarta — Interaksi halaman
   ========================================================================== */
(function () {
  "use strict";

  document.documentElement.classList.remove("no-js");

  /* ------------------------------------------------------------------
     Header: shadow saat halaman digulir
     ------------------------------------------------------------------ */
  var header = document.querySelector(".site-header");

  var scrollTicking = false;
  function updateHeader() {
    scrollTicking = false;
    if (!header) return;
    header.classList.toggle("is-stuck", window.scrollY > 8);
  }

  function onScroll() {
    if (scrollTicking) return;
    scrollTicking = true;
    window.requestAnimationFrame(updateHeader);
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  updateHeader();

  /* ------------------------------------------------------------------
     Navigasi mobile
     ------------------------------------------------------------------ */
  var navToggle = document.querySelector(".nav-toggle");
  var navLinks = document.querySelectorAll(".nav-list a");

  function closeNav() {
    document.body.classList.remove("nav-open");
    if (navToggle) navToggle.setAttribute("aria-expanded", "false");
  }

  if (navToggle) {
    navToggle.addEventListener("click", function () {
      var isOpen = document.body.classList.toggle("nav-open");
      navToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });
  }

  Array.prototype.forEach.call(navLinks, function (link) {
    link.addEventListener("click", closeNav);
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") closeNav();
  });

  /* ------------------------------------------------------------------
     Dropdown Produk (dukungan klik untuk layar kecil)
     ------------------------------------------------------------------ */
  var dropdownItems = document.querySelectorAll(".nav-item.has-dropdown");

  Array.prototype.forEach.call(dropdownItems, function (item) {
    var trigger = item.querySelector(".nav-link");
    if (!trigger) return;

    trigger.addEventListener("click", function (event) {
      var isMobile = window.matchMedia("(max-width: 1024px)").matches;
      if (!isMobile) return;
      if (!item.classList.contains("is-open")) {
        event.preventDefault();
        Array.prototype.forEach.call(dropdownItems, function (other) {
          if (other !== item) other.classList.remove("is-open");
        });
      }
      item.classList.toggle("is-open");
    });
  });

  /* ------------------------------------------------------------------
     FAQ accordion
     ------------------------------------------------------------------ */
  var faqItems = document.querySelectorAll(".faq-item");

  Array.prototype.forEach.call(faqItems, function (item) {
    var button = item.querySelector(".faq-question");
    var answer = item.querySelector(".faq-answer");
    if (!button) return;

    button.addEventListener("click", function () {
      var willOpen = !item.classList.contains("is-open");

      Array.prototype.forEach.call(faqItems, function (other) {
        if (other === item) return;
        other.classList.remove("is-open");
        var otherButton = other.querySelector(".faq-question");
        var otherAnswer = other.querySelector(".faq-answer");
        if (otherButton) otherButton.setAttribute("aria-expanded", "false");
        if (otherAnswer) otherAnswer.hidden = true;
      });

      item.classList.toggle("is-open", willOpen);
      button.setAttribute("aria-expanded", willOpen ? "true" : "false");
      if (answer) answer.hidden = !willOpen;
    });

    if (answer && !item.classList.contains("is-open")) answer.hidden = true;
  });

  /* ------------------------------------------------------------------
     Smooth reveal saat scroll
     - Fade-up (opacity 0→1, translateY 30px→0) 0.6s ease-out
     - Stagger 0.1–0.15s untuk elemen di dalam satu section
     - Hanya opacity/transform (GPU) sehingga tidak ada layout shift
     - prefers-reduced-motion: semua langsung tampil tanpa animasi
     ------------------------------------------------------------------ */
  var revealSelector = [
    ".hero-copy",
    ".hero-media",
    ".page-hero .breadcrumb",
    ".page-hero h1",
    ".page-hero .hero-lead",
    ".page-hero .btn-group",
    ".page-media",
    ".section-head",
    ".split-note",
    ".advantage-media",
    ".product-card",
    ".solution-card",
    ".article-feature",
    ".article-mini",
    ".info-card",
    ".portfolio-card",
    ".note-card",
    ".spec-table",
    ".form-panel",
    ".cta-inner",
    ".footer-brand",
    ".footer-col",
    ".footer-bottom",
    ".prose > h2",
    ".prose > h3",
    ".prose > p",
    ".prose > ul",
    ".prose > ol",
    ".prose > blockquote",
    ".prose > img"
  ].join(",");

  var revealTargets = [];

  function addRevealTarget(el, index) {
    if (!el || el.hasAttribute("data-reveal")) return;
    el.setAttribute("data-reveal", "");
    el.setAttribute("data-reveal-delay", String(Math.min(index || 0, 4)));
    revealTargets.push(el);
  }

  /* Tandai elemen utama yang memang perlu muncul bertahap.
     Tidak menyentuh struktur, ukuran, atau posisi elemen. */
  Array.prototype.forEach.call(document.querySelectorAll(revealSelector), function (el) {
    if (el.closest("[data-reveal]")) return;
    var parent = el.parentElement;
    var index = 0;

    if (parent) {
      var siblings = parent.querySelectorAll(":scope > " + el.tagName.toLowerCase());
      for (var i = 0; i < siblings.length; i++) {
        if (siblings[i] === el) break;
        index++;
      }
    }

    addRevealTarget(el, index);
  });

  /* Section yang belum memiliki target tetap diberi reveal, sehingga tidak ada
     bagian halaman yang terasa muncul mendadak. */
  Array.prototype.forEach.call(
    document.querySelectorAll("main > section, main > .section, footer.site-footer"),
    function (section) {
      if (!section.hasAttribute("data-reveal") && !section.querySelector("[data-reveal]")) {
        addRevealTarget(section, 0);
      }
    }
  );

  /* Semua elemen yang sudah diberi data-reveal oleh HTML ikut dipantau. */
  Array.prototype.forEach.call(document.querySelectorAll("[data-reveal]"), function (el) {
    if (revealTargets.indexOf(el) === -1) revealTargets.push(el);
  });

  var reduceMotion =
    "matchMedia" in window &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function revealAll() {
    Array.prototype.forEach.call(revealTargets, function (target) {
      target.classList.add("show");
    });
  }

  var heroSection = document.querySelector(".hero");

  /* Entrance animation hero: dijalankan sekali lewat class .is-entered,
     dipicu setelah frame pertama agar transisi sempat terpasang. */
  function playHeroEntrance() {
    if (!heroSection) return;
    heroSection.classList.add("is-entered");
  }

  if (reduceMotion || !("IntersectionObserver" in window) || !revealTargets.length) {
    revealAll();
    playHeroEntrance();
  } else {
    /* Transisi baru dipasang saat reveal dimulai, sehingga tidak ada perbedaan
       tampilan sebelum/sesudah JS aktif dan tidak ada flicker. */
    function prepareReveal(target) {
      if (target.classList.contains("reveal-ready")) return;
      target.classList.add("reveal-ready");
      void target.offsetHeight;
    }

    var observer = new IntersectionObserver(function (entries) {
      for (var i = 0; i < entries.length; i++) {
        var entry = entries[i];
        if (!entry.isIntersecting) continue;
        prepareReveal(entry.target);
        entry.target.classList.add("show");
        observer.unobserve(entry.target);
      }
    }, {
      threshold: 0.08,
      rootMargin: "0px 0px -6% 0px"
    });

    Array.prototype.forEach.call(revealTargets, function (target) {
      observer.observe(target);
    });

    /* Elemen yang sudah terlihat saat halaman dibuka (mis. hero) langsung
       dijadwalkan, jadi tidak pernah tertinggal dalam keadaan transparan. */
    window.requestAnimationFrame(function () {
      window.requestAnimationFrame(function () {
        Array.prototype.forEach.call(revealTargets, function (target) {
          var rect = target.getBoundingClientRect();
          var visible =
            rect.top < (window.innerHeight || 0) * 0.94 && rect.bottom > 0;
          if (visible) prepareReveal(target);
        });
        playHeroEntrance();
      });
    });
  }

  /* ------------------------------------------------------------------
     Keunggulan produk: pergantian gambar kolom kiri via hover.
     Card 1 -> Gambar 1, Card 2 -> Gambar 2, dst. Saat kursor keluar,
     kembali ke gambar default (gambar pertama). Warna kartu, ikon,
     judul, dan deskripsi tidak diubah oleh JavaScript sama sekali.
     ------------------------------------------------------------------ */
  var advantageMedia = document.querySelector("[data-advantage-media]");
  var advantageList = document.querySelector("[data-advantage-list]");
  var advantageImages = advantageMedia
    ? advantageMedia.querySelectorAll(".advantage-media-img")
    : [];
  var advantageCards = advantageList
    ? advantageList.querySelectorAll(":scope > li")
    : [];

  var advantageActive = -1;

  function setActiveAdvantage(index) {
    if (index === advantageActive) return;
    advantageActive = index;

    /* Hanya gambar yang tampil yang diumkan pembaca layar. */
    Array.prototype.forEach.call(advantageImages, function (image, i) {
      var isActive = i === index;
      image.classList.toggle("is-active", isActive);
      image.setAttribute("aria-hidden", isActive ? "false" : "true");
    });
  }

  /* Warna kartu tidak diubah di sini. JavaScript hanya mengganti gambar kolom
     kiri mengikuti kartu yang di-hover: Card 1 -> Gambar 1, dst. Saat kursor
     keluar, kembali ke gambar default (gambar pertama). */
  Array.prototype.forEach.call(advantageCards, function (card, i) {
    card.addEventListener("mouseenter", function () {
      setActiveAdvantage(Math.min(i, advantageImages.length - 1));
    });
    card.addEventListener("mouseleave", function () {
      setActiveAdvantage(0);
    });
  });

/* ------------------------------------------------------------------
     Form konsultasi (validasi ringan, dilanjutkan ke WhatsApp)
     ------------------------------------------------------------------ */
  var consultForm = document.querySelector("[data-consult-form]");

  if (consultForm) {
    consultForm.addEventListener("submit", function (event) {
      event.preventDefault();

      var status = consultForm.querySelector(".form-status");
      var nama = consultForm.querySelector("#nama");
      var telepon = consultForm.querySelector("#telepon");
      var pesan = consultForm.querySelector("#pesan");

      if (!nama || !nama.value.trim() || !telepon || !telepon.value.trim()) {
        if (status) {
          status.style.color = "#b42318";
          status.textContent = "Mohon lengkapi nama dan nomor WhatsApp Anda terlebih dahulu.";
        }
        return;
      }

      var pesanSingkat = [
        "Halo, saya " + nama.value.trim() + ".",
        "Saya ingin konsultasi videotron indoor.",
        "Kebutuhan: " + (pesan && pesan.value.trim() ? pesan.value.trim() : "belum diisi detailnya."),
        "Nomor saya: " + telepon.value.trim()
      ].join(" ");

      var waNumber = consultForm.getAttribute("data-wa") || "6281200000000";
      var waUrl = "https://wa.me/" + waNumber + "?text=" + encodeURIComponent(pesanSingkat);

      if (status) {
        status.style.color = "";
        status.textContent = "Terima kasih! Kami arahkan Anda ke WhatsApp untuk melanjutkan konsultasi.";
      }

      window.open(waUrl, "_blank", "noopener");
      consultForm.reset();
    });
  }

  /* ------------------------------------------------------------------
     Modal detail produk ("Lihat Detail" pada card)
     - Satu elemen modal diisi sesuai tombol yang diklik (data per produk).
     - Tutup: tombol X, klik area di luar modal, atau tombol Escape.
     - Animasi fade + scale murni lewat class .is-open (CSS).
     ------------------------------------------------------------------ */
  var PRODUCT_DETAILS = {
    hikvision: {
      brand: "Hikvision",
      title: "Videotron Indoor Hikvision",
      desc:
        "Pilihan populer untuk lobi, showroom, dan ruang meeting. Modul LED indoor Hikvision menghadirkan tampilan tajam dengan pixel pitch rapat, sistem kontrol yang mudah dioperasikan, serta perawatan sederhana sehingga layar tetap prima untuk pemakaian harian jangka panjang.",
      specs: [
        "Pixel pitch indoor: P1.25 / P1.56 / P1.86 (disesuaikan jarak pandang)",
        "Kecerahan 600–800 nits, nyaman untuk ruangan dengan pencahayaan campuran",
        "Refresh rate tinggi, tampilan mulus tanpa flicker di depan kamera",
        "Sistem kontrol user-friendly, bisa dijalankan tim non-IT",
        "Garansi resmi + dukungan sparepart modul dan receiving card",
        "Instalasi rapi di Jakarta & sekitarnya oleh teknisi berpengalaman"
      ],
      image: "images/videotron-hikvision.png",
      link: "produk-hikvision.html"
    },
    samsung: {
      brand: "Samsung",
      title: "Videotron Indoor Samsung",
      desc:
        "Untuk kebutuhan tampilan premium tanpa sambungan terlihat. Videotron indoor Samsung memakai modul bezel-less dengan micro pixel pitch sehingga konten tampil menyatu penuh — ideal bagi brand yang menonjolkan kualitas visual di area publik seperti flagship store, gallery, dan aula perusahaan.",
      specs: [
        "Micro pixel pitch: P0.9 / P1.2 untuk jarak pandang sangat dekat",
        "Kecerahan hingga 900 nits dengan kalibrasi warna presisi",
        "Desain bezel-less, sambungan modul nyaris tidak terlihat",
        "Kedalaman hitam & kontras tinggi untuk konten visual premium",
        "Manajemen konten terpusat untuk banyak layar sekaligus",
        "Garansi resmi Samsung + layanan purnajual terjadwal"
      ],
      image: "images/videotron-samsung.png",
      link: "produk-samsung.html"
    },
    lg: {
      brand: "LG",
      title: "Videotron Indoor LG",
      desc:
        "Solusi efisien untuk instalasi cepat, ringan, dan rapi. Modul LED indoor LG dirancang tipis dengan bobot ringan sehingga cocok untuk kantor, kampus, maupun ruang event yang kebutuhan display-nya dinamis — termasuk pemasangan sementara untuk kegiatan tertentu.",
      specs: [
        "Pixel pitch indoor: P1.5 / P1.8 / P2.0 sesuai skema ruang",
        "Bodi ultra slim & ringan, cocok untuk dinding ringan dan portable",
        "Instalasi cepat dengan sistem mounting praktis",
        "Konsumsi daya efisien untuk operasional harian berkepanjangan",
        "Kompatibel dengan berbagai sumber konten (PC, player, media box)",
        "Garansi resmi + opsi sewa untuk kebutuhan event"
      ],
      image: "images/videotron-LG.png",
      link: "produk-lg.html"
    }
  };

  var productModal = document.getElementById("product-modal");

  if (productModal) {
    var modalImg = document.getElementById("product-modal-img");
    var modalBrand = document.getElementById("product-modal-brand");
    var modalTitle = document.getElementById("product-modal-title");
    var modalDesc = document.getElementById("product-modal-desc");
    var modalSpecs = document.getElementById("product-modal-specs");
    var modalLink = document.getElementById("product-modal-link");
    var modalDialog = productModal.querySelector(".product-modal-dialog");
    var modalLastFocus = null;

    function openProductModal(key) {
      var data = PRODUCT_DETAILS[key];
      if (!data) return;

      modalImg.src = data.image;
      modalImg.alt = "Videotron indoor " + data.brand;
      modalBrand.textContent = data.brand;
      modalTitle.textContent = data.title;
      modalDesc.textContent = data.desc;
      modalLink.href = data.link;

      while (modalSpecs.firstChild) modalSpecs.removeChild(modalSpecs.firstChild);
      Array.prototype.forEach.call(data.specs, function (spec) {
        var li = document.createElement("li");
        li.textContent = spec;
        modalSpecs.appendChild(li);
      });

      modalLastFocus = document.activeElement;
      productModal.hidden = false;
      document.body.classList.add("modal-open");
      /* Dua frame agar transisi fade + scale sempat berjalan. */
      window.requestAnimationFrame(function () {
        window.requestAnimationFrame(function () {
          productModal.classList.add("is-open");
        });
      });
      if (modalDialog) modalDialog.focus && modalDialog.focus();
    }

    function closeProductModal() {
      if (productModal.hidden) return;
      productModal.classList.remove("is-open");
      document.body.classList.remove("modal-open");
      window.setTimeout(function () {
        productModal.hidden = true;
        if (modalLastFocus && modalLastFocus.focus) modalLastFocus.focus();
      }, 260);
    }

    Array.prototype.forEach.call(
      document.querySelectorAll("[data-product-detail]"),
      function (trigger) {
        trigger.addEventListener("click", function (event) {
          event.preventDefault();
          openProductModal(trigger.getAttribute("data-product-detail"));
        });
      }
    );

    Array.prototype.forEach.call(
      productModal.querySelectorAll("[data-modal-close]"),
      function (closer) {
        closer.addEventListener("click", closeProductModal);
      }
    );

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && !productModal.hidden) closeProductModal();
    });
  }

  /* ------------------------------------------------------------------
     Detail artikel di halaman yang sama ("Baca Selengkapnya")
     - Klik: daftar artikel disembunyikan, panel detail muncul dengan
       animasi fade + slide (murni CSS via class .is-open).
     - "Kembali ke Artikel": panel ditutup, daftar tampil lagi,
       posisi scroll dikembalikan seperti sebelumnya.
     - Isi panel per artikel diambil dari ARTICLES (data di bawah).
     ------------------------------------------------------------------ */
  var ARTICLES = {
    memilih: {
      tag: "Panduan",
      date: "12 Januari 2026",
      title: "Cara Memilih Videotron Indoor yang Tepat untuk Kebutuhan Bisnis Anda",
      desc:
        "Pixel pitch, ukuran layar, kecerahan, sampai sistem kontrol — delapan hal yang perlu dipertimbangkan sebelum memesan videotron indoor. Panduan ini membantu Anda mencocokkan spesifikasi dengan jarak pandang penonton, ukuran ruangan, dan jenis konten yang akan ditayangkan, sehingga anggaran yang keluar benar-benar sepadan dengan kualitas tampilan yang didapat.",
      image: "images/artikel-cara-memilih-videotron.png",
      alt: "Ilustrasi panduan memilih videotron indoor dengan perbandingan spesifikasi"
    },
    harga: {
      tag: "Harga",
      date: "05 Januari 2026",
      title: "Harga Videotron Indoor Jakarta dan Faktor yang Mempengaruhinya",
      desc:
        "Ulasan lengkap komponen biaya videotron indoor: mulai dari modul LED, receiving card, sistem kontrol, hingga pekerjaan instalasi dan rangka pendukung. Dilengkapi tips menyusun anggaran secara realistis — termasuk bagian mana yang bisa dihemat dan bagian mana yang sebaiknya tidak dikorbankan agar layar tetap awet untuk pemakaian jangka panjang.",
      image: "images/artikel-harga-videotron.png",
      alt: "Ilustrasi komponen biaya dan kisaran harga videotron indoor Jakarta"
    },
    penggunaan: {
      tag: "Penggunaan",
      date: "28 Desember 2025",
      title: "Penggunaan Videotron Indoor: dari Lobi Kantor hingga Ruang Event",
      desc:
        "Contoh pemanfaatan videotron indoor yang terbukti efektif di lapangan: penyambutan tamu di lobi kantor, promosi tenant di mall, media pembelajaran di sekolah dan kampus, sampai layar utama di ruang event dan hotel. Setiap skenario dibahas bersama rekomendasi ukuran dan spesifikasi agar hasilnya maksimal sesuai karakter ruangannya.",
      image: "images/artikel-penggunaan-videotron.png",
      alt: "Ilustrasi penggunaan videotron indoor di berbagai ruangan"
    }
  };

  var articleDetail = document.getElementById("article-detail");

  if (articleDetail) {
    var articleList = articleDetail.parentElement.querySelector(".article-layout");
    var adImg = document.getElementById("article-detail-img");
    var adTag = document.getElementById("article-detail-tag");
    var adDate = document.getElementById("article-detail-date");
    var adTitle = document.getElementById("article-detail-title");
    var adText = document.getElementById("article-detail-text");
    var adBack = document.getElementById("article-detail-back");
    var articleScrollY = 0;

    function openArticleDetail(key) {
      var data = ARTICLES[key];
      if (!data || articleDetail.hidden === false) return;

      adImg.src = data.image;
      adImg.alt = data.alt;
      adTag.textContent = data.tag;
      adDate.textContent = data.date;
      adTitle.textContent = data.title;
      adText.textContent = data.desc;

      articleScrollY = window.scrollY || window.pageYOffset;
      if (articleList) articleList.hidden = true;
      articleDetail.hidden = false;

      /* Dua frame agar transisi fade + slide sempat berjalan. */
      window.requestAnimationFrame(function () {
        window.requestAnimationFrame(function () {
          articleDetail.classList.add("is-open");
        });
      });

      articleDetail.setAttribute("tabindex", "-1");
      articleDetail.focus({ preventScroll: true });
      articleDetail.scrollIntoView({ behavior: "smooth", block: "start" });
    }

    function closeArticleDetail() {
      if (articleDetail.hidden) return;
      articleDetail.classList.remove("is-open");
      window.setTimeout(function () {
        articleDetail.hidden = true;
        if (articleList) articleList.hidden = false;
        window.scrollTo(0, articleScrollY);
      }, 320);
    }

    Array.prototype.forEach.call(
      document.querySelectorAll("[data-article-detail]"),
      function (trigger) {
        trigger.addEventListener("click", function (event) {
          event.preventDefault();
          openArticleDetail(trigger.getAttribute("data-article-detail"));
        });
      }
    );

    if (adBack) adBack.addEventListener("click", closeArticleDetail);
  }

  /* ------------------------------------------------------------------
     Tahun berjalan di footer
     ------------------------------------------------------------------ */
  var yearSlots = document.querySelectorAll("[data-year]");
  var thisYear = String(new Date().getFullYear());

  Array.prototype.forEach.call(yearSlots, function (slot) {
    slot.textContent = thisYear;
  });
})();