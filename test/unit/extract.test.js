import fs from 'node:fs';
import { describe, it, expect } from 'vitest';
import { extractReadable } from '../../src/extract.js';

describe('extractReadable', () => {
  it('extracts content and metadata', () => {
    const fixturePath = new URL('../fixtures/article.html', import.meta.url);
    const html = fs.readFileSync(fixturePath, 'utf8');
    const url = 'https://medium.com/@user/post';
    const result = extractReadable(html, url);

    expect(result.contentHtml).toContain('Hello from the article body.');
    expect(result.metadata.title).toBe('OG Title');
    expect(result.metadata.author).toBe('Alice Example');
    expect(result.metadata.published).toBe('2024-01-01');
    expect(result.metadata.canonical).toBe('https://example.com/canonical');
    expect(result.metadata.source).toBe(url);
  });
});
