import { describe, it, expect } from 'vitest';
import { formatFileSize, isImage } from '@/utils/file-parser';

describe('Level 1 Unit Test: File Parser Utility', () => {
  it('formats byte sizes correctly', () => {
    expect(formatFileSize(0)).toBe('0 Bytes');
    expect(formatFileSize(1024)).toBe('1 KB');
    expect(formatFileSize(1048576)).toBe('1 MB');
  });

  it('correctly identifies image file extensions and types', () => {
    const imgFile = new File(['dummy'], 'avatar.png', { type: 'image/png' });
    const pdfFile = new File(['dummy'], 'document.pdf', { type: 'application/pdf' });

    expect(isImage(imgFile)).toBe(true);
    expect(isImage(pdfFile)).toBe(false);
  });
});
