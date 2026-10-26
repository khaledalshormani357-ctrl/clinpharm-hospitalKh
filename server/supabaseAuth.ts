export interface SupabaseAccessTokenVerification {
  authenticated: boolean;
  status: 401 | 503;
  userId?: string;
  error: string;
}

export interface SupabaseAuthConfig {
  url?: string;
  anonKey?: string;
}

export async function verifySupabaseAccessToken(
  accessToken: string,
  config: SupabaseAuthConfig,
  fetcher: typeof fetch = fetch
): Promise<SupabaseAccessTokenVerification> {
  if (!config.url || !config.anonKey) {
    return {
      authenticated: false,
      status: 503,
      error: 'Clinical copilot authentication is not configured.'
    };
  }

  if (!accessToken || accessToken.length > 8192) {
    return {
      authenticated: false,
      status: 401,
      error: 'Sign in is required to use the clinical copilot.'
    };
  }

  let authUrl: string;
  try {
    authUrl = new URL('/auth/v1/user', config.url).toString();
  } catch {
    return {
      authenticated: false,
      status: 503,
      error: 'Authentication service is temporarily unavailable.'
    };
  }

  try {
    const response = await fetcher(authUrl, {
      method: 'GET',
      headers: {
        apikey: config.anonKey,
        Authorization: `Bearer ${accessToken}`
      },
      signal: AbortSignal.timeout(5000)
    });

    if (!response.ok) {
      return {
        authenticated: false,
        status: 401,
        error: 'Your session is invalid or expired. Please sign in again.'
      };
    }

    const user = await response.json() as { id?: unknown };
    if (typeof user?.id !== 'string' || !user.id.trim()) {
      return {
        authenticated: false,
        status: 401,
        error: 'Unable to verify your signed-in account.'
      };
    }

    return { authenticated: true, status: 401, userId: user.id, error: '' };
  } catch {
    return {
      authenticated: false,
      status: 503,
      error: 'Authentication service is temporarily unavailable.'
    };
  }
}
