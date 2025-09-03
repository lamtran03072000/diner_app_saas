#!/bin/bash

# Organizations API Test Script
# Usage: ./test-api.sh <your_jwt_token>

if [ -z "$1" ]; then
    echo "Usage: ./test-api.sh <your_jwt_token>"
    echo "Example: ./test-api.sh eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
    exit 1
fi

TOKEN=$1
BASE_URL="http://localhost:3000"

echo "🚀 Testing Organizations API..."
echo "Base URL: $BASE_URL"
echo "Token: ${TOKEN:0:50}..."
echo ""

# Test GET organizations
echo "📋 Testing GET /supper-admin/organizations"
curl -s -X GET "$BASE_URL/supper-admin/organizations" \
  -H "Authorization: Bearer $TOKEN" | jq '.' 2>/dev/null || \
curl -s -X GET "$BASE_URL/supper-admin/organizations" \
  -H "Authorization: Bearer $TOKEN"
echo ""

# Test GET with pagination
echo "📋 Testing GET /supper-admin/organizations?page=1&limit=5"
curl -s -X GET "$BASE_URL/supper-admin/organizations?page=1&limit=5" \
  -H "Authorization: Bearer $TOKEN" | jq '.' 2>/dev/null || \
curl -s -X GET "$BASE_URL/supper-admin/organizations?page=1&limit=5" \
  -H "Authorization: Bearer $TOKEN"
echo ""

# Test POST create organization
echo "➕ Testing POST /supper-admin/organizations"
curl -s -X POST "$BASE_URL/supper-admin/organizations" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"name": "Test Restaurant", "plan": "basic"}' | jq '.' 2>/dev/null || \
curl -s -X POST "$BASE_URL/supper-admin/organizations" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"name": "Test Restaurant", "plan": "basic"}'
echo ""

echo "✅ API testing completed!"
echo ""
echo "💡 Tips:"
echo "- Install 'jq' for pretty JSON output: brew install jq (macOS) or apt-get install jq (Ubuntu)"
echo "- Check the responses above for any errors"
echo "- If you get 401/403 errors, make sure your token is valid and has SUPPER_ADMIN scope + manager role"
