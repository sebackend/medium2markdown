import { describe, it, expect } from "vitest";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const { parseArgs } = require("../../src/args");

describe("parseArgs", () => {
  it("returns the url when provided", () => {
    const result = parseArgs([
      "node",
      "index.js",
      "https://example.com/article",
    ]);
    expect(result.url).toBe("https://example.com/article");
  });

  it("returns empty url when missing", () => {
    const result = parseArgs(["node", "index.js"]);
    expect(result.url).toBe("");
  });
});
