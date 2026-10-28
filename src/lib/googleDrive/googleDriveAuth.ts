import { initializeApp, getApps, getApp } from 'firebase/app';
import {
  getAuth,
  signInWithPopup,
  signInWithCredential,
  GoogleAuthProvider,
  onAuthStateChanged,
  User
} from 'firebase/auth';

const configModules = import.meta.glob('../../../firebase-applet-config.json', {
  eager: true,
  import: 'default'
}) as Record<string, Record<string, string>>;

const loadedConfig = Object.values(configModules)[0];

const firebaseConfig = loadedConfig || {
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || 'gen-lang-client-0487905478',
  appId: import.meta.env.VITE_FIREBASE_APP_ID || '1:983876723590:web:87edaab54688a9d9074207',
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || 'AIzaSyAbvKSlhbh4LvX-qIg0_YrDMUHhxm4eMRo',
  authDomain:
    import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || 'gen-lang-client-0487905478.firebaseapp.com',
  storageBucket:
    import.meta.env.VITE_FIREBASE_STORAGE_BUCKET ||
    'gen-lang-client-0487905478.firebasestorage.app',
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '983876723590',
  oAuthClientId: '983876723590-dtt840p086vkc9lpr93ogt59ppbjisao.apps.googleusercontent.com'
};

export const OAUTH_CLIENT_ID =
  firebaseConfig.oAuthClientId ||
  '983876723590-dtt840p086vkc9lpr93ogt59ppbjisao.apps.googleusercontent.com';

export const AUTHORIZED_BRIDGE_ORIGIN =
  (import.meta.env?.VITE_OAUTH_BRIDGE_ORIGIN as string | undefined)?.trim() ||
  'https://ais-pre-sr6y5mqqoromsgvakmmu26-177021215798.europe-west2.run.app';

export const AUTHORIZED_DEV_BRIDGE_ORIGIN =
  'https://ais-dev-sr6y5mqqoromsgvakmmu26-177021215798.europe-west2.run.app';

export const SCOPES = [
  'https://www.googleapis.com/auth/drive',
  'https://www.googleapis.com/auth/drive.activity',
  'https://www.googleapis.com/auth/drive.activity.readonly',
  'https://www.googleapis.com/auth/drive.appdata',
  'https://www.googleapis.com/auth/drive.apps.readonly',
  'https://www.googleapis.com/auth/drive.file',
  'https://www.googleapis.com/auth/drive.install',
  'https://www.googleapis.com/auth/drive.meet.readonly',
  'https://www.googleapis.com/auth/drive.metadata',
  'https://www.googleapis.com/auth/drive.metadata.readonly',
  'https://www.googleapis.com/auth/drive.photos.readonly',
  'https://www.googleapis.com/auth/drive.readonly',
  'https://www.googleapis.com/auth/drive.scripts'
];

// Core Drive scopes needed at runtime to list and download PDFs cleanly
const RUNTIME_DRIVE_SCOPES = [
  'https://www.googleapis.com/auth/drive.readonly',
  'https://www.googleapis.com/auth/drive.file',
  'https://www.googleapis.com/auth/drive.metadata.readonly',
  'openid',
  'email',
  'profile'
];

const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth(app);

const provider = new GoogleAuthProvider();
for (const scope of RUNTIME_DRIVE_SCOPES) {
  provider.addScope(scope);
}
provider.setCustomParameters({
  prompt: 'select_account'
});

// Flag to indicate if we are in the middle of a sign-in flow.
let isSigningIn = false;
// Cache the access token strictly in memory (never in localStorage or sessionStorage).
let cachedAccessToken: string | null = null;
let cachedUser: User | null = null;

type AuthListener = (state: {
  user: User | null;
  accessToken: string | null;
  needsAuth: boolean;
}) => void;
const listeners = new Set<AuthListener>();

function notifyListeners() {
  const needsAuth = !cachedAccessToken;
  for (const listener of listeners) {
    listener({
      user: cachedUser,
      accessToken: cachedAccessToken,
      needsAuth
    });
  }
}

