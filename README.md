# medium-to-markdown

## What this does
Convert Medium articles to Markdown. It loads the article in a headless browser, extracts the main content, and writes a clean Markdown file.

## Installation
Requirements: Node.js 20+ and pnpm.

```sh
pnpm install
pnpm exec playwright install
```

## Usage
Convert a Medium URL and save to the default output folder:

```sh
pnpm run convert -- "https://medium.com/@user/article-slug"
```

Output is saved in `output/` with a filename derived from the article title or URL.

If you want to control the filename, redirect stdout instead:

```sh
pnpm run convert -- "https://medium.com/@user/article-slug" > output/article.md
```

If you install the CLI as a command (via the `bin` entry), you can also run:

```sh
medium-to-markdown "https://medium.com/@user/article-slug"
```
