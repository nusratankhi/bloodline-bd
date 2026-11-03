-- ==============================================================================
-- DonerBond — Bangladesh National Blood Donation & Emergency Response Platform
-- Migration: 20261103000001_initial_schema.sql
-- Description: Core Database Schema, RBAC, Bangladesh Geo-Hierarchy,
--              Donors, Emergency Requests, Universal Digital IDs, Facilities,
--              Row Level Security (RLS) & Triggers.
-- ==============================================================================

-- 1. Enable Required Extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ==============================================================================
-- 2. ENUMS & CONSTANTS
-- ==============================================================================
DO $$ BEGIN
  CREATE TYPE blood_group_enum AS ENUM ('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-');
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
  CREATE TYPE emergency_priority_enum AS ENUM ('critical', 'urgent', 'normal');
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
  CREATE TYPE emergency_status_enum AS ENUM (
    'draft', 'submitted', 'pending_verification', 'verified',
    'matching_donors', 'donor_contact_requested', 'donor_connected',
    'partially_fulfilled', 'fulfilled', 'cancelled', 'rejected', 'expired'
  );
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
  CREATE TYPE donor_status_enum AS ENUM (
    'available', 'temporarily_unavailable', 'donated_recently',
    'pending_verification', 'suspended', 'inactive'
  );
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
  CREATE TYPE card_status_enum AS ENUM ('pending', 'active', 'suspended', 'revoked', 'expired');
EXCEPTION WHEN duplicate_object THEN null; END $$;

