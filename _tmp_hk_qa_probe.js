/* Probe QA (temp): dijalankan di dalam halaman lewat headless Chromium.
   Menuliskan hasil JSON ke <pre id="qa-out"> lalu mengganti isi body. */
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
        out.title = document.title;
        out.sections = [].map.call(document.querySelectorAll("main > section"), function (s) {
          return s.id || s.className;
        });
        out.cardCount = document.querySelectorAll(".product-grid .product-card").length;
        out.cardsPerSeries = {};
        ["ultra-series", "solid-plus-series", "solid-series"].forEach(function (id) {
          out.cardsPerSeries[id] = [].map.call(
            document.querySelectorAll("#" + id + " .product-card"),
            function (c) {
              return (
                c.querySelector(".product-brand").textContent.trim() +
                " >> " +
                c.querySelector("h3").textContent.trim() +
                " >> " +
                c.querySelector("strong").textContent.trim() +
                " >> pills:" +
                c.querySelectorAll(".spec-pill").length +
                " >> key:" +
                c.querySelector("[data-product-detail]").getAttribute("data-product-detail")
              );
            }
          );
        });
        out.navLinks = [].map.call(document.querySelectorAll(".series-nav a"), function (a) {
          return a.getAttribute("href") + "=" + (document.querySelector(a.getAttribute("href")) ? "ok" : "MISSING");
        });
        out.gridCols = getComputedStyle(document.querySelector("#ultra-series .product-grid"))
          .gridTemplateColumns;
        out.navCols = getComputedStyle(document.querySelector(".series-nav")).gridTemplateColumns;
        out.overflow = document.documentElement.scrollWidth - window.innerWidth;
        out.brokenImgs = [].filter.call(document.querySelectorAll("img"), function (i) {
          return i.getAttribute("src") && i.naturalWidth === 0;
        }).length;

        /* Buka modal untuk setiap tombol Lihat Detail, lalu tutup lagi. */
        var triggers = document.querySelectorAll(".product-card [data-product-detail]");
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
            img: document.getElementById("product-modal-img").getAttribute("src")
          });
          m.querySelector(".product-modal-close").click();
        }

        window.scrollTo(0, document.body.scrollHeight);
        setTimeout(function () {
          try {
            out.revealHidden = [].filter.call(
              document.querySelectorAll("[data-reveal]"),
              function (e) {
                return getComputedStyle(e).opacity !== "1";
              }
            ).length;
            out.revealTotal = document.querySelectorAll("[data-reveal]").length;
            out.modalClosedAtEnd = document.getElementById("product-modal").hidden;
          } catch (e2) {
            out.errors.push("reveal: " + e2.message);
          }
          /* Buka satu modal lagi untuk memeriksa tata letak popup tanpa foto. */
          var firstTrigger = document.querySelector(".product-card [data-product-detail]");
          if (firstTrigger) firstTrigger.click();
          out.layout = (function () {
            var d = document.querySelector(".product-modal-dialog");
            var b = document.querySelector(".product-modal-body");
            var l = document.getElementById("product-modal-link");
            var ul = document.getElementById("product-modal-specs");
            var m = document.querySelector(".product-modal-media");
            var dr = d.getBoundingClientRect();
            var lr = l.getBoundingClientRect();
            var ur = ul.getBoundingClientRect();
            return {
              viewport: window.innerWidth,
              mediaDisplay: getComputedStyle(m).display,
              dialogWidth: Math.round(dr.width),
              dialogColumns: getComputedStyle(d).gridTemplateColumns,
              dialogLeftGap: Math.round(dr.left),
              dialogRightGap: Math.round(window.innerWidth - dr.right),
              bodyPadding: getComputedStyle(b).padding,
              bodyWidth: Math.round(b.getBoundingClientRect().width),
              specListStyle: getComputedStyle(ul).listStyleType,
              specBullets: ul.querySelectorAll("li").length,
              linkText: l.textContent.trim(),
              linkBg: getComputedStyle(l).backgroundColor,
              linkWidth: Math.round(lr.width),
              linkBelowSpecs: lr.top >= ur.bottom,
              linkIsLastChild: b.lastElementChild === l,
              modalImgSrc: document.getElementById("product-modal-img").getAttribute("src"),
              title: document.getElementById("product-modal-title").textContent,
              h3Size: getComputedStyle(document.getElementById("product-modal-title")).fontSize
            };
          })();

          finish();
        }, 1200);
      } catch (err) {
        out.errors.push("qa: " + err.message);
        finish();
      }
    }, 1200);
  });
})();
