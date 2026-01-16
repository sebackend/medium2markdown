const { JSDOM } = require("jsdom");
const { Readability } = require("@mozilla/readability");

function extractReadable(html, url) {
  const dom = new JSDOM(html, { url });
  const reader = new Readability(dom.window.document);
  const article = reader.parse();
  const contentHtml =
    article && article.content
      ? article.content
      : dom.window.document.body.innerHTML;
  const title = article && article.title ? article.title : "";

  return { title, contentHtml };
}

module.exports = { extractReadable };
