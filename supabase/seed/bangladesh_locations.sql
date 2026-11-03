-- ==============================================================================
-- DonerBond — Bangladesh National Blood Donation Network
-- Seed: bangladesh_locations.sql
-- Description: 8 Divisions & 64 Districts with English & Bangla Naming
-- ==============================================================================

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

-- Insert 64 Districts
INSERT INTO districts (id, division_id, name, name_bn) VALUES
-- Dhaka Division
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

-- Chattogram Division
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

-- Rajshahi Division
('rajshahi', 'rajshahi', 'Rajshahi', 'রাজশাহী'),
('bogura', 'rajshahi', 'Bogura', 'বগুড়া'),
('pabna', 'rajshahi', 'Pabna', 'পাবনা'),
('sirajganj', 'rajshahi', 'Sirajganj', 'সিরাজগঞ্জ'),
('naogaon', 'rajshahi', 'Naogaon', 'নওগাঁ'),
('natore', 'rajshahi', 'Natore', 'নাটোর'),
('chapainawabganj', 'rajshahi', 'Chapai Nawabganj', 'চাঁপাইনবাবগঞ্জ'),
('joypurhat', 'rajshahi', 'Joypurhat', 'জয়পুরহাট'),

-- Khulna Division
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

-- Barishal Division
('barishal', 'barisal', 'Barishal', 'বরিশাল'),
('bhola', 'barisal', 'Bhola', 'ভোলা'),
('patuakhali', 'barisal', 'Patuakhali', 'পটুয়াখালী'),
('pirojpur', 'barisal', 'Pirojpur', 'পিরোজপুর'),
('barguna', 'barisal', 'Barguna', 'বরগুনা'),
('jhalokati', 'barisal', 'Jhalokati', 'ঝালকাঠি'),

-- Sylhet Division
('sylhet', 'sylhet', 'Sylhet', 'সিলেট'),
('moulvibazar', 'sylhet', 'Moulvibazar', 'মৌলভীবাজার'),
('habiganj', 'sylhet', 'Habiganj', 'হবিগঞ্জ'),
('sunamganj', 'sylhet', 'Sunamganj', 'সুনামগঞ্জ'),

-- Rangpur Division
('rangpur', 'rangpur', 'Rangpur', 'রংপুর'),
('dinajpur', 'rangpur', 'Dinajpur', 'দিনাজপুর'),
('gaibandha', 'rangpur', 'Gaibandha', 'গাইবান্ধা'),
('kurigram', 'rangpur', 'Kurigram', 'কুড়িগ্রাম'),
('lalmonirhat', 'rangpur', 'Lalmonirhat', 'লালমনিরহাট'),
('nilphamari', 'rangpur', 'Nilphamari', 'নীলফামারী'),
('panchagarh', 'rangpur', 'Panchagarh', 'পঞ্চগড়'),
('thakurgaon', 'rangpur', 'Thakurgaon', 'ঠাকুরগাঁও'),

-- Mymensingh Division
('mymensingh', 'mymensingh', 'Mymensingh', 'ময়মনসিংহ'),
('jamalpur', 'mymensingh', 'Jamalpur', 'জামালপুর'),
('netrokona', 'mymensingh', 'Netrokona', 'নেত্রকোণা'),
('sherpur', 'mymensingh', 'Sherpur', 'শেরপুর')
ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name, name_bn = EXCLUDED.name_bn;

-- Insert Initial 16 Roles
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

-- Insert Identity Card Templates
INSERT INTO identity_card_templates (id, role_id, prefix, theme_color, card_title, validity_years) VALUES
('super_admin', 'super_admin', 'BL-SA', '#B31319', 'Super Administrator ID', 5),
('district_admin', 'district_admin', 'BL-DA', '#991B1B', 'District Administrator ID', 3),
('blood_donor', 'blood_donor', 'BL-DR', '#D71920', 'National Blood Donor ID', 2),
('volunteer', 'volunteer', 'BL-VL', '#006A4E', 'National Volunteer ID', 2),
('hospital_admin', 'hospital_admin', 'BL-HA', '#0369A1', 'Hospital Administrator ID', 3),
('blood_bank_admin', 'blood_bank_admin', 'BL-BA', '#4338CA', 'Blood Bank Administrator ID', 3),
('registered_member', 'registered_member', 'BL-MB', '#334155', 'Registered Member ID', 2)
ON CONFLICT (id) DO NOTHING;
