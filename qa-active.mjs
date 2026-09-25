// File: qa-active.mjs
// QA: card keunggulan saat HOVER (bukan klik).
// - Card normal: background putih, ikon biru (kotak ikon biru), judul/deskripsi warna normal.
// - Saat hover: card besar biru, kotak ikon putih, ikon di dalamnya biru, judul & deskripsi putih.
// - Saat keluar hover, card kembali normal.
// - Screenshot: qa-active.png.
// - Tidak ada klik; tidak ada class is-active.

export default async function run(page) {
  await page.locator("#keunggulan").scrollIntoViewIfNeeded();
  await page.waitForTimeout(600);

  const cards = page.locator(".advantage-item");

  const readCard = (idx) =>
    page.evaluate((i) => {
      const item = document.querySelectorAll(".advantage-item")[i];
      const svg = item.querySelector(".advantage-icon svg");
      const cs = (el) => (el ? getComputedStyle(el) : null);
      const itemC = cs(item);
      const ic = cs(item.querySelector(".advantage-icon"));
      const svgc = cs(svg);
      return {
        hovered: item.matches(":hover"),
        itemBg: itemC.backgroundColor,
        itemColor: itemC.color,
        h3: cs(item.querySelector("h3")).color,
        p: cs(item.querySelector("p")).color,
        iconColor: ic.color,
        iconBgColor: ic.backgroundColor,
        svgColor: svgc.color,
        svgStroke: svgc.stroke,
      };
    }, idx);

  const results = {};

  // Normal card 1
  results.normalCard1 = await readCard(0);

  // Hover card 1
  await cards.nth(0).hover();
  await page.waitForTimeout(600);
  results.hoverCard1 = await readCard(0);

  // Move out
  await page.mouse.move(0, 0);
  await page.waitForTimeout(600);
  results.card1AfterLeave = await readCard(0);

  // Hover card 2
  await cards.nth(1).hover();
  await page.waitForTimeout(600);
  results.hoverCard2 = await readCard(1);

  // Move out again
  await page.mouse.move(0, 0);
  await page.waitForTimeout(600);
  results.card2AfterLeave = await readCard(1);

  // No active classes expected
  results.activeCount = await page.locator(".advantage-list > li.is-active").count();

  await page.locator("#keunggulan").screenshot({ path: "qa-active.png" });
  return results;
}
