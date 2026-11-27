import { initializeApp } from 'firebase/app';
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';
import {
  getFirestore,
  doc,
  getDoc,
  getDocFromServer,
  setDoc,
  updateDoc,
  onSnapshot,
  serverTimestamp,
} from 'firebase/firestore';
import firebaseConfig from './firebase-applet-config.json';

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });

export const OperationType = Object.freeze({
  CREATE: 'create',
  UPDATE: 'update',
  DELETE: 'delete',
  LIST: 'list',
  GET: 'get',
  WRITE: 'write',
});

export function handleFirestoreError(error, operationType, path) {
  const errInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid ?? null,
      email: auth.currentUser?.email ?? null,
      emailVerified: auth.currentUser?.emailVerified ?? null,
      isAnonymous: auth.currentUser?.isAnonymous ?? null,
      tenantId: auth.currentUser?.tenantId ?? null,
      providerInfo:
        auth.currentUser?.providerData?.map((provider) => ({
          providerId: provider.providerId,
          email: provider.email,
        })) || [],
    },
    operationType,
    path,
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

export async function testConnection() {
  try {
    await getDocFromServer(doc(db, 'test', 'connection'));
  } catch (error) {
    if (error instanceof Error && error.message.includes('the client is offline')) {
      console.error('Please check your Firebase configuration.');
    }
  }
}

testConnection();

const VALID_ID_REGEX = /^[a-zA-Z0-9_-]+$/;

function sanitizeDisplayName(user) {
  const raw =
    (typeof user?.displayName === 'string' && user.displayName.trim()) ||
    (typeof user?.email === 'string' && user.email.split('@')[0]) ||
    'Player';
  return raw.slice(0, 80) || 'Player';
}

function sanitizeEmail(user) {
  const raw = typeof user?.email === 'string' ? user.email.trim() : '';
  return raw.slice(0, 254);
}

function sanitizePhotoUrl(user) {
  const raw = typeof user?.photoURL === 'string' ? user.photoURL.trim() : '';
  return raw.slice(0, 500);
}

export function sanitizeIdArray(items, maxLen) {
  if (!Array.isArray(items)) return [];
  const seen = new Set();
  const out = [];
  for (const item of items) {
    if (typeof item !== 'string') continue;
    const trimmed = item.trim();
    if (trimmed.length < 1 || trimmed.length > 64 || !VALID_ID_REGEX.test(trimmed)) {
      continue;
    }
    if (!seen.has(trimmed)) {
      seen.add(trimmed);
      out.push(trimmed);
      if (out.length >= maxLen) break;
    }
  }
  return out;
}

export function sanitizePlayCounts(counts) {
  if (!counts || typeof counts !== 'object' || Array.isArray(counts)) return {};
  const out = {};
  let entries = 0;
  for (const [key, val] of Object.entries(counts)) {
    if (entries >= 50) break;
    if (typeof key !== 'string' || key.length < 1 || key.length > 64 || !VALID_ID_REGEX.test(key)) {
      continue;
    }
    const num = Math.max(0, Math.floor(Number(val) || 0));
    if (num > 0) {
      out[key] = num;
      entries += 1;
    }
  }
  return out;
}

export function sanitizeEquippedFlair(flair) {
  if (typeof flair !== 'string') return '';
  const trimmed = flair.trim();
  if (!trimmed || trimmed.length > 64 || !VALID_ID_REGEX.test(trimmed)) return '';
  return trimmed;
}

export function sanitizeSafeInt(val, maxVal = 1000000) {
  const num = Math.floor(Number(val) || 0);
  if (!Number.isFinite(num) || num < 0) return 0;
  return Math.min(maxVal, num);
}

function mergePlayCounts(cloudCounts, localCounts) {
  const merged = { ...sanitizePlayCounts(cloudCounts) };
  const cleanLocal = sanitizePlayCounts(localCounts);
  for (const [id, count] of Object.entries(cleanLocal)) {
    merged[id] = Math.max(merged[id] || 0, count);
  }
  return sanitizePlayCounts(merged);
}

export async function signInWithGoogle() {
  return signInWithPopup(auth, googleProvider);
}

export async function signOutAccount() {
  return signOut(auth);
}

export function observeAuth(callback) {
  return onAuthStateChanged(auth, callback);
}

