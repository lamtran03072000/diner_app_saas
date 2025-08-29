import { SupperAdminRole } from '../schemas/supper-admin-users.schema';

export interface JwtPayload {
  sub: string; // userId
  email: string;
  role: SupperAdminRole;
  iat?: number; // issued at
  exp?: number; // expiration
}
