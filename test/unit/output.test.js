import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { writeOutput } from '../../src/output.js';

describe('writeOutput', () => {
  let tempDir;
  let originalCwd;

  beforeEach(() => {
    originalCwd = process.cwd();
    tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'md-'));
    process.chdir(tempDir);
  });

  afterEach(() => {
    process.chdir(originalCwd);
    fs.rmSync(tempDir, { recursive: true, force: true });
  });

  it('writes a file when stdout is a TTY', () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    const result = writeOutput('content', {
      title: 'My Article',
      url: 'https://example.com/article',
      stdout: { isTTY: true },
    });

    expect(result.outputPath).toBeTruthy();
    expect(fs.existsSync(result.outputPath)).toBe(true);
    expect(fs.readFileSync(result.outputPath, 'utf8')).toBe('content');

    consoleSpy.mockRestore();
  });

  it('writes to stdout when not a TTY', () => {
    const buffer = { data: '' };
    const stdout = {
      isTTY: false,
      write: (chunk) => {
        buffer.data += chunk;
      },
    };

    const result = writeOutput('body', {
      title: '',
      url: 'https://example.com/article',
      stdout,
    });

    expect(buffer.data).toBe('body');
    expect(result.outputPath).toBe(null);
  });
});
