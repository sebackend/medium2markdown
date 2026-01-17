const { Command } = require("commander");
const pkg = require("../package.json");

function parseArgs(argv) {
  const program = new Command();
  program
    .name("medium-to-markdown")
    .version(pkg.version)
    .argument("[url]", "Medium article URL")
    .showHelpAfterError();

  const args = argv.slice(2).filter((arg) => arg !== "--");
  program.parse(args, { from: "user" });
  const [url] = program.args;
  return { url: url || "" };
}

function getHelp() {
  const program = new Command();
  program
    .name("medium-to-markdown")
    .version(pkg.version)
    .argument("[url]", "Medium article URL");
  return program.helpInformation();
}

module.exports = { parseArgs, getHelp };
