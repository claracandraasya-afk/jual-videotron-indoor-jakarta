/* Probe QA (temp) untuk halaman lain (index.html): pastikan modal detail
   produk tetap berfungsi setelah popup dibuat tanpa foto. */
(function () {
  var out = { errors: [] };
  window.addEventListener("error", function (e) {
    out.errors.push("error: " + e.message);
  });

  function finish() {
    var json = JSON.stringify(out, null, 2).split("<").join("\\u003c");
    document.body.innerHTML = '<pre id="qa-out">' + json + "</pre>";
  }

  window.addEventListener("load", function () {
    setTimeout(function () {
      try {
        var triggers = document.querySelectorAll("[data-product-detail]");
        out.triggerCount = triggers.length;
        out.modals = [];
        for (var i = 0; i < triggers.length; i++) {
          triggers[i].click();
          var m = document.getElementById("product-modal");
          out.modals.push({
            key: triggers[i].getAttribute("data-product-detail"),
            open: !m.hidden,
            brand: document.getElementById("product-modal-brand").textContent,
            title: document.getElementById("product-modal-title").textContent,
            specs: document.querySelectorAll("#product-modal-specs li").length,
            link: document.getElementById("product-modal-link").getAttribute("href"),
            linkText: document.getElementById("product-modal-link").textContent.trim(),
            mediaDisplay: getComputedStyle(document.querySelector(".product-modal-media")).display,
            imgSrc: document.getElementById("product-modal-img").getAttribute("src")
          });
          m.querySelector(".product-modal-close").click();
        }
        out.overflow = document.documentElement.scrollWidth - window.innerWidth;
      } catch (e) {
        out.errors.push("qa: " + e.message);
      }
      finish();
    }, 1500);
  });
})();