export async function ensureUserAccount(user, localState) {
  const path = `users/${user.uid}`;
  const userRef = doc(db, 'users', user.uid);

  let snap;
  try {
    snap = await getDoc(userRef);
  } catch (error) {
    handleFirestoreError(error, OperationType.GET, path);
  }

  const displayName = sanitizeDisplayName(user);
  const email = sanitizeEmail(user);
  const photoURL = sanitizePhotoUrl(user);

  const localFavorites = sanitizeIdArray(localState?.favorites || [], 50);
  const localRecent = sanitizeIdArray(localState?.recentIds || [], 6);
  const localCounts = sanitizePlayCounts(localState?.playCounts || {});
  const localHwDone = sanitizeIdArray(localState?.hwDone || [], 50);

  if (!snap.exists()) {
    const newAccount = {
      uid: user.uid,
      displayName,
      email,
      ...(photoURL ? { photoURL } : {}),
      favorites: localFavorites,
      recentIds: localRecent,
      playCounts: localCounts,
      achievements: [],
      equippedFlair: '',
      coins: 0,
      lifetimeCoins: 0,
      unlockedThemes: [],
      equippedTheme: '',
      hwDone: localHwDone,
      quizCorrect: 0,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    };

    try {
      await setDoc(userRef, newAccount);
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, path);
    }

    return {
      isNewAccount: true,
      account: {
        ...newAccount,
        createdAt: null,
        updatedAt: null,
      },
    };
  }

  const existing = snap.data() || {};
  const cloudFavorites = sanitizeIdArray(existing.favorites || [], 50);
  const cloudRecent = sanitizeIdArray(existing.recentIds || [], 6);
  const cloudCounts = sanitizePlayCounts(existing.playCounts || {});
  const cloudAchievements = sanitizeIdArray(existing.achievements || [], 30);
  const cloudEquipped = sanitizeEquippedFlair(existing.equippedFlair || '');
  const safeEquipped = cloudEquipped && cloudAchievements.includes(cloudEquipped) ? cloudEquipped : '';
  const cloudCoins = sanitizeSafeInt(existing.coins, 1000000);
  const cloudLifetimeCoins = Math.max(cloudCoins, sanitizeSafeInt(existing.lifetimeCoins, 1000000));
  const cloudUnlockedThemes = sanitizeIdArray(existing.unlockedThemes || [], 20);
  const cloudEquippedTheme = sanitizeEquippedFlair(existing.equippedTheme || '');
  const cloudHwDone = sanitizeIdArray(existing.hwDone || [], 50);
  const cloudQuizCorrect = sanitizeSafeInt(existing.quizCorrect, 100000);

  const mergedFavorites = sanitizeIdArray([...cloudFavorites, ...localFavorites], 50);
  const mergedRecent = sanitizeIdArray([...localRecent, ...cloudRecent], 6);
  const mergedCounts = mergePlayCounts(cloudCounts, localCounts);
  const mergedHwDone = sanitizeIdArray([...cloudHwDone, ...localHwDone], 50);

  const profileChanged =
    existing.displayName !== displayName ||
    existing.email !== email ||
    (photoURL && existing.photoURL !== photoURL);

  const dataChanged =
    mergedFavorites.length !== cloudFavorites.length ||
    mergedRecent.length !== cloudRecent.length ||
    mergedHwDone.length !== cloudHwDone.length ||
    JSON.stringify(mergedCounts) !== JSON.stringify(cloudCounts) ||
    !Array.isArray(existing.achievements) ||
    typeof existing.equippedFlair !== 'string' ||
    typeof existing.coins !== 'number' ||
    typeof existing.lifetimeCoins !== 'number' ||
    !Array.isArray(existing.unlockedThemes) ||
    typeof existing.equippedTheme !== 'string' ||
    !Array.isArray(existing.hwDone) ||
    typeof existing.quizCorrect !== 'number';

  if (profileChanged || dataChanged) {
    const updatePayload = {
      displayName,
      email,
      ...(photoURL ? { photoURL } : {}),
      favorites: mergedFavorites,
      recentIds: mergedRecent,
      playCounts: mergedCounts,
      achievements: cloudAchievements,
      equippedFlair: safeEquipped,
      coins: cloudCoins,
      lifetimeCoins: cloudLifetimeCoins,
      unlockedThemes: cloudUnlockedThemes,
      equippedTheme: cloudEquippedTheme,
      hwDone: mergedHwDone,
      quizCorrect: cloudQuizCorrect,
      updatedAt: serverTimestamp(),
    };

    try {
      await updateDoc(userRef, updatePayload);
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, path);
    }
  }

  return {
    isNewAccount: false,
    account: {
      uid: user.uid,
      displayName,
      email,
      photoURL: photoURL || existing.photoURL || '',
      favorites: mergedFavorites,
      recentIds: mergedRecent,
      playCounts: mergedCounts,
      achievements: cloudAchievements,
      equippedFlair: safeEquipped,
      coins: cloudCoins,
      lifetimeCoins: cloudLifetimeCoins,
      unlockedThemes: cloudUnlockedThemes,
      equippedTheme: cloudEquippedTheme,
      hwDone: mergedHwDone,
      quizCorrect: cloudQuizCorrect,
      createdAt: existing.createdAt || null,
      updatedAt: existing.updatedAt || null,
    },
  };
}

