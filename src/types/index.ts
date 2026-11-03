export type BloodGroup =
  | "A+"
  | "A-"
  | "B+"
  | "B-"
  | "AB+"
  | "AB-"
  | "O+"
  | "O-";

export type RoleName =
  | "public_visitor"
  | "registered_member"
  | "blood_donor"
  | "blood_seeker"
  | "volunteer"
  | "district_coordinator"
  | "upazila_coordinator"
  | "union_coordinator"
  | "hospital_admin"
  | "hospital_staff"
  | "blood_bank_admin"
  | "blood_bank_staff"
  | "verification_officer"
  | "moderator"
  | "district_admin"
  | "super_admin";

export type EmergencyPriority = "critical" | "urgent" | "normal";

export type EmergencyStatus =
  | "draft"
  | "submitted"
  | "pending_verification"
  | "verified"
  | "matching_donors"
  | "donor_contact_requested"
  | "donor_connected"
  | "partially_fulfilled"
  | "fulfilled"
  | "cancelled"
  | "rejected"
  | "expired";

export type DonorStatus =
  | "available"
  | "temporarily_unavailable"
  | "donated_recently"
  | "pending_verification"
  | "suspended"
  | "inactive";

export type CardStatus = "pending" | "active" | "suspended" | "revoked" | "expired";

export interface UserProfile {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  avatarUrl?: string;
  divisionId: string;
  districtId: string;
  upazilaId?: string;
  unionWard?: string;
  dateOfBirth?: string;
  gender?: "male" | "female" | "other";
  preferredLanguage: "bn" | "en";
  createdAt: string;
  updatedAt: string;
}

export interface DonorProfile {
  userId: string;
  bloodGroup: BloodGroup;
  rhFactor?: string;
  status: DonorStatus;
  lastDonationDate?: string;
  verifiedDonationCount: number;
  isBloodGroupVerified: boolean;
  verificationSource?: string;
  preferredContactMethod: "in_app" | "phone" | "whatsapp";
  allowEmergencyAlerts: boolean;
  totalDonationCount: number;
}

export interface EmergencyRequest {
  id: string;
  requestCode: string;
  patientName: string;
  bloodGroup: BloodGroup;
  unitsRequired: number;
  hospitalName: string;
  hospitalLocation: string;
  districtId: string;
  upazilaId?: string;
  requiredDateTime: string;
  priority: EmergencyPriority;
  description?: string;
  contactPerson: string;
  contactNumber: string;
  status: EmergencyStatus;
  seekerId: string;
  verifiedAt?: string;
  verifiedBy?: string;
  createdAt: string;
}

export interface DigitalIdentityCard {
  id: string;
  cardNumber: string; // e.g. DB-DR-2026-000102
  userId: string;
  userName: string;
  userAvatar?: string;
  role: RoleName;
  roleTitle: string;
  bloodGroup?: BloodGroup;
  verifiedDonationCount?: number;
  assignedLocation?: string;
  organizationName?: string;
  issueDate: string;
  expiryDate?: string;
  status: CardStatus;
  qrPublicToken: string;
  verificationUrl: string;
  disclaimer: string;
}

export interface Hospital {
  id: string;
  name: string;
  nameBn?: string;
  type: "government" | "private" | "specialized" | "clinic";
  divisionId: string;
  districtId: string;
  upazilaId?: string;
  address: string;
  phone: string;
  emergencyHotline?: string;
  email?: string;
  website?: string;
  hasBloodBank: boolean;
  isVerified: boolean;
}

export interface BloodBank {
  id: string;
  name: string;
  nameBn?: string;
  hospitalId?: string;
  divisionId: string;
  districtId: string;
  upazilaId?: string;
  address: string;
  phone: string;
  operatingHours: string;
  isVerified: boolean;
}

export interface DonationCamp {
  id: string;
  title: string;
  titleBn?: string;
  organizerName: string;
  divisionId: string;
  districtId: string;
  locationDetails: string;
  startDate: string;
  endDate: string;
  targetUnits: number;
  registeredDonorsCount: number;
  collectedUnitsCount: number;
  status: "upcoming" | "active" | "completed" | "cancelled";
  bannerUrl?: string;
}

export interface Volunteer {
  userId: string;
  assignedDistrictId: string;
  assignedUpazilaId?: string;
  availability: "full_time" | "part_time" | "on_call" | "inactive";
  verifiedServiceHours: number;
  completedTasksCount: number;
  badgeLevel: string;
}
