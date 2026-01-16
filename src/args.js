function parseArgs(argv) {
  const args = argv.slice(2).filter((arg) => arg !== "--");
  return { url: args[0] || "" };
}

function usage(binName) {
  return `Usage: ${binName} <url>`;
}

module.exports = { parseArgs, usage };
