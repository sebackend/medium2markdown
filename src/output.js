const fs = require("fs");
const path = require("path");

function slugify(value) {
  if (!value) return "article";
  return (
    value
      .normalize("NFKD")
      .replace(/[^\x00-\x7F]/g, "")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .replace(/-+/g, "-") || "article"
  );
}

function baseNameFromUrl(inputUrl) {
  try {
    const parsed = new URL(inputUrl);
    const lastSegment = parsed.pathname.split("/").filter(Boolean).pop();
    return lastSegment || "article";
  } catch {
    return "article";
  }
}

function uniqueMarkdownPath(dir, baseName) {
  let candidate = path.join(dir, `${baseName}.md`);
  let counter = 1;
  while (fs.existsSync(candidate)) {
    candidate = path.join(dir, `${baseName}-${counter}.md`);
    counter += 1;
  }
  return candidate;
}

function writeOutput(markdown, options = {}) {
  const stdout = options.stdout || process.stdout;
  if (!stdout.isTTY) {
    stdout.write(markdown);
    return { outputPath: null };
  }

  const outputDir = path.resolve(process.cwd(), "output");
  fs.mkdirSync(outputDir, { recursive: true });
  const baseName = slugify(options.title || baseNameFromUrl(options.url));
  const outputPath = uniqueMarkdownPath(outputDir, baseName);
  fs.writeFileSync(outputPath, markdown, "utf8");
  console.error(`Saved markdown to ${outputPath}`);
  return { outputPath };
}

module.exports = { writeOutput };
