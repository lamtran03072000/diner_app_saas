# Organizations API

This module provides API endpoints for managing organizations in the supper admin system.

## Endpoints

### POST /supper-admin/organizations

Creates a new organization.

**Authentication Required:** Yes (SUPPER_ADMIN scope + manager role)

**Request Headers:**

```
Authorization: Bearer <jwt_token>
Content-Type: application/json
```

**Request Body:**

```json
{
  "name": "Acme Corporation",
  "emailBling": "contact@acme.com",
  "plan": "pro",
  "isActive": true
}
```

**Request Body Fields:**

- `name` (required): Organization name
- `emailBling` (optional): Bling email address
- `plan` (optional): Subscription plan - either "pro" or "basic" (defaults to "basic")
- `isActive` (optional): Organization active status (defaults to true)

**Response (201 Created):**

```json
{
  "_id": "507f1f77bcf86cd799439011",
  "name": "Acme Corporation",
  "emailBling": "contact@acme.com",
  "plan": "pro",
  "isActive": true,
  "createdAt": "2024-01-01T00:00:00.000Z",
  "createdBy": "507f1f77bcf86cd799439012",
  "updatedAt": "2024-01-01T00:00:00.000Z",
  "updatedBy": "507f1f77bcf86cd799439012"
}
```

### GET /supper-admin/organizations

Retrieves a paginated list of organizations.

**Authentication Required:** Yes (SUPPER_ADMIN scope + manager role)

**Request Headers:**

```
Authorization: Bearer <jwt_token>
```

**Query Parameters:**

- `page` (optional): Page number, defaults to 1
- `limit` (optional): Items per page, defaults to 20

**Response (200 OK):**

```json
{
  "data": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "name": "Acme Corporation",
      "emailBling": "contact@acme.com",
      "plan": "pro",
      "isActive": true,
      "createdAt": "2024-01-01T00:00:00.000Z",
      "createdBy": "507f1f77bcf86cd799439012",
      "updatedAt": "2024-01-01T00:00:00.000Z",
      "updatedBy": "507f1f77bcf86cd799439012"
    }
  ],
  "total": 1,
  "page": 1,
  "limit": 20,
  "totalPages": 1
}
```

## Example Usage

### Using cURL

**Create Organization:**

```bash
curl -X POST http://localhost:3000/supper-admin/organizations \
  -H "Authorization: Bearer <your_jwt_token>" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test Organization",
    "emailBling": "test@example.com",
    "plan": "basic"
  }'
```

**Get Organizations List:**

```bash
# Get first page with default limit (20)
curl -X GET "http://localhost:3000/supper-admin/organizations" \
  -H "Authorization: Bearer <your_jwt_token>"

# Get specific page with custom limit
curl -X GET "http://localhost:3000/supper-admin/organizations?page=2&limit=10" \
  -H "Authorization: Bearer <your_jwt_token>"
```

### Using JavaScript/Fetch

**Create Organization:**

```javascript
const response = await fetch(
  'http://localhost:3000/supper-admin/organizations',
  {
    method: 'POST',
    headers: {
      Authorization: 'Bearer <your_jwt_token>',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: 'Test Organization',
      emailBling: 'test@example.com',
      plan: 'basic',
    }),
  },
);

const organization = await response.json();
```

**Get Organizations List:**

```javascript
// Get first page
const response = await fetch(
  'http://localhost:3000/supper-admin/organizations',
  {
    headers: {
      Authorization: 'Bearer <your_jwt_token>',
    },
  },
);

// Get specific page
const response = await fetch(
  'http://localhost:3000/supper-admin/organizations?page=2&limit=10',
  {
    headers: {
      Authorization: 'Bearer <your_jwt_token>',
    },
  },
);

const organizations = await response.json();
```

## Error Responses

### 401 Unauthorized

```json
{
  "statusCode": 401,
  "message": "Unauthorized"
}
```

### 403 Forbidden

```json
{
  "statusCode": 403,
  "message": "Invalid scope"
}
```

### 400 Bad Request

```json
{
  "statusCode": 400,
  "message": [
    "name should not be empty",
    "plan must be one of the following values: pro, basic"
  ]
}
```

## Notes

- The API automatically adds audit fields (createdAt, createdBy, updatedAt, updatedBy)
- Only users with SUPPER_ADMIN scope and manager role can access these endpoints
- The organization name is required and must be unique
- The plan defaults to "basic" if not specified
- The isActive field defaults to true if not specified
- Organizations are sorted by creation date (newest first)
- Pagination defaults: page=1, limit=20
- Maximum limit is enforced by the pagination DTO
