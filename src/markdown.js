const TurndownService = require("turndown");

function toMarkdown(contentHtml) {
  const turndown = new TurndownService({ codeBlockStyle: "fenced" });
  return turndown.turndown(contentHtml);
}

module.exports = { toMarkdown };
