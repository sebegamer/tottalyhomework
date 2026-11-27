import {
  assertFails,
  assertSucceeds,
  initializeTestEnvironment,
  RulesTestEnvironment,
} from '@firebase/rules-unit-testing';
import { doc, getDoc, getDocs, collection, setDoc, updateDoc, serverTimestamp, Timestamp } from 'firebase/firestore';
import * as fs from 'fs';

let testEnv: RulesTestEnvironment;

const PROJECT_ID = 'totally-homework-rules-test';

function validPayload(uid: string) {
  return {
    uid,
    displayName: 'Alex Player',
    email: 'alex@example.com',
    photoURL: 'https://example.com/avatar.png',
    favorites: ['minecraft-classic'],
    recentIds: ['minecraft-classic'],
    playCounts: { 'minecraft-classic': 1 },
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  };
}

describe('Firestore Security Rules — Dirty Dozen & Valid Flows', () => {
  beforeAll(async () => {
    testEnv = await initializeTestEnvironment({
      projectId: PROJECT_ID,
      firestore: {
        rules: fs.readFileSync('firestore.rules', 'utf8'),
      },
    });
  });

  afterAll(async () => {
    await testEnv.cleanup();
  });

  beforeEach(async () => {
    await testEnv.clearFirestore();
  });

  test('Valid verified owner can create, get, and update own account', async () => {
    const db = testEnv.authenticatedContext('user_1', { email_verified: true }).firestore();
    await assertSucceeds(setDoc(doc(db, 'users', 'user_1'), validPayload('user_1')));
    await assertSucceeds(getDoc(doc(db, 'users', 'user_1')));
    await assertSucceeds(
      updateDoc(doc(db, 'users', 'user_1'), {
        favorites: ['minecraft-classic', 'grid-snake'],
        updatedAt: serverTimestamp(),
      })
    );
  });

  test('1. Unauthenticated create fails', async () => {
    const db = testEnv.unauthenticatedContext().firestore();
    await assertFails(setDoc(doc(db, 'users', 'attacker'), validPayload('attacker')));
  });

  test('2. Unverified email create fails', async () => {
    const db = testEnv.authenticatedContext('u1', { email_verified: false }).firestore();
    await assertFails(setDoc(doc(db, 'users', 'u1'), validPayload('u1')));
  });

  test('3. Cross-user create fails', async () => {
    const db = testEnv.authenticatedContext('u1', { email_verified: true }).firestore();
    await assertFails(setDoc(doc(db, 'users', 'victim'), validPayload('u1')));
  });

  test('4. UID spoofing inside own doc fails', async () => {
    const db = testEnv.authenticatedContext('u1', { email_verified: true }).firestore();
    await assertFails(setDoc(doc(db, 'users', 'u1'), validPayload('victim')));
  });

  test('5. Shadow field injection fails', async () => {
    const db = testEnv.authenticatedContext('u1', { email_verified: true }).firestore();
    await assertFails(
      setDoc(doc(db, 'users', 'u1'), { ...validPayload('u1'), isAdmin: true, role: 'superadmin' })
    );
  });

  test('6. Cross-user PII read fails', async () => {
    await testEnv.withSecurityRulesDisabled(async (ctx) => {
      await setDoc(doc(ctx.firestore(), 'users', 'victim'), validPayload('victim'));
    });
    const db = testEnv.authenticatedContext('u1', { email_verified: true }).firestore();
    await assertFails(getDoc(doc(db, 'users', 'victim')));
  });

  test('7. Collection-wide list scraping fails', async () => {
    const db = testEnv.authenticatedContext('u1', { email_verified: true }).firestore();
    await assertFails(getDocs(collection(db, 'users')));
  });

  test('8. Client-forged timestamp fails', async () => {
    const db = testEnv.authenticatedContext('u1', { email_verified: true }).firestore();
    await assertFails(
      setDoc(doc(db, 'users', 'u1'), {
        ...validPayload('u1'),
        createdAt: Timestamp.fromMillis(0),
      })
    );
  });

  test('9. Immutable createdAt tampering on update fails', async () => {
    const db = testEnv.authenticatedContext('u1', { email_verified: true }).firestore();
    await assertSucceeds(setDoc(doc(db, 'users', 'u1'), validPayload('u1')));
    await assertFails(
      updateDoc(doc(db, 'users', 'u1'), {
        createdAt: Timestamp.fromMillis(1000),
        updatedAt: serverTimestamp(),
      })
    );
  });

  test('10. Array exhaustion (> 50 favorites) fails', async () => {
    const db = testEnv.authenticatedContext('u1', { email_verified: true }).firestore();
    await assertSucceeds(setDoc(doc(db, 'users', 'u1'), validPayload('u1')));
    await assertFails(
      updateDoc(doc(db, 'users', 'u1'), {
        favorites: Array.from({ length: 51 }, (_, i) => `game-${i}`),
        updatedAt: serverTimestamp(),
      })
    );
  });

  test('11. Value type poisoning on displayName fails', async () => {
    const db = testEnv.authenticatedContext('u1', { email_verified: true }).firestore();
    await assertSucceeds(setDoc(doc(db, 'users', 'u1'), validPayload('u1')));
    await assertFails(
      updateDoc(doc(db, 'users', 'u1'), {
        displayName: 12345 as unknown as string,
        updatedAt: serverTimestamp(),
      })
    );
  });

  test('12. Path variable ID poisoning fails', async () => {
    const db = testEnv.authenticatedContext('bad$id!..', { email_verified: true }).firestore();
    await assertFails(setDoc(doc(db, 'users', 'bad$id!..'), validPayload('bad$id!..')));
  });
});
