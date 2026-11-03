# DonerBond — Security & Data Protection Architecture
## National Healthcare Infrastructure Standards

---

## 1. Zero-Trust Access Control & RLS

Every database interaction adheres to PostgreSQL Row Level Security (RLS). Under no circumstances are administrative privileges or bypass mechanisms provided to frontend clients.

### 1.1 Key Principles
1. **Never Expose `SUPABASE_SERVICE_ROLE_KEY`**: Service role operations are strictly restricted to isolated Next.js Server Actions and backend edge handlers.
2. **Geographic Admin Scoping**: A `district_admin` for Chittagong cannot query or alter donor records, emergency requests, or volunteer assignments belonging to Dhaka or other districts.
3. **No Direct Contact Exposing**: Donor phone numbers, private home addresses, and emergency contacts are encrypted/masked in the public directory. Contact sharing is unlocked strictly via explicit double-opt-in consent (`donor_contact_approvals`).
4. **Cryptographic ID Token Verification**: Public verification URLs use a random 32-byte cryptographic token (`/verify/id/[token]`). The database stores a SHA-256 hash of this token, preventing enumeration and reverse-engineering of user accounts.

---

## 2. Medical Safety Disclaimers
DonerBond explicitly avoids making clinical decisions:
- A 90-day interval reminder is an administrative convenience, **never medical clearance**.
- Blood group matching is based on voluntary reporting until stamped by a `verification_officer` with lab verification.
- Transfusion compatibility must be performed by certified clinical pathologists at the treating hospital facility.

---

## 3. Rate Limiting & Abuse Prevention
- Public search endpoints and QR verification are rate-limited.
- Emergency request submissions require CAPTCHA / rate-limiting protection to prevent spam or fraudulent requests.
- All administrative escalations, role approvals, and identity card revocations emit immutable entries into `audit_logs`.
