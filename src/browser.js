import { chromium } from 'playwright';

export async function fetchHtml(url, options = {}) {
  const browser = await chromium.launch({ headless: true });
  let page;
  try {
    page = await browser.newPage({
      userAgent:
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    });
    const timeout = options.timeout || 60000;
    const waitUntil = options.waitUntil || 'networkidle';
    try {
      await page.goto(url, { waitUntil, timeout });
    } catch (err) {
      if (err?.name === 'TimeoutError' && !options.waitUntil) {
        await page.goto(url, { waitUntil: 'domcontentloaded', timeout });
      } else {
        throw err;
      }
    }
    return await page.content();
  } finally {
    if (page) {
      await page.close().catch(() => {});
    }
    await browser.close().catch(() => {});
  }
}
