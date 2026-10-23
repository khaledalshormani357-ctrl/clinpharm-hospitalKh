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
  'https://ais-pre-sr6y5mqqoromsgvakmmu26-177021215798.europe-west2.run.app';

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

function isAuthorizedFirebaseDomain(hostname: string): boolean {
  return (
    hostname.endsWith('.run.app') ||
    hostname.endsWith('.firebaseapp.com') ||
    hostname.endsWith('.web.app')
  );
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
              callback: (response: { access_token?: string; error?: string; error_description?: string }) => void;
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
          reject(new Error(response.error_description || response.error || 'OAuth token request failed'));
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

async function signInViaAuthorizedBridgePopup(): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    const bridgeUrl = `${AUTHORIZED_BRIDGE_ORIGIN}/?drive_oauth_bridge=1&caller=${encodeURIComponent(
      window.location.origin
    )}`;
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
          'Popup blocked by browser. Please allow popups or use Direct Google Drive Link Import below.'
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
      const data = event.data;
      if (!data || typeof data !== 'object') return;
      if (data.type === 'CLINPHARM_DRIVE_OAUTH_SUCCESS' && typeof data.accessToken === 'string') {
        settled = true;
        cleanup();
        try {
          popup.close();
        } catch {
          // ignore
        }
        resolve(data.accessToken);
      } else if (data.type === 'CLINPHARM_DRIVE_OAUTH_ERROR') {
        settled = true;
        cleanup();
        reject(new Error(data.error || 'Google Drive OAuth bridge failed'));
      }
    };

    window.addEventListener('message', onMessage);

    const closeTimer = setInterval(() => {
      if (popup.closed && !settled) {
        settled = true;
        cleanup();
        reject(new Error('Sign-in window was closed before completing authorization.'));
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
    //    use the Authorized Cloud Run OAuth Bridge Popup so Firebase handler never says "The requested action is invalid."
    if (!isAuthorizedFirebaseDomain(hostname)) {
      const bridgedToken = await signInViaAuthorizedBridgePopup();
      return await applyManualOrBridgedAccessToken(bridgedToken);
    }

    // 2. On authorized *.run.app domains, use Google Identity Services (direct accounts.google.com flow)
    //    which completely bypasses firebaseapp.com/__/auth/handler sessionStorage partitioning issues!
    try {
      const gisToken = await signInViaGoogleIdentityServices();
      return await applyManualOrBridgedAccessToken(gisToken);
    } catch (gisErr) {
      console.warn('GIS direct token client fallback to Firebase signInWithPopup:', gisErr);
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
    console.error('Google Drive sign-in error:', error);
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
