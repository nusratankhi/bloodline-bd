# DonerBond — Deployment & Production Operations Guide
## Vercel & Supabase Production Infrastructure

---

## 1. Prerequisites
1. **Supabase Cloud Project**:
   - Create a new project in the Singapore or Mumbai region for optimal latency to Bangladesh.
   - Run the migration script: `supabase/migrations/20261103000001_initial_schema.sql`.
   - Run the seed script: `supabase/seed/bangladesh_locations.sql`.
2. **Vercel Hosting**:
   - Link repository to Vercel.
   - Set Framework Preset to **Next.js**.

---

## 2. Environment Variables Configuration

In Vercel Project Settings → Environment Variables:

| Variable | Scope | Description |
|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Public / Browser | Supabase project endpoint |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Public / Browser | Supabase public anonymous key |
| `SUPABASE_SERVICE_ROLE_KEY` | Server-Side Only | High-privilege key for Server Actions & webhooks |
| `NEXT_PUBLIC_APP_URL` | Public / Browser | Domain (e.g. `https://donerbond.org`) |
| `NEXT_PUBLIC_NATIONAL_HOTLINE` | Public | Emergency hotline (`10672`) |
| `NEXT_PUBLIC_SUPPORT_EMAIL` | Public | Support email (`info@donerbond.org`) |

---

## 3. Production Readiness Verification
- [ ] Confirm RLS is enabled on all tables.
- [ ] Verify Storage Buckets have signed URL rules enabled for lab reports.
- [ ] Test public ID card QR scanning via a mobile device.
