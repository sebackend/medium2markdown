const { chromium } = require("playwright");

async function fetchHtml(url, options = {}) {
  const browser = await chromium.launch({ headless: true });
  let page;
  try {
    page = await browser.newPage({
      userAgent:
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    });
    await page.goto(url, {
      waitUntil: options.waitUntil || "networkidle",
      timeout: options.timeout || 60000,
    });
    return await page.content();
  } finally {
    if (page) {
      await page.close().catch(() => {});
    }
    await browser.close().catch(() => {});
  }
}

module.exports = { fetchHtml };
