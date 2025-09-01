import { Module } from '@nestjs/common';
import { SupperAdminAuthController } from './supper-admin-auth.controller';
import { SupperAdminAuthService } from './supper-admin-auth.service';
import { UsersSupperAdminModule } from '../users-supper-admin/users-supper-admin.module';
import { UsersSupperAdminService } from '../users-supper-admin/users-supper-admin.service';

@Module({
  imports: [UsersSupperAdminModule],
  controllers: [SupperAdminAuthController],
  providers: [SupperAdminAuthService, UsersSupperAdminService],
})
export class SupperAdminAuthModule {}


