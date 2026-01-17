const { JSDOM } = require("jsdom");
const { Readability } = require("@mozilla/readability");

function getMetaContent(doc, selectors) {
  for (const selector of selectors) {
    const el = doc.querySelector(selector);
    if (el) {
      const value = el.getAttribute("content");
      if (value && value.trim()) {
        return value.trim();
      }
    }
  }
  return "";
}

function extractReadable(html, url) {
  const dom = new JSDOM(html, { url });
  const doc = dom.window.document;
  const reader = new Readability(doc);
  const article = reader.parse();
  const contentHtml =
    article && article.content ? article.content : doc.body.innerHTML;

  const title =
    (article && article.title) ||
    getMetaContent(doc, ['meta[property="og:title"]']) ||
    doc.title ||
    "";

  const author = getMetaContent(doc, [
    'meta[name="author"]',
    'meta[property="author"]',
    'meta[property="article:author"]',
    'meta[name="parsely-author"]',
    'meta[name="dc.creator"]',
    'meta[name="twitter:creator"]',
  ]);

  const published = getMetaContent(doc, [
    'meta[property="article:published_time"]',
    'meta[name="article:published_time"]',
    'meta[property="og:published_time"]',
    'meta[name="parsely-pub-date"]',
    'meta[name="date"]',
    'meta[itemprop="datePublished"]',
  ]);

  const canonical =
    doc.querySelector('link[rel="canonical"]')?.getAttribute("href") || "";

  const metadata = {
    title,
    author,
    published,
    canonical,
    source: url,
  };

  return { title, contentHtml, metadata };
}

module.exports = { extractReadable };
