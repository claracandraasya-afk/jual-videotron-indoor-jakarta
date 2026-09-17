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

  function onScroll() {
    if (!header) return;
    header.classList.toggle("is-stuck", window.scrollY > 8);
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

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
     Animasi reveal saat elemen masuk viewport
     ------------------------------------------------------------------ */
  var revealTargets = document.querySelectorAll("[data-reveal]");

  if ("IntersectionObserver" in window && revealTargets.length) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.12 }
    );

    Array.prototype.forEach.call(revealTargets, function (target) {
      observer.observe(target);
    });
  } else {
    Array.prototype.forEach.call(revealTargets, function (target) {
      target.classList.add("is-visible");
    });
  }

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
     Tahun berjalan di footer
     ------------------------------------------------------------------ */
  var yearSlots = document.querySelectorAll("[data-year]");
  var thisYear = String(new Date().getFullYear());

  Array.prototype.forEach.call(yearSlots, function (slot) {
    slot.textContent = thisYear;
  });
})();