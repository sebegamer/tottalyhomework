# Security Specification — Totally Homework

## 1. Data Invariants

1. **Strict Owner Isolation (PII Protection)**: Every document in `/users/{userId}` contains private PII (`email`) and personal arcade progress (`favorites`, `recentIds`, `playCounts`). Only the verified owner (`request.auth.uid == userId` and `request.auth.token.email_verified == true` for writes) may read (`get`) or write that document. Collection-wide `list` queries on `/users` are unconditionally denied (`allow list: if false;`).
2. **Identity Binding**: `uid` inside `/users/{userId}` MUST equal both the document path variable `userId` and `request.auth.uid`, and `userId` MUST match `^[a-zA-Z0-9_\-]+$` with length `1..128`.
3. **Immutable Ownership & Creation Time**: On `update`, `uid` and `createdAt` are strictly immutable (`incoming().uid == existing().uid` and `incoming().createdAt == existing().createdAt`).
4. **Server-Enforced Timestamps**: Both `createdAt` (on `create`) and `updatedAt` (on `create` and `update`) MUST equal `request.time`. Client-forged timestamps are rejected.
5. **Bounded Volumetric Limits & Strict Keys**:
   - `displayName`: string, 1..80 chars
   - `email`: string, 3..254 chars
   - `photoURL` (optional): string, 0..500 chars
   - `favorites`: list of strings, max 50 items (first item validated string 1..64 chars when non-empty)
   - `recentIds`: list of strings, max 6 items (first item validated string 1..64 chars when non-empty)
   - `playCounts`: map, max 50 entries
   - No shadow/ghost fields allowed on `create` or `update`.

---

## 2. The "Dirty Dozen" Adversarial Payloads

All 12 payloads below MUST fail with `PERMISSION_DENIED`:

1. **Unauthenticated Account Create**: `auth = null`, `setDoc(/users/attacker, validUserPayload)` -> Denied (`request.auth != null` fails).
2. **Unverified Email Account Create**: `auth = { uid: 'u1', email_verified: false }`, `setDoc(/users/u1, validUserPayload)` -> Denied (`email_verified == true` fails).
3. **Cross-User Account Hijack (Create)**: `auth = { uid: 'u1', email_verified: true }`, `setDoc(/users/victim, { ...valid, uid: 'u1' })` -> Denied (`isOwner(userId)` fails).
4. **UID Spoofing Inside Own Document**: `auth = { uid: 'u1', email_verified: true }`, `setDoc(/users/u1, { ...valid, uid: 'victim' })` -> Denied (`data.uid == request.auth.uid` fails).
5. **Shadow / Ghost Field Injection (Create)**: `auth = { uid: 'u1', email_verified: true }`, `setDoc(/users/u1, { ...valid, isAdmin: true, role: 'superadmin' })` -> Denied (`hasOnly` rejects unknown keys).
6. **PII Cross-User Read (`get`)**: `auth = { uid: 'u1', email_verified: true }`, `getDoc(/users/victim)` -> Denied (`isOwner(userId)` fails).
7. **PII Collection Scraping (`list`)**: `auth = { uid: 'u1', email_verified: true }`, `getDocs(collection(db, 'users'))` -> Denied (`allow list: if false;`).
8. **Client-Forged Timestamp (`createdAt` / `updatedAt`)**: `auth = { uid: 'u1', email_verified: true }`, `setDoc(/users/u1, { ...valid, createdAt: Timestamp.fromMillis(0) })` -> Denied (`incoming().createdAt == request.time` fails).
9. **Immutable `createdAt` or `uid` Tampering on Update**: `auth = { uid: 'u1', email_verified: true }`, `updateDoc(/users/u1, { createdAt: Timestamp.now(), updatedAt: serverTimestamp() })` -> Denied (`affectedKeys` + immutability check fails).
10. **Array Exhaustion ("Denial of Wallet")**: `auth = { uid: 'u1', email_verified: true }`, `updateDoc(/users/u1, { favorites: Array(51).fill('grid-snake'), updatedAt: serverTimestamp() })` -> Denied (`data.favorites.size() <= 50` fails).
11. **Value Type Poisoning on Allowed Update Key**: `auth = { uid: 'u1', email_verified: true }`, `updateDoc(/users/u1, { displayName: 12345, updatedAt: serverTimestamp() })` -> Denied (`isValidUserAccount` enforces `displayName is string`).
12. **Path Variable ID Poisoning**: `auth = { uid: 'u1', email_verified: true }`, `setDoc(/users/bad$id!.., valid)` -> Denied (`isValidId(userId)` regex fails).