export const subscribeDriveAuth = (listener: AuthListener): (() => void) => {
  listeners.add(listener);
  listener({
    user: cachedUser,
    accessToken: cachedAccessToken,
    needsAuth: !cachedAccessToken
  });
  return () => {
    listeners.delete(listener);
  };
};

// Initialize auth state listener. Call this on app/component load.
export const initAuth = (
  onAuthSuccess?: (user: User, token: string) => void,
  onAuthFailure?: () => void
) => {
  return onAuthStateChanged(auth, async (user: User | null) => {
    if (user) {
      cachedUser = user;
    }
    if (user && cachedAccessToken) {
      notifyListeners();
      if (onAuthSuccess) onAuthSuccess(user, cachedAccessToken);
    } else if (!isSigningIn && !cachedAccessToken) {
      notifyListeners();
      if (onAuthFailure) onAuthFailure();
    }
  });
};

export function isAuthorizedFirebaseDomain(hostname: string): boolean {
  return (
    hostname.endsWith('.run.app') ||
    hostname.endsWith('.firebaseapp.com') ||
    hostname.endsWith('.web.app')
  );
}

/**
 * Validates the `caller` parameter passed to `/?drive_oauth_bridge=1&caller=...`.
 * Returns the normalized origin if and only if it belongs to an authorized ClinPharm caller
 * (localhost, 127.0.0.1, Capacitor localhost, GitHub Pages, or authorized Cloud Run / Firebase origins).
 * Rejects `*`, `javascript:`, `data:`, and arbitrary untrusted origins.
 */
export function validateBridgeCallerOrigin(rawCaller: string | null | undefined): string | null {
  if (!rawCaller || typeof rawCaller !== 'string') return null;
  const trimmed = rawCaller.trim();
  if (!trimmed || trimmed === '*') return null;

  if (trimmed === 'capacitor://localhost' || trimmed === 'ionic://localhost') {
    return trimmed;
  }

  try {
    const parsed = new URL(trimmed);
    if (parsed.protocol !== 'https:' && parsed.protocol !== 'http:') {
      return null;
    }
    const host = parsed.hostname.toLowerCase();
    const isLocal =
      host === 'localhost' ||
      host === '127.0.0.1' ||
      host === '[::1]';
    const isGitHubPages =
      parsed.protocol === 'https:' &&
      (host === 'khaledalshormani357-ctrl.github.io' || host.endsWith('.github.io'));
    const isAuthorizedCloud =
      parsed.protocol === 'https:' && isAuthorizedFirebaseDomain(host);

    if (isLocal || isGitHubPages || isAuthorizedCloud) {
      return parsed.origin;
    }
    return null;
  } catch {
    return null;
  }
}

/**
 * Validates `event.origin` on the opener window when receiving a postMessage from the OAuth bridge popup.
 */
export function isAllowedBridgeProviderOrigin(origin: string | null | undefined): boolean {
  if (!origin || typeof origin !== 'string') return false;
  try {
    const parsed = new URL(origin);
    if (parsed.origin === AUTHORIZED_BRIDGE_ORIGIN || parsed.origin === AUTHORIZED_DEV_BRIDGE_ORIGIN) {
      return true;
    }
    if (typeof window !== 'undefined' && parsed.origin === window.location.origin) {
      return true;
    }
    const host = parsed.hostname.toLowerCase();
    if (parsed.protocol === 'https:' && isAuthorizedFirebaseDomain(host)) {
      return true;
    }
    return false;
  } catch {
    return false;
  }
}

export function generateOAuthStateNonce(): string {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }
  const bytes = new Uint8Array(16);
  if (typeof crypto !== 'undefined' && typeof crypto.getRandomValues === 'function') {
    crypto.getRandomValues(bytes);
    return Array.from(bytes, b => b.toString(16).padStart(2, '0')).join('');
  }
  return `state-${Date.now()}-${Math.random().toString(36).slice(2, 12)}`;
}

