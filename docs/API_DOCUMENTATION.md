# DonerBond — API & Server Actions Documentation
## Public, Authenticated & Administrative Endpoints

---

## 1. Public Endpoints

### `GET /api/v1/verify/[token]`
- **Purpose**: Verify public validity of a digital identity card.
- **Request**: URL parameter `token` (32-byte cryptographic hex string).
- **Response**:
```json
{
  "status": "valid",
  "cardNumber": "DB-DR-2026-000102",
  "name": "Rahim Ahmed",
  "role": "National Blood Donor",
  "bloodGroup": "O+",
  "issueDate": "2026-01-15",
  "expiryDate": "2028-01-15",
  "verified": true,
  "disclaimer": "DonerBond Digital Identity — Not a Government-Issued Identity Document or Medical License."
}
```

### `GET /api/v1/locations`
- **Query params**: `division_id`, `district_id`
- **Returns**: Bangladesh administrative hierarchical list with English and Bangla labels.

---

## 2. Protected Server Actions

### `createEmergencyRequest(payload: EmergencyRequestInput)`
- **Validates**: Zod schema for required units, priority, hospital, and district.
- **Side effects**: Emits notifications to matching voluntary donors in the same district.

### `requestDonorContact(donorId: string, message: string)`
- **Creates**: Double-opt-in record in `donor_contact_requests`. Phone number remains masked until donor approval.

### `approveContactSharing(requestId: string)`
- **Validates**: Current authenticated donor matches target donor.
- **Outcome**: Decrypts contact channel to the verified seeker.
