import TurndownService from 'turndown';

export function toMarkdown(contentHtml) {
  const turndown = new TurndownService({ codeBlockStyle: 'fenced' });
  return turndown.turndown(contentHtml);
}

export function prependMetadata(markdown, metadata) {
  if (!metadata) {
    return markdown;
  }

  const title = metadata.title || 'Unknown';
  const source = metadata.source || 'Unknown';
  const author = metadata.author || 'Unknown';
  const published = metadata.published || 'Unknown';
  const canonical = metadata.canonical || metadata.source || 'Unknown';

  const lines = [
    `> - Title: ${title}`,
    `> - Source: ${source}`,
    `> - Author: ${author}`,
    `> - Published: ${published}`,
    `> - Canonical: ${canonical}`,
  ];

  return `${lines.join('\n')}\n\n${markdown}`;
}
