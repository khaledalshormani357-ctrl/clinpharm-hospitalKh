import { initializeApp, getApps, getApp } from 'firebase/app';
import {
  getAuth,
  signInWithPopup,
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
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '983876723590'
};

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

const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth(app);

const provider = new GoogleAuthProvider();
for (const scope of SCOPES) {
  provider.addScope(scope);
}
provider.setCustomParameters({
  prompt: 'consent'
});

// Flag to indicate if we are in the middle of a sign-in flow.
let isSigningIn = false;
// Cache the access token strictly in memory (never in localStorage or sessionStorage).
let cachedAccessToken: string | null = null;
let cachedUser: User | null = null;

type AuthListener = (state: { user: User | null; accessToken: string | null; needsAuth: boolean }) => void;
const listeners = new Set<AuthListener>();

function notifyListeners() {
  const needsAuth = !cachedUser || !cachedAccessToken;
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
    needsAuth: !cachedUser || !cachedAccessToken
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
    cachedUser = user;
    if (user) {
      if (cachedAccessToken) {
        notifyListeners();
        if (onAuthSuccess) onAuthSuccess(user, cachedAccessToken);
      } else if (!isSigningIn) {
        cachedAccessToken = null;
        notifyListeners();
        if (onAuthFailure) onAuthFailure();
      }
    } else {
      cachedAccessToken = null;
      notifyListeners();
      if (onAuthFailure) onAuthFailure();
    }
  });
};

// Must be called from a button click or user interaction
export const googleSignIn = async (): Promise<{ user: User; accessToken: string } | null> => {
  try {
    isSigningIn = true;
    const result = await signInWithPopup(auth, provider);
    const credential = GoogleAuthProvider.credentialFromResult(result);
    if (!credential?.accessToken) {
      throw new Error('Failed to obtain Google Drive OAuth access token from Firebase Auth.');
    }

    cachedAccessToken = credential.accessToken;
    cachedUser = result.user;
    notifyListeners();
    return { user: result.user, accessToken: cachedAccessToken };
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
