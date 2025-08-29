import { SetMetadata } from '@nestjs/common';
import { SupperAdminRole } from '../schemas/supper-admin-users.schema';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: SupperAdminRole[]) => SetMetadata(ROLES_KEY, roles);