export function buildAuthorizedBridgeUrl(
  callerOrigin: string,
  state?: string,
  bridgeOrigin: string = AUTHORIZED_BRIDGE_ORIGIN
): string {
  const cleanBase = bridgeOrigin.replace(/\/+$/, '');
  const params = new URLSearchParams();
  params.set('drive_oauth_bridge', '1');
  params.set('caller', callerOrigin);
  if (state) {
    params.set('state', state);
  }
  return `${cleanBase}/?${params.toString()}`;
}

export type BridgePostMessagePayload =
  | {
      type: 'CLINPHARM_DRIVE_OAUTH_SUCCESS';
      accessToken: string;
      state?: string;
    }
  | {
      type: 'CLINPHARM_DRIVE_OAUTH_ERROR';
      error: string;
      state?: string;
    };

/**
 * Safely sends the OAuth bridge result from the popup back to `window.opener`
 * using the strictly validated caller origin (NEVER `'*'`).
 */
export function postBridgeResultToOpener(
  opener: { postMessage: (message: unknown, targetOrigin: string) => void } | null | undefined,
  rawCaller: string | null | undefined,
  payload: BridgePostMessagePayload
): { ok: boolean; targetOrigin?: string; error?: string } {
  const validatedCaller = validateBridgeCallerOrigin(rawCaller);
  if (!validatedCaller) {
    return {
      ok: false,
      error:
        'رفض أمني: أصل النافذة المستدعية (caller) غير صالح أو غير مصرح به. / Security error: caller origin is invalid or unauthorized.'
    };
  }

  if (!opener || typeof opener.postMessage !== 'function') {
    return {
      ok: false,
      error:
        'تعذر العثور على النافذة الأصلية للتطبيق (window.opener غير متاح). يرجى إبقاء نافذة التطبيق مفتوحة أثناء تسجيل الدخول. / Parent application window (window.opener) is not available.'
    };
  }

  opener.postMessage(payload, validatedCaller);
  return {
    ok: true,
    targetOrigin: validatedCaller
  };
}

/**
 * Processes an incoming `MessageEvent` on the parent window, enforcing strict origin
 * and state validation before accepting the OAuth result.
 */
export function handleBridgeWindowMessage(
  event: Pick<MessageEvent, 'origin' | 'data'>,
  options: {
    expectedState?: string;
    onSuccess: (accessToken: string) => void;
    onError: (error: Error) => void;
  }
): boolean {
  if (!isAllowedBridgeProviderOrigin(event.origin)) {
    return false;
  }

  const data = event.data as Record<string, unknown> | null | undefined;
  if (!data || typeof data !== 'object') {
    return false;
  }

  if (
    data.type !== 'CLINPHARM_DRIVE_OAUTH_SUCCESS' &&
    data.type !== 'CLINPHARM_DRIVE_OAUTH_ERROR'
  ) {
    return false;
  }

  if (options.expectedState && data.state !== options.expectedState) {
    return false;
  }

  if (data.type === 'CLINPHARM_DRIVE_OAUTH_SUCCESS') {
    const token = typeof data.accessToken === 'string' ? data.accessToken.trim() : '';
    if (!token) {
      options.onError(new Error('Received empty OAuth access token from bridge.'));
      return true;
    }
    options.onSuccess(token);
    return true;
  }

  const errMsg =
    typeof data.error === 'string' && data.error.trim()
      ? data.error.trim()
      : 'Google Drive OAuth bridge failed';
  options.onError(new Error(errMsg));
  return true;
}

let gisScriptPromise: Promise<void> | null = null;
function loadGoogleIdentityServicesScript(): Promise<void> {
  if (typeof window === 'undefined') return Promise.resolve();
  const win = window as unknown as { google?: { accounts?: { oauth2?: unknown } } };
  if (win.google?.accounts?.oauth2) {
    return Promise.resolve();
  }
  if (gisScriptPromise) return gisScriptPromise;

  gisScriptPromise = new Promise((resolve, reject) => {
    const existing = document.querySelector('script[src="https://accounts.google.com/gsi/client"]');
    if (existing) {
      existing.addEventListener('load', () => resolve());
      existing.addEventListener('error', () => reject(new Error('Failed to load Google GIS script')));
      return;
    }
    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    script.onload = () => resolve();
    script.onerror = () => {
      gisScriptPromise = null;
      reject(new Error('Failed to load Google Identity Services script'));
    };
    document.head.appendChild(script);
  });

  return gisScriptPromise;
}

