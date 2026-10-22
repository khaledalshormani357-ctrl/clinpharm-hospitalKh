/**
 * Sanitises free text before it is interpolated into a PostgREST `or()` filter.
 * Commas, parentheses, quotes, backslashes and LIKE wildcards would otherwise
 * alter the filter expression itself.
 */
export function sanitizeSearchTerm(input: string, maxLength = 80): string {
  return input
    .replace(/[,()"'`\\%_*:]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, maxLength);
}
