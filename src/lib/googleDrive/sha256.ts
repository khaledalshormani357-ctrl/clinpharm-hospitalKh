/** Computes a real SHA-256 digest. Never substitutes a non-cryptographic fingerprint. */
export async function computeSha256Hex(buffer: ArrayBuffer): Promise<string> {
  if (typeof crypto === 'undefined' || !crypto.subtle?.digest) {
    throw new Error('Web Crypto SHA-256 is unavailable; refusing to store a non-SHA fingerprint as SHA-256.');
  }
  const hashBuffer = await crypto.subtle.digest('SHA-256', buffer);
  return Array.from(new Uint8Array(hashBuffer), byte => byte.toString(16).padStart(2, '0')).join('');
}
