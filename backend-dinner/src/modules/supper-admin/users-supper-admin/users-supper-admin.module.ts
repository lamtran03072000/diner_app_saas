import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersSupperAdmin, UsersSupperAdminSchema } from './users-supper-admin.schema';
import { UsersSupperAdminService } from './users-supper-admin.service';
import { UsersSupperAdminController } from './users-supper-admin.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: UsersSupperAdmin.name, schema: UsersSupperAdminSchema },
    ]),
  ],
  providers: [UsersSupperAdminService],
  controllers: [UsersSupperAdminController],
  exports: [MongooseModule, UsersSupperAdminService],
})
export class UsersSupperAdminModule {}


