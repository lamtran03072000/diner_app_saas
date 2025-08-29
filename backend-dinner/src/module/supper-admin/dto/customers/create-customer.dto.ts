import { IsString, IsEmail, IsOptional, IsEnum, IsBoolean, MinLength, MaxLength, Matches } from 'class-validator';
import { Transform } from 'class-transformer';
import { CustomerPlan } from '../../schemas/customers.schema';

export class CreateCustomerDto {
  @IsString()
  @MinLength(2, { message: 'Org name must be at least 2 characters long' })
  @MaxLength(150, { message: 'Org name must not exceed 150 characters' })
  @Transform(({ value }) => value?.trim())
  orgName: string;

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

  // Owner information
  @IsString()
  @MinLength(2, { message: 'Owner full name must be at least 2 characters long' })
  @MaxLength(100, { message: 'Owner full name must not exceed 100 characters' })
  @Transform(({ value }) => value?.trim())
  ownerFullName: string;

  @IsEmail({}, { message: 'Please provide a valid owner email address' })
  @Transform(({ value }) => value?.toLowerCase().trim())
  ownerEmail: string;

  @IsString()
  @MinLength(8, { message: 'Owner password must be at least 8 characters long' })
  @Matches(
    /^(?=.*[A-Za-z])(?=.*\d)/,
    { message: 'Owner password must contain at least one letter and one number' }
  )
  ownerPassword: string;
}
