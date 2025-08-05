# API Documentation

---

## User Endpoints

### POST `/users/register`

Register a new user.

**Request Body:**
```json
{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "SecurePassword123"
}
```
**Responses:**
- `201 Created` – Returns `{ token, user }`
- `400 Bad Request` – Validation errors or user already exists

---

### POST `/users/login`

Login as a user.

**Request Body:**
```json
{
  "email": "john.doe@example.com",
  "password": "SecurePassword123"
}
```
**Responses:**
- `200 OK` – Returns `{ token, user }`
- `400 Bad Request` – Validation errors
- `401 Unauthorized` – Invalid credentials

---

### GET `/users/profile`

Get the authenticated user's profile.

**Headers:**  
`Authorization: Bearer <token>`

**Responses:**
- `200 OK` – Returns `{ user }`
- `401 Unauthorized` – Invalid or missing token

---

### GET `/users/logout`

Logout the authenticated user.

**Headers:**  
`Authorization: Bearer <token>`

**Responses:**
- `200 OK` – Returns `{ message: "Logged out successfully" }`
- `401 Unauthorized` – Invalid or missing token

---

## Captain Endpoints

### POST `/captains/register`

Register a new captain.

**Request Body:**
```json
{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "SecurePassword123",
  "vehicle": {
    "color": "Black",
    "plate": "ABC123",
    "capacity": 4,
    "vehicleType": "car"
  }
}
```
**Responses:**
- `201 Created` – Returns `{ token, captain }`
- `400 Bad Request` – Validation errors or captain already exists

---

### POST `/captains/login`

Login as a captain.

**Request Body:**
```json
{
  "email": "john.doe@example.com",
  "password": "SecurePassword123"
}
```
**Responses:**
- `200 OK` – Returns `{ token, captain }`
- `400 Bad Request` – Validation errors
- `401 Unauthorized` – Invalid credentials

---

### GET `/captains/profile`

Get the authenticated captain's profile.

**Headers:**  
`Authorization: Bearer <token>`

**Responses:**
- `200 OK` – Returns `{ captain }`
- `401 Unauthorized` – Invalid or missing token

---

### GET `/captains/logout`

Logout the authenticated captain.

**Headers:**  
`Authorization: Bearer <token>`

**Responses:**
- `200 OK` – Returns `{ message: "Captain logged out successfully" }`
- `401 Unauthorized` – Invalid or missing token

---

## Maps Endpoints

### GET `/maps/get-coordinates?address=...`

Get latitude and longitude for a given address.

**Headers:**  
`Authorization: Bearer <token>`

**Query Params:**
- `address` (string, required)

**Responses:**
- `200 OK` – Returns `{ ltd, lng }`
- `400 Bad Request` – Validation errors
- `401 Unauthorized` – Invalid or missing token

---

### GET `/maps/get-distance-time?origin=...&destination=...`

Get distance and duration between two addresses.

**Headers:**  
`Authorization: Bearer <token>`

**Query Params:**
- `origin` (string, required)
- `destination` (string, required)

**Responses:**
- `200 OK` – Returns `{ distance, duration }`
- `400 Bad Request` – Validation errors
- `401 Unauthorized` – Invalid or missing token

---

### GET `/maps/get-suggestions?input=...`

Get autocomplete suggestions for a location input.

**Headers:**  
`Authorization: Bearer <token>`

**Query Params:**
- `input` (string, min 3 chars, required)

**Responses:**
- `200 OK` – Returns `[ ...suggestions ]`
- `400 Bad Request` – Validation errors
- `401 Unauthorized` – Invalid or missing token

---

## Ride Endpoints

### POST `/rides/create`

Create a new ride.

**Headers:**  
`Authorization: Bearer <token>`

**Request Body:**
```json
{
  "pickup": "Pickup Address",
  "destination": "Destination Address",
  "vehicleType": "car" // or "tuktuk", "motorcycle"
}
```
**Responses:**
- `201 Created` – Returns the created ride object
- `400 Bad Request` – Validation errors
- `401 Unauthorized` – Invalid or missing token

---

### GET `/rides/fare?pickup=...&destination=...`

Get fare estimates for a ride.

**Headers:**  
`Authorization: Bearer <token>`

**Query Params:**
- `pickup` (string, required)
- `destination` (string, required)

**Responses:**
- `200 OK` – Returns `{ tuktuk: number, car: number, motorcycle: number }`
- `400 Bad Request` – Validation errors
- `401 Unauthorized` – Invalid or missing token


