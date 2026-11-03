# DonerBond — Database Schema & Data Dictionary
## Complete PostgreSQL Specification for Supabase

---

## 1. Schema Overview

The DonerBond database architecture is organized into 11 cohesive domains:

```
├── 1. Authentication & RBAC (profiles, roles, permissions, user_roles, user_permissions, role_assignment_requests, account_verifications)
├── 2. Bangladesh Location Hierarchy (divisions, districts, upazilas, thanas, unions, wards, local_areas)
├── 3. Donor Management (donor_profiles, donor_availability, donor_verifications, donor_contact_preferences, donation_records, donation_verifications, donor_certificates)
├── 4. Emergency Blood Requests & Matching (blood_requests, blood_request_updates, blood_request_matches, donor_contact_requests, donor_contact_approvals)
├── 5. Universal Digital Identity Cards (identity_cards, identity_card_templates, identity_card_verifications, identity_card_share_logs, identity_card_events, identity_card_role_history)
├── 6. Community & Volunteer Coordination (volunteer_profiles, volunteer_assignments, volunteer_activity_logs, achievements, user_achievements, user_feedback, user_reports)
├── 7. Healthcare Facilities (hospitals, hospital_staff, blood_banks, blood_bank_staff, blood_inventory_records)
├── 8. Blood Donation Camps (donation_camps, camp_registrations, camp_attendance, camp_donation_records)
├── 9. Communications & Notifications (notifications, notification_preferences, notification_templates, notification_delivery_logs)
├── 10. CMS & Public Content (articles, faqs, homepage_sections, website_settings, social_links)
└── 11. Security, Governance & Audit (audit_logs, moderation_actions, system_settings, admin_assignments)
```

---

## 2. Table Specifications & Integrity Constraints

### 2.1 Profiles & RBAC
- **`profiles`**: Links 1:1 with `auth.users.id`. Contains `full_name`, `avatar_url`, `phone`, `date_of_birth`, `gender`, `preferred_language` (`en` | `bn`), `division_id`, `district_id`, `upazila_id`, `union_ward`, `address_line`, `is_suspended`, `deletion_requested_at`.
- **`roles`**: Enumerates the 16 platform roles (`super_admin`, `district_admin`, `moderator`, `verification_officer`, `blood_bank_admin`, `hospital_admin`, `blood_bank_staff`, `hospital_staff`, `district_coordinator`, `upazila_coordinator`, `union_coordinator`, `volunteer`, `blood_donor`, `blood_seeker`, `registered_member`, `public_visitor`).
- **`permissions`**: Granular capability keys (e.g., `blood_request:verify`, `donation:verify`, `card:revoke`, `location:manage`).
- **`user_roles`**: Many-to-many junction table assigning roles to profiles with verification status (`active`, `suspended`, `revoked`), assigned scope (`district_id`), and approved by metadata.

### 2.2 Bangladesh Administrative Locations
- **`divisions`**: 8 Divisions (`Dhaka`, `Chittagong`, `Rajshahi`, `Khulna`, `Barisal`, `Sylhet`, `Rangpur`, `Mymensingh`) with English & Bangla names.
- **`districts`**: 64 Districts linked to divisions with official BBS codes and coordinates.
- **`upazilas`**: Sub-districts / rural sub-administrative units.
- **`thanas`**: Metropolitan police jurisdictions and municipal thanas.
- **`unions`**: Rural union parishads.
- **`wards`**: Urban city corporation & pourashava wards.

### 2.3 Donors & Verified Donation Records
- **`donor_profiles`**: `blood_group` (`A+`, `A-`, `B+`, `B-`, `AB+`, `AB-`, `O+`, `O-`), `rh_factor`, `status` (`available`, `temporarily_unavailable`, `donated_recently`, `pending_verification`, `suspended`, `inactive`), `verified_donation_count` (Strictly maintained via database trigger upon verification approval, never manually overwritten by client).
- **`donation_records`**: Records actual blood donation events (`patient_identifier`, `hospital_id`, `camp_id`, `donation_date`, `blood_units`, `verification_status`).
- **`donation_verifications`**: Audited sign-offs by `verification_officer` or `hospital_staff` attaching lab certificate proofs.

### 2.4 Emergency Blood Requests & Smart Matching
- **`blood_requests`**: `request_code` (`EMR-YYYYMMDD-XXXX`), `patient_name_masked`, `blood_group`, `units_needed`, `urgency` (`critical`, `urgent`, `normal`), `hospital_name`, `hospital_district_id`, `required_date_time`, `status`, `seeker_id`.
- **`donor_contact_requests`**: Connects seeker with potential donor while preserving privacy until donor explicitly accepts.
- **`donor_contact_approvals`**: Encrypted contact tokens, revocation mechanisms, and expiration timestamps.

### 2.5 Universal Digital Identity Card System
- **`identity_cards`**:
  - `card_number`: e.g. `DB-DR-2026-000001`
  - `user_id`: UUID
  - `role_id`: Role reference
  - `qr_public_token`: Secure 32-byte cryptographic random token
  - `qr_token_hash`: SHA-256 hash stored for public lookup
  - `status`: `active`, `suspended`, `revoked`, `expired`
  - `issue_date`, `expiry_date`
  - `blood_group`, `verified_donation_count` (for donors)
- **`identity_card_verifications`**: Rate-limited, privacy-safe verification access logs.
- **`identity_card_share_logs`**: User-initiated sharing metrics for social networks.
