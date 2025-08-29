import { IsString, IsEmail, IsOptional, IsEnum, IsBoolean, MinLength, MaxLength } from 'class-validator';
import { Transform } from 'class-transformer';
import { CustomerPlan } from '../../schemas/customers.schema';

export class UpdateCustomerDto {
  @IsOptional()
  @IsString()
  @MinLength(2, { message: 'Org name must be at least 2 characters long' })
  @MaxLength(150, { message: 'Org name must not exceed 150 characters' })
  @Transform(({ value }) => value?.trim())
  orgName?: string;

  @IsOptional()
  @IsEmail({}, { message: 'Please provide a valid billing email address' })
  @Transform(({ value }) => value?.toLowerCase().trim())
  billingEmail?: string;

  @IsOptional()
  @IsEnum(CustomerPlan, { message: 'Plan must be one of: basic, pro, enterprise' })
  plan?: CustomerPlan;

  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value === 'true' || value === true)
  isActive?: boolean;
}
