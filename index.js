const { parseArgs, usage } = require("./src/args");
const { fetchHtml } = require("./src/browser");
const { extractReadable } = require("./src/extract");
const { toMarkdown } = require("./src/markdown");
const { writeOutput } = require("./src/output");

const { url } = parseArgs(process.argv);
if (!url) {
  console.error(usage("medium-to-markdown"));
  process.exit(1);
}

(async () => {
  try {
    const html = await fetchHtml(url);
    const { title, contentHtml } = extractReadable(html, url);
    const markdown = toMarkdown(contentHtml);
    writeOutput(markdown, { title, url, stdout: process.stdout });
  } catch (err) {
    console.error("Conversion failed:", err);
    process.exitCode = 1;
  }
})();
