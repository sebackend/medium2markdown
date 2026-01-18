import { parseArgs, getHelp } from './src/args.js';
import { fetchHtml } from './src/browser.js';
import { extractReadable } from './src/extract.js';
import { toMarkdown, prependMetadata } from './src/markdown.js';
import { writeOutput } from './src/output.js';
import { promptForAction } from './src/prompt.js';
import ora from 'ora';

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

  const spinner = ora({ isEnabled: process.stdout.isTTY });

  try {
    if (spinner.isEnabled) {
      spinner.start('Loading page');
    }
    const html = await fetchHtml(url);
    if (spinner.isEnabled) {
      spinner.text = 'Extracting article';
    }
    const { title, contentHtml, metadata } = extractReadable(html, url);
    if (spinner.isEnabled) {
      spinner.text = 'Converting to Markdown';
    }
    const markdownBody = toMarkdown(contentHtml);
    const markdown = prependMetadata(markdownBody, metadata);
    if (spinner.isEnabled) {
      spinner.text = 'Saving output';
    }
    const { outputPath } = writeOutput(markdown, {
      title,
      url,
      stdout: process.stdout,
      log: !spinner.isEnabled,
    });
    if (spinner.isEnabled) {
      spinner.succeed(outputPath ? `Saved to ${outputPath}` : 'Done');
    }
  } catch (err) {
    if (spinner.isEnabled) {
      spinner.fail('Conversion failed');
    }
    console.error('Conversion failed:', err);
    process.exitCode = 1;
  }
})();
