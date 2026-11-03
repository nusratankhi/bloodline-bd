# DonerBond — Quality Assurance & Testing Suite Specification

---

## 1. Test Suite Architecture

The test suite covers four validation tiers:
1. **Unit Testing**:
   - `id-card-generator.test.ts`: Verifies serial format (`DB-[ROLE]-[YEAR]-[SERIAL]`), cryptographic token generation, and SHA-256 token hashing.
   - `location-hierarchy.test.ts`: Confirms accurate BBS codes, 8 Divisions, 64 Districts, and dependent upazila relationships.
   - `donor-matching.test.ts`: Tests compatible blood group matching rules and proximity scoring.
2. **Integration Testing**:
   - User registration flow and automatic role assignment.
   - Emergency blood request dispatch and subscriber notifications.
   - Digital ID card generation and token verification lookup.
3. **Security Testing**:
   - Prevention of unauthorized role escalation.
   - Protection of masked donor phone numbers and private coordinates.
   - Verification of active card state enforcement (revoked cards fail immediately).
4. **End-to-End (Playwright)**:
   - Full seeker journey: Posting request → Finding donor → Requesting contact → Approval.

---

## 2. Test Execution Command
```bash
npm run test
```
