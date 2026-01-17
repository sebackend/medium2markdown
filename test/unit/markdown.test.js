import { describe, it, expect } from 'vitest';
import { toMarkdown, prependMetadata } from '../../src/markdown.js';

describe('markdown', () => {
  it('converts html to markdown', () => {
    const markdown = toMarkdown('<p>Hello world</p>');
    expect(markdown.trim()).toBe('Hello world');
  });

  it('prepends metadata blockquote', () => {
    const result = prependMetadata('Body', {
      title: 'Title',
      source: 'https://example.com/source',
      author: 'Author',
      published: '2024-01-01',
      canonical: 'https://example.com/canonical',
    });

    const expected = [
      '> Title: Title',
      '> Source: https://example.com/source',
      '> Author: Author',
      '> Published: 2024-01-01',
      '> Canonical: https://example.com/canonical',
      '',
      'Body',
    ].join('\n');

    expect(result).toBe(expected);
  });
});
