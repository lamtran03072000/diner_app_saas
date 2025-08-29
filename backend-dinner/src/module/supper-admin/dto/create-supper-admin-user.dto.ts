import { IsString, IsEmail, IsOptional, IsEnum, MinLength, MaxLength, Matches } from 'class-validator';
import { Transform } from 'class-transformer';
import { SupperAdminRole } from '../schemas/supper-admin-users.schema';

export class CreateSupperAdminUserDto {
  @IsString()
  @MinLength(2, { message: 'Full name must be at least 2 characters long' })
  @MaxLength(100, { message: 'Full name must not exceed 100 characters' })
  @Transform(({ value }) => value?.trim())
  fullName: string;

  @IsEmail({}, { message: 'Please provide a valid email address' })
  @Transform(({ value }) => value?.toLowerCase().trim())
  email: string;

  @IsString()
  @MinLength(8, { message: 'Password must be at least 8 characters long' })
  @Matches(
    /^(?=.*[A-Za-z])(?=.*\d)/,
    { message: 'Password must contain at least one letter and one number' }
  )
  password: string;

  @IsOptional()
  @IsEnum(SupperAdminRole, { message: 'Role must be one of: super_admin, operator, support' })
  role?: SupperAdminRole;
}
