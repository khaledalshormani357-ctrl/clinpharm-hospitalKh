import { describe, expect, it, vi } from 'vitest';
import { verifySupabaseAccessToken } from './supabaseAuth';

const config = {
  url: 'https://example-project.supabase.co/',
  anonKey: 'public-anon-key'
};

describe('Supabase access-token verification', () => {
  it('fails closed when server auth configuration is missing', async () => {
    const fetcher = vi.fn<typeof fetch>();
    const result = await verifySupabaseAccessToken('valid-looking-token', {}, fetcher);

    expect(result).toMatchObject({
      authenticated: false,
      status: 503,
      error: 'Clinical copilot authentication is not configured.'
    });
    expect(fetcher).not.toHaveBeenCalled();
  });

  it('rejects a missing or oversized token before making a network request', async () => {
    const fetcher = vi.fn<typeof fetch>();
    const missing = await verifySupabaseAccessToken('', config, fetcher);
    const oversized = await verifySupabaseAccessToken('x'.repeat(8193), config, fetcher);

    expect(missing.status).toBe(401);
    expect(oversized.status).toBe(401);
    expect(fetcher).not.toHaveBeenCalled();
  });

  it('validates the bearer token with Supabase Auth and returns the verified user ID', async () => {
    const fetcher = vi.fn<typeof fetch>().mockResolvedValue(
      new Response(JSON.stringify({ id: 'verified-user-id' }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      })
    );

    const result = await verifySupabaseAccessToken('valid-token', config, fetcher);

    expect(result).toMatchObject({
      authenticated: true,
      status: 200,
      userId: 'verified-user-id'
    });
    expect(fetcher).toHaveBeenCalledWith(
      'https://example-project.supabase.co/auth/v1/user',
      expect.objectContaining({
        method: 'GET',
        headers: {
          apikey: 'public-anon-key',
          Authorization: 'Bearer valid-token'
        }
      })
    );
  });

  it('rejects an expired or invalid token', async () => {
    const fetcher = vi.fn<typeof fetch>().mockResolvedValue(new Response('{}', { status: 401 }));
    const result = await verifySupabaseAccessToken('expired-token', config, fetcher);

    expect(result.authenticated).toBe(false);
    expect(result.status).toBe(401);
    expect(result.error).toContain('invalid or expired');
  });

  it('rejects a successful response without a user ID', async () => {
    const fetcher = vi.fn<typeof fetch>().mockResolvedValue(new Response('{}', { status: 200 }));
    const result = await verifySupabaseAccessToken('token', config, fetcher);

    expect(result.authenticated).toBe(false);
    expect(result.status).toBe(401);
  });

  it('returns a temporary failure when the auth service cannot be reached', async () => {
    const fetcher = vi.fn<typeof fetch>().mockRejectedValue(new Error('network failure'));
    const result = await verifySupabaseAccessToken('token', config, fetcher);

    expect(result.authenticated).toBe(false);
    expect(result.status).toBe(503);
    expect(result.error).toContain('temporarily unavailable');
  });
});