async function signInViaGoogleIdentityServices(): Promise<string> {
  await loadGoogleIdentityServicesScript();
  return new Promise<string>((resolve, reject) => {
    const win = window as unknown as {
      google?: {
        accounts?: {
          oauth2?: {
            initTokenClient: (config: {
              client_id: string;
              scope: string;
              prompt?: string;
              callback: (response: {
                access_token?: string;
                error?: string;
                error_description?: string;
              }) => void;
              error_callback?: (err: { type?: string; message?: string }) => void;
            }) => { requestAccessToken: (overrideConfig?: { prompt?: string }) => void };
          };
        };
      };
    };

    const oauth2 = win.google?.accounts?.oauth2;
    if (!oauth2) {
      reject(new Error('Google Identity Services OAuth2 client not available'));
      return;
    }

    const tokenClient = oauth2.initTokenClient({
      client_id: OAUTH_CLIENT_ID,
      scope: RUNTIME_DRIVE_SCOPES.join(' '),
      prompt: 'select_account',
      callback: response => {
        if (response.error || !response.access_token) {
          reject(
            new Error(response.error_description || response.error || 'OAuth token request failed')
          );
          return;
        }
        resolve(response.access_token);
      },
      error_callback: err => {
        reject(new Error(err?.message || err?.type || 'Google OAuth popup closed or blocked'));
      }
    });

    tokenClient.requestAccessToken({ prompt: 'select_account' });
  });
}

async function checkBridgeServiceReachable(bridgeOrigin: string): Promise<boolean> {
  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 4500);
    const res = await fetch(`${bridgeOrigin.replace(/\/+$/, '')}/api/copilot/health`, {
      method: 'GET',
      signal: controller.signal
    });
    clearTimeout(timer);
    return res.ok;
  } catch {
    return false;
  }
}

async function signInViaAuthorizedBridgePopup(): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    const state = generateOAuthStateNonce();
    const bridgeUrl = buildAuthorizedBridgeUrl(
      window.location.origin,
      state,
      AUTHORIZED_BRIDGE_ORIGIN
    );
    const width = 520;
    const height = 640;
    const left = Math.max(0, Math.round(window.screenX + (window.outerWidth - width) / 2));
    const top = Math.max(0, Math.round(window.screenY + (window.outerHeight - height) / 2));

    const popup = window.open(
      bridgeUrl,
      'ClinPharmDriveOAuthBridge',
      `width=${width},height=${height},left=${left},top=${top},resizable=yes,scrollbars=yes`
    );

    if (!popup) {
      reject(
        new Error(
          'تم حظر النافذة المنبثقة من المتصفح. يرجى السماح بالنوافذ المنبثقة أو استخدام الاستيراد المباشر بالرابط أو ملف PDF محلي. / Popup blocked by browser. Please allow popups or use Direct Google Drive Link Import below.'
        )
      );
      return;
    }

    let settled = false;
    const cleanup = () => {
      window.removeEventListener('message', onMessage);
      clearInterval(closeTimer);
    };

    const onMessage = (event: MessageEvent) => {
      handleBridgeWindowMessage(event, {
        expectedState: state,
        onSuccess: accessToken => {
          if (settled) return;
          settled = true;
          cleanup();
          try {
            popup.close();
          } catch {
            // ignore
          }
          resolve(accessToken);
        },
        onError: err => {
          if (settled) return;
          settled = true;
          cleanup();
          try {
            popup.close();
          } catch {
            // ignore
          }
          reject(err);
        }
      });
    };

    window.addEventListener('message', onMessage);

    // Concurrently verify that the Cloud Run bridge host is reachable and not serving a 404 page
    void checkBridgeServiceReachable(AUTHORIZED_BRIDGE_ORIGIN).then(isReachable => {
      if (!isReachable && !settled) {
        settled = true;
        cleanup();
        try {
          popup.close();
        } catch {
          // ignore
        }
        reject(
          new Error(
            `خدمة وسيط Google OAuth على Cloud Run (${AUTHORIZED_BRIDGE_ORIGIN}) غير منشورة حالياً أو تعيد 404. يرجى نشر/مشاركة أحدث نسخة من التطبيق على Cloud Run أو استخدام استيراد ملفات PDF مباشرةً. / Cloud Run OAuth Bridge (${AUTHORIZED_BRIDGE_ORIGIN}) is currently unreachable (HTTP 404).`
          )
        );
      }
    });

    const closeTimer = setInterval(() => {
      if (popup.closed && !settled) {
        settled = true;
        cleanup();
        reject(
          new Error(
            'تم إغلاق نافذة تسجيل الدخول قبل إتمام التصريح. / Sign-in window was closed before completing authorization.'
          )
        );
      }
    }, 600);
  });
}

