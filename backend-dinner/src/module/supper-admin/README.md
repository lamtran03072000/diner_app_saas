# Supper Admin Module

Module quản lý authentication và authorization cho supper admin system.

## Cấu trúc

```
src/module/supper-admin/
├── controllers/
│   ├── auth.controller.ts          # Login endpoints
│   └── supper-admin-users.controller.ts  # User management
├── services/
│   ├── auth.service.ts             # Authentication logic
│   ├── jwt.service.ts              # JWT token handling
│   └── supper-admin-users.service.ts      # User CRUD operations
├── guards/
│   ├── jwt-auth.guard.ts           # JWT authentication guard
│   └── roles.guard.ts              # Role-based authorization guard
├── decorators/
│   └── roles.decorator.ts          # @Roles decorator
├── strategies/
│   └── jwt.strategy.ts             # Passport JWT strategy
├── schemas/
│   └── supper-admin-users.schema.ts       # User schema
├── dto/
│   ├── create-supper-admin-user.dto.ts    # Create user DTO
│   └── login.dto.ts                # Login DTO
├── interfaces/
│   └── jwt-payload.interface.ts    # JWT payload interface
└── supper-admin.module.ts          # Module configuration
```

## Sử dụng

### 1. Login để lấy JWT Token

```bash
POST /auth/login
Content-Type: application/json

{
  "email": "admin@example.com",
  "password": "password123"
}
```

Response:
```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "user_id",
    "email": "admin@example.com",
    "fullName": "Admin User",
    "role": "super_admin"
  }
}
```

### 2. Sử dụng Guard để bảo vệ API

```typescript
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard, RolesGuard, Roles } from '../module/supper-admin';
import { SupperAdminRole } from '../module/supper-admin';

@Controller('supper-admin-users')
export class SupperAdminUsersController {
  
  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(SupperAdminRole.SUPER_ADMIN)
  async create(@Body() dto: CreateSupperAdminUserDto) {
    // Chỉ super_admin mới có thể tạo user mới
  }

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(SupperAdminRole.SUPER_ADMIN, SupperAdminRole.OPERATOR)
  async findAll() {
    // super_admin và operator có thể xem danh sách
  }
}
```

### 3. JWT Token Format

Token chứa payload:
```json
{
  "sub": "user_id",
  "email": "admin@example.com", 
  "role": "super_admin",
  "iat": 1640995200,
  "exp": 1641081600
}
```

### 4. Environment Variables

```env
JWT_SECRET=your-super-secret-key
JWT_EXPIRES_IN=24h
```

## Roles

- `super_admin`: Quyền cao nhất, có thể tạo/sửa/xóa user
- `operator`: Quyền trung bình, có thể xem và sửa một số thông tin
- `support`: Quyền thấp nhất, chỉ có thể xem thông tin

## Error Handling

- `401 Unauthorized`: JWT token không hợp lệ hoặc hết hạn
- `403 Forbidden`: User không có quyền truy cập
- `409 Conflict`: Email đã tồn tại
- `400 Bad Request`: Dữ liệu đầu vào không hợp lệ
