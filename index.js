import { parseArgs, getHelp } from './src/args.js';
import { fetchHtml } from './src/browser.js';
import { extractReadable } from './src/extract.js';
import { toMarkdown, prependMetadata } from './src/markdown.js';
import { writeOutput } from './src/output.js';
import { promptForAction } from './src/prompt.js';

(async () => {
  let { url } = parseArgs(process.argv);
  if (!url) {
    if (process.stdout.isTTY) {
      const result = await promptForAction();
      if (result.action === 'help') {
        console.log(getHelp());
        return;
      }
      if (result.action === 'batch') {
        console.error('Batch conversion not implemented yet.');
        return;
      }
      if (result.action === 'exit') {
        return;
      }
      url = result.url;
    } else {
      console.error(getHelp());
      process.exitCode = 1;
      return;
    }
  }

  if (!url) {
    process.exitCode = 1;
    return;
  }

  try {
    const html = await fetchHtml(url);
    const { title, contentHtml, metadata } = extractReadable(html, url);
    const markdownBody = toMarkdown(contentHtml);
    const markdown = prependMetadata(markdownBody, metadata);
    writeOutput(markdown, { title, url, stdout: process.stdout });
  } catch (err) {
    console.error('Conversion failed:', err);
    process.exitCode = 1;
  }
})();
