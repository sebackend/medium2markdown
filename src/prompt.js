async function promptForAction() {
  const { select, input } = await import("@inquirer/prompts");
  const action = await select({
    message: "What do you want to do?",
    choices: [
      { name: "Convert URL", value: "convert" },
      { name: "Convert from file (coming soon)", value: "batch" },
      { name: "Show help", value: "help" },
      { name: "Exit", value: "exit" },
    ],
  });

  if (action === "convert") {
    const url = await input({
      message: "Enter the Medium URL",
      validate: (value) => (value ? true : "URL is required"),
    });
    return { action, url };
  }

  return { action };
}

module.exports = { promptForAction };
