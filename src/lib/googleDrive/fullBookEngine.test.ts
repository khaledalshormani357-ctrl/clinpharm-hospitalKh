import { describe, expect, it } from 'vitest';
import { hasPdfSignature } from './fullBookEngine';

describe('hasPdfSignature', () => {
  it('accepts a buffer beginning with the PDF magic signature', () => {
    const bytes = new TextEncoder().encode('%PDF-1.7\n%test');
    expect(hasPdfSignature(bytes.buffer as ArrayBuffer)).toBe(true);
  });

  it('rejects an HTML response from a Drive confirmation/login page', () => {
    const bytes = new TextEncoder().encode('<html><body>Confirm download</body></html>');
    expect(hasPdfSignature(bytes.buffer as ArrayBuffer)).toBe(false);
  });

  it('rejects empty and truncated responses', () => {
    expect(hasPdfSignature(new ArrayBuffer(0))).toBe(false);
    expect(hasPdfSignature(new TextEncoder().encode('%PDF').buffer as ArrayBuffer)).toBe(false);
  });
});
