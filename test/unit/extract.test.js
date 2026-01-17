import fs from "node:fs";
import path from "node:path";
import { describe, it, expect } from "vitest";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const { extractReadable } = require("../../src/extract");

describe("extractReadable", () => {
  it("extracts content and metadata", () => {
    const html = fs.readFileSync(
      path.join(__dirname, "..", "fixtures", "article.html"),
      "utf8"
    );
    const url = "https://medium.com/@user/post";
    const result = extractReadable(html, url);

    expect(result.contentHtml).toContain("Hello from the article body.");
    expect(result.metadata.title).toBe("OG Title");
    expect(result.metadata.author).toBe("Alice Example");
    expect(result.metadata.published).toBe("2024-01-01");
    expect(result.metadata.canonical).toBe("https://example.com/canonical");
    expect(result.metadata.source).toBe(url);
  });
});
