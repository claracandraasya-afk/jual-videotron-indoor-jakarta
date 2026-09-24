export default async function run(page, ui) {
  await page.locator("#keunggulan").scrollIntoViewIfNeeded();
  await page.waitForTimeout(600);

  const cards = page.locator(".advantage-item");

  // Aktifkan card ke-2
  await cards.nth(1).click();
  await page.waitForTimeout(400);

  const readCard = (n) =>
    page.evaluate((idx) => {
      const li = document.querySelectorAll(".advantage-list > li")[idx];
      const item = li.querySelector(".advantage-item");
      const svg = item.querySelector(".advantage-icon svg");
      const path = svg ? svg.querySelector("path, rect, polygon") : null;
      const cs = (el) => (el ? getComputedStyle(el) : null);
      const ic = cs(item.querySelector(".advantage-icon"));
      const svgc = cs(svg);
      const pathc = cs(path);
      const h3c = cs(item.querySelector("h3"));
      const pc = cs(item.querySelector("p"));
      return {
        active: li.classList.contains("is-active"),
        itemBg: cs(item).backgroundImage,
        itemColor: cs(item).color,
        h3: h3c.color,
        p: pc.color,
        iconColor: ic.color,
        iconBg: ic.backgroundImage,
        iconBgColor: ic.backgroundColor,
        iconFilter: svgc.filter,
        svgColor: svgc.color,
        svgFill: svgc.fill,
        svgStroke: svgc.stroke,
        pathFill: pathc ? pathc.fill : null,
        pathStroke: pathc ? pathc.stroke : null,
      };
    }, n);

  const activeCard2 = await readCard(1);

  // Klik card ke-4 -> card 2 harus kembali normal
  await cards.nth(3).click();
  await page.waitForTimeout(400);
  const card2Reverted = await readCard(1);
  const activeCard4 = await readCard(3);
  const activeCount = await page.locator(".advantage-list > li.is-active").count();

  await page.locator("#keunggulan").screenshot({ path: "qa-active.png" });

  return { activeCount, activeCard2, card2Reverted, activeCard4 };
}
