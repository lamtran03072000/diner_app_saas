import { Module } from '@nestjs/common';
import { OrganizationAuthController } from './organization-auth.controller';
import { OrganizationAuthService } from './organization-auth.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Customer, CustomerSchema } from '../customers/customers.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Customer.name, schema: CustomerSchema }])],
  controllers: [OrganizationAuthController],
  providers: [OrganizationAuthService],
})
export class OrganizationAuthModule {}


