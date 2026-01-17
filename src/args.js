import fs from 'node:fs';
import { Command } from 'commander';

const pkgPath = new URL('../package.json', import.meta.url);
const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));

export function parseArgs(argv) {
  const program = new Command();
  program
    .name('medium-to-markdown')
    .version(pkg.version)
    .argument('[url]', 'Medium article URL')
    .showHelpAfterError();

  const args = argv.slice(2).filter((arg) => arg !== '--');
  program.parse(args, { from: 'user' });
  const [url] = program.args;
  return { url: url || '' };
}

export function getHelp() {
  const program = new Command();
  program.name('medium-to-markdown').version(pkg.version).argument('[url]', 'Medium article URL');
  return program.helpInformation();
}