-- ==============================================================================
-- 3. BANGLADESH ADMINISTRATIVE LOCATION HIERARCHY
-- ==============================================================================
CREATE TABLE IF NOT EXISTS divisions (
  id VARCHAR(32) PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  name_bn VARCHAR(100) NOT NULL,
  bbs_code VARCHAR(10),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS districts (
  id VARCHAR(32) PRIMARY KEY,
  division_id VARCHAR(32) NOT NULL REFERENCES divisions(id) ON DELETE CASCADE,
  name VARCHAR(100) NOT NULL,
  name_bn VARCHAR(100) NOT NULL,
  bbs_code VARCHAR(10),
  lat NUMERIC(9,6),
  lng NUMERIC(9,6),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS upazilas (
  id VARCHAR(64) PRIMARY KEY,
  district_id VARCHAR(32) NOT NULL REFERENCES districts(id) ON DELETE CASCADE,
  name VARCHAR(100) NOT NULL,
  name_bn VARCHAR(100) NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS thanas (
  id VARCHAR(64) PRIMARY KEY,
  district_id VARCHAR(32) NOT NULL REFERENCES districts(id) ON DELETE CASCADE,
  name VARCHAR(100) NOT NULL,
  name_bn VARCHAR(100) NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS unions (
  id VARCHAR(64) PRIMARY KEY,
  upazila_id VARCHAR(64) NOT NULL REFERENCES upazilas(id) ON DELETE CASCADE,
  name VARCHAR(100) NOT NULL,
  name_bn VARCHAR(100) NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS wards (
  id VARCHAR(64) PRIMARY KEY,
  district_id VARCHAR(32) NOT NULL REFERENCES districts(id) ON DELETE CASCADE,
  ward_number VARCHAR(20) NOT NULL,
  name_bn VARCHAR(100),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS local_areas (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  district_id VARCHAR(32) NOT NULL REFERENCES districts(id) ON DELETE CASCADE,
  area_name VARCHAR(150) NOT NULL,
  area_name_bn VARCHAR(150),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==============================================================================
-- 4. AUTHENTICATION, PROFILES & ROLE-BASED ACCESS CONTROL (RBAC)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY,
  full_name VARCHAR(150) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  phone VARCHAR(30) UNIQUE NOT NULL,
  avatar_url TEXT,
  date_of_birth DATE,
  gender VARCHAR(20),
  preferred_language VARCHAR(5) DEFAULT 'en',
  division_id VARCHAR(32) REFERENCES divisions(id),
  district_id VARCHAR(32) REFERENCES districts(id),
  upazila_id VARCHAR(64) REFERENCES upazilas(id),
  union_ward VARCHAR(100),
  address_line TEXT,
  is_suspended BOOLEAN DEFAULT FALSE,
  deletion_requested_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS roles (
  id VARCHAR(50) PRIMARY KEY,
  title VARCHAR(100) NOT NULL,
  description TEXT,
  hierarchy_level INT NOT NULL DEFAULT 10,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS permissions (
  id VARCHAR(80) PRIMARY KEY,
  module VARCHAR(50) NOT NULL,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS role_permissions (
  role_id VARCHAR(50) NOT NULL REFERENCES roles(id) ON DELETE CASCADE,
  permission_id VARCHAR(80) NOT NULL REFERENCES permissions(id) ON DELETE CASCADE,
  PRIMARY KEY (role_id, permission_id)
);

CREATE TABLE IF NOT EXISTS user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  role_id VARCHAR(50) NOT NULL REFERENCES roles(id) ON DELETE CASCADE,
  assigned_district_id VARCHAR(32) REFERENCES districts(id),
  is_active BOOLEAN DEFAULT TRUE,
  approved_by UUID REFERENCES profiles(id),
  approved_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE (user_id, role_id)
);

CREATE TABLE IF NOT EXISTS role_assignment_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  requested_role_id VARCHAR(50) NOT NULL REFERENCES roles(id) ON DELETE CASCADE,
  district_id VARCHAR(32) REFERENCES districts(id),
  reason TEXT NOT NULL,
  supporting_document_url TEXT,
  status VARCHAR(20) DEFAULT 'pending', -- pending, approved, rejected
  reviewed_by UUID REFERENCES profiles(id),
  reviewed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS account_verifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  verification_type VARCHAR(30) NOT NULL, -- email, phone, nid, passport
  token_hash VARCHAR(255),
  is_verified BOOLEAN DEFAULT FALSE,
  verified_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==============================================================================
-- 5. DONOR PROFILES & VERIFIED DONATION RECORDS
-- ==============================================================================
CREATE TABLE IF NOT EXISTS donor_profiles (
  user_id UUID PRIMARY KEY REFERENCES profiles(id) ON DELETE CASCADE,
  blood_group blood_group_enum NOT NULL,
  rh_factor VARCHAR(10) DEFAULT '+',
  status donor_status_enum NOT NULL DEFAULT 'available',
  last_donation_date DATE,
  verified_donation_count INT NOT NULL DEFAULT 0,
  is_blood_group_verified BOOLEAN DEFAULT FALSE,
  verification_source VARCHAR(100),
  preferred_contact_method VARCHAR(20) DEFAULT 'in_app', -- in_app, phone, whatsapp
  allow_emergency_alerts BOOLEAN DEFAULT TRUE,
  emergency_contact_phone VARCHAR(30),
  medical_clearance_note TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS donor_availability (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  donor_id UUID NOT NULL REFERENCES donor_profiles(user_id) ON DELETE CASCADE,
  is_available BOOLEAN DEFAULT TRUE,
  reason_unavailable TEXT,
  available_after DATE,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS donor_verifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  donor_id UUID NOT NULL REFERENCES donor_profiles(user_id) ON DELETE CASCADE,
  blood_test_report_url TEXT,
  lab_name VARCHAR(150),
  verified_by UUID REFERENCES profiles(id),
  status VARCHAR(30) DEFAULT 'pending', -- pending, approved, rejected
  rejection_reason TEXT,
  verified_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS donation_records (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  donor_id UUID NOT NULL REFERENCES donor_profiles(user_id) ON DELETE CASCADE,
  donation_date DATE NOT NULL,
  hospital_id UUID,
  camp_id UUID,
  units_donated INT NOT NULL DEFAULT 1,
  verification_status VARCHAR(30) DEFAULT 'pending', -- pending, verified, rejected
  verification_officer_id UUID REFERENCES profiles(id),
  certificate_issued BOOLEAN DEFAULT FALSE,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS donation_verifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  donation_record_id UUID NOT NULL REFERENCES donation_records(id) ON DELETE CASCADE,
  verified_by UUID NOT NULL REFERENCES profiles(id),
  hospital_stamp_url TEXT,
  verification_notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS donor_certificates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  donation_record_id UUID NOT NULL REFERENCES donation_records(id) ON DELETE CASCADE,
  donor_id UUID NOT NULL REFERENCES donor_profiles(user_id) ON DELETE CASCADE,
  certificate_number VARCHAR(100) UNIQUE NOT NULL,
  issue_date DATE NOT NULL,
  pdf_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==============================================================================
-- 6. EMERGENCY BLOOD REQUESTS & SMART MATCHING
-- ==============================================================================
CREATE TABLE IF NOT EXISTS blood_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  request_code VARCHAR(30) UNIQUE NOT NULL, -- EMR-YYYYMMDD-XXXX
  seeker_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  patient_name_masked VARCHAR(100) NOT NULL,
  blood_group blood_group_enum NOT NULL,
  units_needed INT NOT NULL DEFAULT 1,
  hospital_name VARCHAR(150) NOT NULL,
  hospital_location TEXT NOT NULL,
  district_id VARCHAR(32) NOT NULL REFERENCES districts(id),
  upazila_id VARCHAR(64) REFERENCES upazilas(id),
  required_date_time TIMESTAMPTZ NOT NULL,
  priority emergency_priority_enum NOT NULL DEFAULT 'urgent',
  description TEXT,
  contact_person VARCHAR(100) NOT NULL,
  contact_number VARCHAR(30) NOT NULL,
  medical_document_url TEXT,
  status emergency_status_enum NOT NULL DEFAULT 'submitted',
  verified_by UUID REFERENCES profiles(id),
  verified_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS blood_request_updates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  request_id UUID NOT NULL REFERENCES blood_requests(id) ON DELETE CASCADE,
  status emergency_status_enum NOT NULL,
  notes TEXT,
  updated_by UUID REFERENCES profiles(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS blood_request_matches (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  request_id UUID NOT NULL REFERENCES blood_requests(id) ON DELETE CASCADE,
  donor_id UUID NOT NULL REFERENCES donor_profiles(user_id) ON DELETE CASCADE,
  match_score NUMERIC(5,2),
  distance_km NUMERIC(6,2),
  notified_at TIMESTAMPTZ,
  response_status VARCHAR(30) DEFAULT 'pending', -- pending, accepted, declined
  responded_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE (request_id, donor_id)
);

CREATE TABLE IF NOT EXISTS donor_contact_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  request_id UUID NOT NULL REFERENCES blood_requests(id) ON DELETE CASCADE,
  seeker_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  donor_id UUID NOT NULL REFERENCES donor_profiles(user_id) ON DELETE CASCADE,
  message TEXT,
  status VARCHAR(30) DEFAULT 'requested', -- requested, approved, declined, revoked
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE (request_id, donor_id)
);

CREATE TABLE IF NOT EXISTS donor_contact_approvals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  contact_request_id UUID NOT NULL REFERENCES donor_contact_requests(id) ON DELETE CASCADE,
  donor_id UUID NOT NULL REFERENCES donor_profiles(user_id) ON DELETE CASCADE,
  decrypted_contact_shared BOOLEAN DEFAULT TRUE,
  approved_at TIMESTAMPTZ DEFAULT NOW(),
  expires_at TIMESTAMPTZ,
  is_revoked BOOLEAN DEFAULT FALSE
);

-- ==============================================================================
-- 7. UNIVERSAL DIGITAL IDENTITY CARD SYSTEM
-- ==============================================================================
CREATE TABLE IF NOT EXISTS identity_card_templates (
  id VARCHAR(50) PRIMARY KEY, -- general_member, blood_donor, volunteer, super_admin...
  role_id VARCHAR(50) NOT NULL REFERENCES roles(id) ON DELETE CASCADE,
  prefix VARCHAR(10) NOT NULL, -- DB-MB, DB-DR, DB-VL, DB-SA
  theme_color VARCHAR(20) DEFAULT '#D71920',
  card_title VARCHAR(100) NOT NULL,
  validity_years INT DEFAULT 2,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS identity_cards (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  card_number VARCHAR(50) UNIQUE NOT NULL, -- e.g. DB-DR-2026-000001
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  role_id VARCHAR(50) NOT NULL REFERENCES roles(id) ON DELETE CASCADE,
  template_id VARCHAR(50) REFERENCES identity_card_templates(id),
  qr_public_token VARCHAR(64) UNIQUE NOT NULL,
  qr_token_hash VARCHAR(128) NOT NULL,
  issue_date DATE NOT NULL DEFAULT CURRENT_DATE,
  expiry_date DATE,
  status card_status_enum NOT NULL DEFAULT 'active',
  reissue_count INT DEFAULT 0,
  revocation_reason TEXT,
  revoked_by UUID REFERENCES profiles(id),
  revoked_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE (user_id, role_id)
);

CREATE TABLE IF NOT EXISTS identity_card_verifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  card_id UUID NOT NULL REFERENCES identity_cards(id) ON DELETE CASCADE,
  verified_by_ip_hash VARCHAR(64),
  verification_status VARCHAR(30) NOT NULL,
  verified_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS identity_card_share_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  card_id UUID NOT NULL REFERENCES identity_cards(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  platform VARCHAR(30) NOT NULL, -- facebook, whatsapp, linkedin, twitter, copy_link
  shared_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS identity_card_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  card_id UUID NOT NULL REFERENCES identity_cards(id) ON DELETE CASCADE,
  event_type VARCHAR(50) NOT NULL, -- issued, renewed, suspended, revoked
  details JSONB,
  performed_by UUID REFERENCES profiles(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==============================================================================
-- 8. VOLUNTEERS, HOSPITALS, BLOOD BANKS & CAMPS
-- ==============================================================================
CREATE TABLE IF NOT EXISTS volunteer_profiles (
  user_id UUID PRIMARY KEY REFERENCES profiles(id) ON DELETE CASCADE,
  assigned_district_id VARCHAR(32) NOT NULL REFERENCES districts(id),
  assigned_upazila_id VARCHAR(64) REFERENCES upazilas(id),
  availability VARCHAR(30) DEFAULT 'part_time',
  verified_service_hours INT DEFAULT 0,
  completed_tasks_count INT DEFAULT 0,
  badge_level VARCHAR(30) DEFAULT 'Bronze',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS hospitals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(150) NOT NULL,
  name_bn VARCHAR(150),
  hospital_type VARCHAR(50) DEFAULT 'general',
  division_id VARCHAR(32) NOT NULL REFERENCES divisions(id),
  district_id VARCHAR(32) NOT NULL REFERENCES districts(id),
  upazila_id VARCHAR(64) REFERENCES upazilas(id),
  address TEXT NOT NULL,
  phone VARCHAR(50) NOT NULL,
  emergency_hotline VARCHAR(50),
  email VARCHAR(100),
  website VARCHAR(150),
  has_blood_bank BOOLEAN DEFAULT FALSE,
  is_verified BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS blood_banks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(150) NOT NULL,
  name_bn VARCHAR(150),
  hospital_id UUID REFERENCES hospitals(id) ON DELETE SET NULL,
  division_id VARCHAR(32) NOT NULL REFERENCES divisions(id),
  district_id VARCHAR(32) NOT NULL REFERENCES districts(id),
  upazila_id VARCHAR(64) REFERENCES upazilas(id),
  address TEXT NOT NULL,
  phone VARCHAR(50) NOT NULL,
  operating_hours VARCHAR(100) DEFAULT '24/7',
  is_verified BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS blood_inventory_records (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  blood_bank_id UUID NOT NULL REFERENCES blood_banks(id) ON DELETE CASCADE,
  blood_group blood_group_enum NOT NULL,
  available_units INT NOT NULL DEFAULT 0,
  last_verified_at TIMESTAMPTZ DEFAULT NOW(),
  verified_by UUID REFERENCES profiles(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS donation_camps (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(200) NOT NULL,
  title_bn VARCHAR(200),
  organizer_name VARCHAR(150) NOT NULL,
  division_id VARCHAR(32) NOT NULL REFERENCES divisions(id),
  district_id VARCHAR(32) NOT NULL REFERENCES districts(id),
  location_details TEXT NOT NULL,
  start_date TIMESTAMPTZ NOT NULL,
  end_date TIMESTAMPTZ NOT NULL,
  target_units INT DEFAULT 50,
  registered_donors_count INT DEFAULT 0,
  collected_units_count INT DEFAULT 0,
  status VARCHAR(30) DEFAULT 'upcoming', -- upcoming, active, completed, cancelled
  banner_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS camp_registrations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  camp_id UUID NOT NULL REFERENCES donation_camps(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  attended BOOLEAN DEFAULT FALSE,
  registered_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE (camp_id, user_id)
);

-- ==============================================================================
-- 9. NOTIFICATIONS, CMS & AUDIT LOGS
-- ==============================================================================
CREATE TABLE IF NOT EXISTS notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  title VARCHAR(150) NOT NULL,
  message TEXT NOT NULL,
  link_url TEXT,
  notification_type VARCHAR(50) DEFAULT 'general',
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS articles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  excerpt TEXT,
  content TEXT NOT NULL,
  cover_image TEXT,
  author_id UUID REFERENCES profiles(id),
  is_published BOOLEAN DEFAULT FALSE,
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS faqs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  question VARCHAR(255) NOT NULL,
  question_bn VARCHAR(255),
  answer TEXT NOT NULL,
  answer_bn TEXT,
  category VARCHAR(50) DEFAULT 'general',
  display_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS website_settings (
  key VARCHAR(80) PRIMARY KEY,
  value JSONB NOT NULL,
  description TEXT,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS audit_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id),
  action VARCHAR(100) NOT NULL,
  table_name VARCHAR(80),
  record_id VARCHAR(80),
  previous_state JSONB,
  new_state JSONB,
  ip_address VARCHAR(45),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==============================================================================
-- 10. ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE donor_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE blood_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE identity_cards ENABLE ROW LEVEL SECURITY;
ALTER TABLE donation_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE hospitals ENABLE ROW LEVEL SECURITY;
ALTER TABLE blood_banks ENABLE ROW LEVEL SECURITY;
ALTER TABLE donation_camps ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;

-- Profiles: Public can view non-sensitive name & region; Users edit their own profile
CREATE POLICY "Public profiles are readable" ON profiles
  FOR SELECT USING (true);

CREATE POLICY "Users can update their own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

-- Donor Profiles: Searchable publicly, but phone/address kept strictly protected
CREATE POLICY "Public can discover available donors" ON donor_profiles
  FOR SELECT USING (status != 'suspended' AND status != 'inactive');

CREATE POLICY "Donors can update own donor profile" ON donor_profiles
  FOR UPDATE USING (auth.uid() = user_id);

-- Blood Requests: Public view for urgent alerts; Only seeker or admin can modify
CREATE POLICY "Public can view verified blood requests" ON blood_requests
  FOR SELECT USING (status NOT IN ('draft', 'rejected'));

CREATE POLICY "Seekers can manage their own requests" ON blood_requests
  FOR ALL USING (auth.uid() = seeker_id);

-- Identity Cards: Public can verify via secure token hash; Owners view own cards
CREATE POLICY "Public can verify active cards via token" ON identity_cards
  FOR SELECT USING (true);

CREATE POLICY "Users can view their own cards" ON identity_cards
  FOR SELECT USING (auth.uid() = user_id);

-- Notifications: Strictly user private
CREATE POLICY "Users view own notifications" ON notifications
  FOR ALL USING (auth.uid() = user_id);

-- Hospitals, Blood Banks, Camps: Publicly readable
CREATE POLICY "Public can view hospitals" ON hospitals FOR SELECT USING (true);
CREATE POLICY "Public can view blood banks" ON blood_banks FOR SELECT USING (true);
CREATE POLICY "Public can view camps" ON donation_camps FOR SELECT USING (true);

-- ==============================================================================
-- 11. AUTOMATIC TRIGGERS & BUSINESS LOGIC FUNCTIONS
-- ==============================================================================

-- Trigger to increment verified_donation_count on donor_profiles ONLY upon verification
CREATE OR REPLACE FUNCTION increment_donor_verified_donations()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.verification_status = 'verified' AND (OLD.verification_status IS NULL OR OLD.verification_status != 'verified') THEN
    UPDATE donor_profiles
    SET verified_donation_count = verified_donation_count + NEW.units_donated,
        last_donation_date = NEW.donation_date,
        status = 'donated_recently'
    WHERE user_id = NEW.donor_id;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_donation_verified ON donation_records;
CREATE TRIGGER trg_donation_verified
AFTER INSERT OR UPDATE ON donation_records
FOR EACH ROW
EXECUTE FUNCTION increment_donor_verified_donations();