export function subscribeToUserAccount(uid, onData, onError) {
  const path = `users/${uid}`;
  const userRef = doc(db, 'users', uid);

  return onSnapshot(
    userRef,
    (snapshot) => {
      if (snapshot.exists()) {
        onData(snapshot.data());
      }
    },
    (error) => {
      try {
        handleFirestoreError(error, OperationType.GET, path);
      } catch (wrapped) {
        if (onError) onError(wrapped);
      }
    }
  );
}

export async function syncUserArcadeData(uid, arcadeState) {
  const path = `users/${uid}`;
  const userRef = doc(db, 'users', uid);
  const cleanAchievements = sanitizeIdArray(arcadeState?.achievements || [], 30);
  const cleanEquipped = sanitizeEquippedFlair(arcadeState?.equippedFlair || '');
  const safeEquipped = cleanEquipped && cleanAchievements.includes(cleanEquipped) ? cleanEquipped : '';
  const cleanCoins = sanitizeSafeInt(arcadeState?.coins, 1000000);
  const cleanLifetimeCoins = Math.max(cleanCoins, sanitizeSafeInt(arcadeState?.lifetimeCoins, 1000000));
  const cleanUnlockedThemes = sanitizeIdArray(arcadeState?.unlockedThemes || [], 20);
  const cleanEquippedTheme = sanitizeEquippedFlair(arcadeState?.equippedTheme || '');
  const cleanHwDone = sanitizeIdArray(arcadeState?.hwDone || [], 50);
  const cleanQuizCorrect = sanitizeSafeInt(arcadeState?.quizCorrect, 100000);

  const payload = {
    favorites: sanitizeIdArray(arcadeState?.favorites || [], 50),
    recentIds: sanitizeIdArray(arcadeState?.recentIds || [], 6),
    playCounts: sanitizePlayCounts(arcadeState?.playCounts || {}),
    achievements: cleanAchievements,
    equippedFlair: safeEquipped,
    coins: cleanCoins,
    lifetimeCoins: cleanLifetimeCoins,
    unlockedThemes: cleanUnlockedThemes,
    equippedTheme: cleanEquippedTheme,
    hwDone: cleanHwDone,
    quizCorrect: cleanQuizCorrect,
    updatedAt: serverTimestamp(),
  };

  try {
    await updateDoc(userRef, payload);
  } catch (error) {
    handleFirestoreError(error, OperationType.UPDATE, path);
  }
}

export function getFriendlyFirebaseError(error) {
  const code = typeof error?.code === 'string' ? error.code : '';
  const raw = error instanceof Error ? error.message : String(error);
  const combined = `${code} ${raw}`;

  if (combined.includes('popup-closed-by-user')) {
    return 'Sign-in window was closed before completing.';
  }
  if (combined.includes('cancelled-popup-request')) {
    return 'Sign-in was interrupted by another sign-in request. Please try once more.';
  }
  if (combined.includes('popup-blocked')) {
    return 'Pop-up was blocked by your browser. Please allow pop-ups and try again.';
  }
  if (combined.includes('unauthorized-domain')) {
    return 'This preview domain is not authorized for Google Sign-In in Firebase Auth settings.';
  }
  if (combined.includes('operation-not-allowed')) {
    return 'Google Sign-In is not enabled for this Firebase project yet.';
  }
  if (combined.includes('network-request-failed')) {
    return 'Network error while reaching Google Sign-In. Check your connection and try again.';
  }
  if (combined.includes('Quota exceeded')) {
    return 'Daily database quota exceeded. Your local progress is still saved and cloud sync will resume tomorrow.';
  }
  if (combined.includes('Missing or insufficient permissions')) {
    return 'Unable to access your account data right now. Please sign out and sign back in.';
  }
  return code ? `Sign-in failed (${code}). Please try again.` : 'Could not sign in right now. Please try again.';
}