export async function applyManualOrBridgedAccessToken(
  accessToken: string
): Promise<{ user: User; accessToken: string }> {
  const cleanToken = accessToken.trim();
  if (!cleanToken) {
    throw new Error('Access token cannot be empty.');
  }

  const cred = GoogleAuthProvider.credential(null, cleanToken);
  const userCred = await signInWithCredential(auth, cred);

  cachedAccessToken = cleanToken;
  cachedUser = userCred.user;
  notifyListeners();
  return { user: userCred.user, accessToken: cleanToken };
}

// Must be called from a button click or user interaction
export const googleSignIn = async (): Promise<{ user: User; accessToken: string } | null> => {
  try {
    isSigningIn = true;
    const hostname = typeof window !== 'undefined' ? window.location.hostname : '';

    // 1. If running on GitHub Pages (*.github.io) or localhost/APK (not in Firebase authorizedDomains),
    //    try the Authorized Cloud Run OAuth Bridge Popup first, with automatic fallback to GIS if available.
    if (!isAuthorizedFirebaseDomain(hostname)) {
      try {
        const bridgedToken = await signInViaAuthorizedBridgePopup();
        return await applyManualOrBridgedAccessToken(bridgedToken);
      } catch (bridgeErr) {
        const bridgeMsg = bridgeErr instanceof Error ? bridgeErr.message : '';
        // If the Cloud Run bridge returned 404 / unreachable, attempt direct GIS token client if loaded
        if (bridgeMsg.includes('404') || bridgeMsg.includes('unreachable')) {
          try {
            const gisToken = await signInViaGoogleIdentityServices();
            return await applyManualOrBridgedAccessToken(gisToken);
          } catch {
            throw bridgeErr;
          }
        }
        throw bridgeErr;
      }
    }

    // 2. On authorized *.run.app domains, use Google Identity Services (direct accounts.google.com flow)
    //    which completely bypasses firebaseapp.com/__/auth/handler sessionStorage partitioning issues!
    try {
      const gisToken = await signInViaGoogleIdentityServices();
      return await applyManualOrBridgedAccessToken(gisToken);
    } catch {
      const result = await signInWithPopup(auth, provider);
      const credential = GoogleAuthProvider.credentialFromResult(result);
      if (!credential?.accessToken) {
        throw new Error('Failed to obtain Google Drive OAuth access token.');
      }

      cachedAccessToken = credential.accessToken;
      cachedUser = result.user;
      notifyListeners();
      return { user: result.user, accessToken: cachedAccessToken };
    }
  } catch (error: unknown) {
    const safeMsg = error instanceof Error ? error.message : 'Google Drive sign-in failed';
    console.error('Google Drive sign-in error:', safeMsg);
    throw error;
  } finally {
    isSigningIn = false;
  }
};

export const getAccessToken = async (): Promise<string | null> => {
  return cachedAccessToken;
};

export const getCurrentDriveUser = (): User | null => {
  return cachedUser;
};

export const logout = async () => {
  await auth.signOut();
  cachedAccessToken = null;
  cachedUser = null;
  notifyListeners();
};
