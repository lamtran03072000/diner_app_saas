# Customers API Examples

## Authentication
First, login to get JWT token:
```bash
curl -X POST http://localhost:3030/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "lam.th@gmail.com",
    "password": "Lam@1901"
  }'
```

## 1. Create Customer (with Owner)
```bash
curl -X POST http://localhost:3030/supper-admin/customers \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "orgName": "Acme Corporation",
    "billingEmail": "billing@acme.com",
    "plan": "pro",
    "isActive": true,
    "ownerFullName": "John Doe",
    "ownerEmail": "john.doe@acme.com",
    "ownerPassword": "SecurePass123"
  }'
```

## 2. Get All Customers (with pagination)
```bash
# Basic list
curl -X GET "http://localhost:3030/supper-admin/customers" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"

# With pagination
curl -X GET "http://localhost:3030/supper-admin/customers?page=1&limit=10" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"

# With search
curl -X GET "http://localhost:3030/supper-admin/customers?search=acme" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"

# With filters
curl -X GET "http://localhost:3030/supper-admin/customers?plan=pro&isActive=true&sort=name" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

## 3. Get Customer by ID
```bash
curl -X GET "http://localhost:3030/supper-admin/customers/CUSTOMER_ID" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

## 4. Update Customer
```bash
curl -X PATCH "http://localhost:3030/supper-admin/customers/CUSTOMER_ID" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "orgName": "Acme Corporation Updated",
    "plan": "enterprise",
    "isActive": false
  }'
```

## 5. Delete Customer (Soft Delete)
```bash
curl -X DELETE "http://localhost:3030/supper-admin/customers/CUSTOMER_ID" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

## 6. Hard Delete Customer
```bash
curl -X DELETE "http://localhost:3030/supper-admin/customers/CUSTOMER_ID?hard=true" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

## Response Examples

### Create Response (with Owner):
```json
{
  "customer": {
    "_id": "customer_id",
    "name": "Acme Corporation",
    "billingEmail": "billing@acme.com",
    "plan": "pro",
    "isActive": true,
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  },
  "owner": {
    "id": "owner_user_id",
    "email": "john.doe@acme.com",
    "fullName": "John Doe",
    "orgRole": "owner"
  }
}
```

### Update Response:
```json
{
  "_id": "customer_id",
  "name": "Acme Corporation Updated",
  "billingEmail": "billing@acme.com",
  "plan": "enterprise",
  "isActive": true,
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```

### List Response:
```json
{
  "items": [
    {
      "_id": "customer_id_1",
      "name": "Acme Corporation",
      "billingEmail": "billing@acme.com",
      "plan": "pro",
      "isActive": true,
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    }
  ],
  "total": 1,
  "page": 1,
  "limit": 20
}
```

## Query Parameters

### Pagination:
- `page`: Page number (default: 1, min: 1)
- `limit`: Items per page (default: 20, max: 100)

### Search & Filter:
- `search`: Search in name and billingEmail (case-insensitive)
- `plan`: Filter by plan (basic, pro, enterprise)
- `isActive`: Filter by active status (true/false)
- `sort`: Sort field (default: -createdAt)

### Examples:
```bash
# Search for customers with "tech" in name or email
?search=tech

# Get only pro plan customers
?plan=pro

# Get only active customers
?isActive=true

# Sort by name ascending
?sort=name

# Sort by creation date descending
?sort=-createdAt

# Combine multiple filters
?search=acme&plan=pro&isActive=true&page=1&limit=10&sort=-createdAt
```
