-- ==============================================================================
-- BloodLine — Bangladesh National Blood Donation Network
-- COMPLETE ONE-CLICK DATABASE SETUP SCRIPT
-- Paste this entire script in Supabase SQL Editor and click "RUN"
-- ==============================================================================

-- 1. Enable Required Extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 2. ENUMS & CONSTANTS
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

-- 3. BANGLADESH ADMINISTRATIVE LOCATION HIERARCHY
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

-- 4. AUTHENTICATION, PROFILES & ROLE-BASED ACCESS CONTROL (RBAC)
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
  status VARCHAR(20) DEFAULT 'pending',
  reviewed_by UUID REFERENCES profiles(id),
  reviewed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS account_verifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  verification_type VARCHAR(30) NOT NULL,
  token_hash VARCHAR(255),
  is_verified BOOLEAN DEFAULT FALSE,
  verified_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. DONOR PROFILES & VERIFIED DONATION RECORDS
CREATE TABLE IF NOT EXISTS donor_profiles (
  user_id UUID PRIMARY KEY REFERENCES profiles(id) ON DELETE CASCADE,
  blood_group blood_group_enum NOT NULL,
  rh_factor VARCHAR(10) DEFAULT '+',
  status donor_status_enum NOT NULL DEFAULT 'available',
  last_donation_date DATE,
  verified_donation_count INT NOT NULL DEFAULT 0,
  is_blood_group_verified BOOLEAN DEFAULT FALSE,
  verification_source VARCHAR(100),
  preferred_contact_method VARCHAR(20) DEFAULT 'in_app',
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
  status VARCHAR(30) DEFAULT 'pending',
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
  verification_status VARCHAR(30) DEFAULT 'pending',
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

-- 6. EMERGENCY BLOOD REQUESTS & MATCHING
CREATE TABLE IF NOT EXISTS blood_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  request_code VARCHAR(30) UNIQUE NOT NULL,
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
  response_status VARCHAR(30) DEFAULT 'pending',
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
  status VARCHAR(30) DEFAULT 'requested',
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

-- 7. UNIVERSAL DIGITAL IDENTITY CARD SYSTEM
CREATE TABLE IF NOT EXISTS identity_card_templates (
  id VARCHAR(50) PRIMARY KEY,
  role_id VARCHAR(50) NOT NULL REFERENCES roles(id) ON DELETE CASCADE,
  prefix VARCHAR(10) NOT NULL,
  theme_color VARCHAR(20) DEFAULT '#D71920',
  card_title VARCHAR(100) NOT NULL,
  validity_years INT DEFAULT 2,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS identity_cards (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  card_number VARCHAR(50) UNIQUE NOT NULL,
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
  platform VARCHAR(30) NOT NULL,
  shared_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. VOLUNTEERS, HOSPITALS, BLOOD BANKS & CAMPS
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
  status VARCHAR(30) DEFAULT 'upcoming',
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

-- 9. ROW LEVEL SECURITY (RLS) POLICIES
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE donor_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE blood_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE identity_cards ENABLE ROW LEVEL SECURITY;
ALTER TABLE donation_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE hospitals ENABLE ROW LEVEL SECURITY;
ALTER TABLE blood_banks ENABLE ROW LEVEL SECURITY;
ALTER TABLE donation_camps ENABLE ROW LEVEL SECURITY;

DO $$ BEGIN
  CREATE POLICY "Public profiles are readable" ON profiles FOR SELECT USING (true);
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
  CREATE POLICY "Users can update their own profile" ON profiles FOR UPDATE USING (auth.uid() = id);
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
  CREATE POLICY "Public can discover available donors" ON donor_profiles FOR SELECT USING (status != 'suspended' AND status != 'inactive');
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
  CREATE POLICY "Public can view verified blood requests" ON blood_requests FOR SELECT USING (status NOT IN ('draft', 'rejected'));
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
  CREATE POLICY "Public can verify active cards via token" ON identity_cards FOR SELECT USING (true);
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
  CREATE POLICY "Public can view hospitals" ON hospitals FOR SELECT USING (true);
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
  CREATE POLICY "Public can view blood banks" ON blood_banks FOR SELECT USING (true);
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
  CREATE POLICY "Public can view camps" ON donation_camps FOR SELECT USING (true);
EXCEPTION WHEN duplicate_object THEN null; END $$;

-- 10. SEED BANGLADESH 8 DIVISIONS & 64 DISTRICTS
INSERT INTO divisions (id, name, name_bn, bbs_code) VALUES
('dhaka', 'Dhaka', 'ঢাকা', '30'),
('chittagong', 'Chattogram', 'চট্টগ্রাম', '20'),
('rajshahi', 'Rajshahi', 'রাজশাহী', '50'),
('khulna', 'Khulna', 'খুলনা', '40'),
('barisal', 'Barishal', 'বরিশাল', '10'),
('sylhet', 'Sylhet', 'সিলেট', '60'),
('rangpur', 'Rangpur', 'রংপুর', '55'),
('mymensingh', 'Mymensingh', 'ময়মনসিংহ', '45')
ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name, name_bn = EXCLUDED.name_bn;

INSERT INTO districts (id, division_id, name, name_bn) VALUES
('dhaka', 'dhaka', 'Dhaka', 'ঢাকা'),
('gazipur', 'dhaka', 'Gazipur', 'গাজীপুর'),
('narayanganj', 'dhaka', 'Narayanganj', 'নারায়ণগঞ্জ'),
('tangail', 'dhaka', 'Tangail', 'টাঙ্গাইল'),
('faridpur', 'dhaka', 'Faridpur', 'ফরিদপুর'),
('manikganj', 'dhaka', 'Manikganj', 'মানিকগঞ্জ'),
('munshiganj', 'dhaka', 'Munshiganj', 'মুন্সীগঞ্জ'),
('narsingdi', 'dhaka', 'Narsingdi', 'নরসিংদী'),
('gopalganj', 'dhaka', 'Gopalganj', 'গোপালগঞ্জ'),
('madaripur', 'dhaka', 'Madaripur', 'মাদারীপুর'),
('rajbari', 'dhaka', 'Rajbari', 'রাজবাড়ী'),
('shariatpur', 'dhaka', 'Shariatpur', 'শরীয়তপুর'),
('kishoreganj', 'dhaka', 'Kishoreganj', 'কিশোরগঞ্জ'),
('chattogram', 'chittagong', 'Chattogram', 'চট্টগ্রাম'),
('coxsbazar', 'chittagong', 'Cox''s Bazar', 'কক্সবাজার'),
('cumilla', 'chittagong', 'Cumilla', 'কুমিল্লা'),
('brahmanbaria', 'chittagong', 'Brahmanbaria', 'ব্রাহ্মণবাড়িয়া'),
('chandpur', 'chittagong', 'Chandpur', 'চাঁদপুর'),
('feni', 'chittagong', 'Feni', 'ফেনী'),
('lakshmipur', 'chittagong', 'Lakshmipur', 'লক্ষ্মীপুর'),
('noakhali', 'chittagong', 'Noakhali', 'নোয়াখালী'),
('bandarban', 'chittagong', 'Bandarban', 'বান্দরবান'),
('khagrachhari', 'chittagong', 'Khagrachhari', 'খাগড়াছড়ি'),
('rangamati', 'chittagong', 'Rangamati', 'রাঙ্গামাটি'),
('rajshahi', 'rajshahi', 'Rajshahi', 'রাজশাহী'),
('bogura', 'rajshahi', 'Bogura', 'বগুড়া'),
('pabna', 'rajshahi', 'Pabna', 'পাবনা'),
('sirajganj', 'rajshahi', 'Sirajganj', 'সিরাজগঞ্জ'),
('naogaon', 'rajshahi', 'Naogaon', 'নওগাঁ'),
('natore', 'rajshahi', 'Natore', 'নাটোর'),
('chapainawabganj', 'rajshahi', 'Chapai Nawabganj', 'চাঁপাইনবাবগঞ্জ'),
('joypurhat', 'rajshahi', 'Joypurhat', 'জয়পুরহাট'),
('khulna', 'khulna', 'Khulna', 'খুলনা'),
('jashore', 'khulna', 'Jashore', 'যশোর'),
('satkhira', 'khulna', 'Satkhira', 'সাতক্ষীরা'),
('bagerhat', 'khulna', 'Bagerhat', 'বাগেরহাট'),
('kushtia', 'khulna', 'Kushtia', 'কুষ্টিয়া'),
('magura', 'khulna', 'Magura', 'মাগুরা'),
('meherpur', 'khulna', 'Meherpur', 'মেহেরপুর'),
('narail', 'khulna', 'Narail', 'নড়াইল'),
('chuadanga', 'khulna', 'Chuadanga', 'চুয়াডাঙ্গা'),
('jhenaidah', 'khulna', 'Jhenaidah', 'ঝিনাইদহ'),
('barishal', 'barisal', 'Barishal', 'বরিশাল'),
('bhola', 'barisal', 'Bhola', 'ভোলা'),
('patuakhali', 'barisal', 'Patuakhali', 'পটুয়াখালী'),
('pirojpur', 'barisal', 'Pirojpur', 'পিরোজপুর'),
('barguna', 'barisal', 'Barguna', 'বরগুনা'),
('jhalokati', 'barisal', 'Jhalokati', 'ঝালকাঠি'),
('sylhet', 'sylhet', 'Sylhet', 'সিলেট'),
('moulvibazar', 'sylhet', 'Moulvibazar', 'মৌলভীবাজার'),
('habiganj', 'sylhet', 'Habiganj', 'হবিগঞ্জ'),
('sunamganj', 'sylhet', 'Sunamganj', 'সুনামগঞ্জ'),
('rangpur', 'rangpur', 'Rangpur', 'রংপুর'),
('dinajpur', 'rangpur', 'Dinajpur', 'দিনাজপুর'),
('gaibandha', 'rangpur', 'Gaibandha', 'গাইবান্ধা'),
('kurigram', 'rangpur', 'Kurigram', 'কুড়িগ্রাম'),
('lalmonirhat', 'rangpur', 'Lalmonirhat', 'লালমনিরহাট'),
('nilphamari', 'rangpur', 'Nilphamari', 'নীলফামারী'),
('panchagarh', 'rangpur', 'Panchagarh', 'পঞ্চগড়'),
('thakurgaon', 'rangpur', 'Thakurgaon', 'ঠাকুরগাঁও'),
('mymensingh', 'mymensingh', 'Mymensingh', 'ময়মনসিংহ'),
('jamalpur', 'mymensingh', 'Jamalpur', 'জামালপুর'),
('netrokona', 'mymensingh', 'Netrokona', 'নেত্রকোণা'),
('sherpur', 'mymensingh', 'Sherpur', 'শেরপুর')
ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name, name_bn = EXCLUDED.name_bn;

-- 11. SEED 16 ROLES
INSERT INTO roles (id, title, hierarchy_level, description) VALUES
('super_admin', 'Super Admin', 1, 'National master platform control and governance'),
('district_admin', 'District Admin', 2, 'Regional administrative control for assigned district'),
('moderator', 'Moderator', 3, 'Community safety, reports and content verification'),
('verification_officer', 'Verification Officer', 4, 'Lab document verification and medical record review'),
('blood_bank_admin', 'Blood Bank Administrator', 5, 'Blood bank management and stock reporting'),
('hospital_admin', 'Hospital Administrator', 6, 'Hospital facility management and emergency coordination'),
('blood_bank_staff', 'Blood Bank Staff', 7, 'Blood collection and test logging'),
('hospital_staff', 'Hospital Staff', 8, 'Hospital transfusion receipts and emergency requests'),
('district_coordinator', 'District Coordinator', 9, 'District volunteer leadership and camp coordination'),
('upazila_coordinator', 'Upazila Coordinator', 10, 'Sub-district field volunteer coordination'),
('union_coordinator', 'Union Coordinator', 11, 'Grassroots community coordination'),
('volunteer', 'Volunteer', 12, 'Field volunteer for camps and emergency transport'),
('blood_donor', 'Blood Donor', 13, 'Registered voluntary blood donor'),
('blood_seeker', 'Blood Seeker', 14, 'Patient family or representative seeking blood'),
('registered_member', 'Registered Member', 15, 'Standard registered citizen profile'),
('public_visitor', 'Public Visitor', 16, 'Unauthenticated public visitor')
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, hierarchy_level = EXCLUDED.hierarchy_level;

-- 12. SEED ID CARD TEMPLATES (BloodLine BL- Prefix)
INSERT INTO identity_card_templates (id, role_id, prefix, theme_color, card_title, validity_years) VALUES
('super_admin', 'super_admin', 'BL-SA', '#B31319', 'Super Administrator ID', 5),
('district_admin', 'district_admin', 'BL-DA', '#991B1B', 'District Administrator ID', 3),
('blood_donor', 'blood_donor', 'BL-DR', '#D71920', 'National Blood Donor ID', 2),
('volunteer', 'volunteer', 'BL-VL', '#006A4E', 'National Volunteer ID', 2),
('hospital_admin', 'hospital_admin', 'BL-HA', '#0369A1', 'Hospital Administrator ID', 3),
('blood_bank_admin', 'blood_bank_admin', 'BL-BA', '#4338CA', 'Blood Bank Administrator ID', 3),
('registered_member', 'registered_member', 'BL-MB', '#334155', 'Registered Member ID', 2)
ON CONFLICT (id) DO NOTHING;
