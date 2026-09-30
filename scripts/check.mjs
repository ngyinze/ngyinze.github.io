import assert from "node:assert/strict";
import { pathToFileURL } from "node:url";
import { mkdir } from "node:fs/promises";

const { chromium } = await import(
  process.env.PLAYWRIGHT_MODULE
    ? pathToFileURL(process.env.PLAYWRIGHT_MODULE).href
    : "playwright"
);
const browser = await chromium.launch({ headless: true, channel: "chrome" });
const url = process.env.CHECK_URL || "http://127.0.0.1:4173";
await mkdir("output/playwright", { recursive: true });
try {
  const page = await browser.newPage({
    viewport: { width: 1440, height: 1000 },
    reducedMotion: "reduce",
  });
  const errors = [];
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("response", (response) => {
    if (response.status() >= 400)
      errors.push(`${response.status()} ${response.url()}`);
  });
  await page.goto(url);
  await page.getByRole("heading", { level: 1 }).waitFor();
  await page.evaluate(() => document.fonts.ready);
  assert.equal(await page.locator("article").count(), 3);
  await page.screenshot({ path: "output/playwright/desktop.png" });
  await page
    .getByRole("button", { name: "Desktop Apps that run locally" })
    .click();
  assert.equal(await page.locator("article").count(), 1);
  assert.equal(await page.locator("article h3").innerText(), "Orbit");
  await page.getByRole("button", { name: "Data", exact: true }).click();
  assert.equal(
    await page.locator("article h3").innerText(),
    "Business software",
  );
  await page.getByRole("button", { name: "Knowledge", exact: true }).click();
  assert.equal(await page.locator("article h3").innerText(), "A second brain");
  await page.getByText("Behind the work", { exact: true }).click();
  assert.equal(await page.locator("details").getAttribute("open"), "");
  await page.getByRole("button", { name: "All work", exact: true }).click();
  assert.equal(await page.locator("article").count(), 3);
  assert.equal(
    await page
      .getByRole("link", { name: "View repository" })
      .getAttribute("href"),
    "https://github.com/ngyinze/Orbit",
  );
  await page.goto(`${url}/#about`);
  await page.reload();
  await page
    .getByRole("heading", {
      name: "Understand the system. Then make it simpler.",
    })
    .waitFor();
  await page.goto(url);
  await page.keyboard.press("Tab");
  assert.equal(
    await page.evaluate(() => document.activeElement.textContent),
    "Skip to work",
  );
  for (const width of [390, 320, 768, 1024, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    assert.ok(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
      `Overflow at ${width}px`,
    );
  }
  await page.setViewportSize({ width: 390, height: 844 });
  await page.reload();
  await page.getByRole("heading", { level: 1 }).waitFor();
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({
    path: "output/playwright/mobile.png",
    fullPage: true,
  });
  assert.equal(
    await page
      .locator(".orbit-dot")
      .evaluate((el) => getComputedStyle(el).animationName),
    "none",
  );
  assert.deepEqual(errors, []);
  console.log(
    "PASS: work map, every filter, details, links, refresh, keyboard entry, reduced motion, assets, and five responsive widths.",
  );
} finally {
  await browser.close();
}
